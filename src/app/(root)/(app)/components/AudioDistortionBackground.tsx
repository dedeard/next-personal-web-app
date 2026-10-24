'use client'

import React, { memo, useEffect, useRef } from 'react'

import { BAND_RANGES, BASE_VERT, Band, EFFECTS, EffectConfig, FRAGMENTS, FragmentKey, mapRange } from './distortion-shaders'

interface AudioDistortionBackgroundProps {
  /** 0 = off (idle, static image shows). 1..8 = active effect. */
  effectIndex: number
  imageSrc: string
}

const UNIFORM_NAMES = [
  'u_time',
  'u_resolution',
  'u_tResolution',
  'texRes',
  'u_texture',
  'u_bass',
  'u_mid',
  'u_tremble',
  'u_lowmid',
  'd_map',
  'img',
] as const

type UniformName = (typeof UNIFORM_NAMES)[number]

interface ProgramInfo {
  program: WebGLProgram
  uniforms: Partial<Record<UniformName, WebGLUniformLocation | null>>
  aPosition: number
  aTexCoord: number
}

function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function buildProgram(gl: WebGLRenderingContext, vertShader: WebGLShader, fragSource: string): ProgramInfo | null {
  const frag = compileShader(gl, gl.FRAGMENT_SHADER, fragSource)
  if (!frag) return null

  const program = gl.createProgram()
  if (!program) {
    gl.deleteShader(frag)
    return null
  }
  gl.attachShader(program, vertShader)
  gl.attachShader(program, frag)
  gl.linkProgram(program)
  gl.deleteShader(frag)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program)
    return null
  }

  const uniforms: ProgramInfo['uniforms'] = {}
  for (const name of UNIFORM_NAMES) {
    uniforms[name] = gl.getUniformLocation(program, name)
  }

  return {
    program,
    uniforms,
    aPosition: gl.getAttribLocation(program, 'aPosition'),
    aTexCoord: gl.getAttribLocation(program, 'aTexCoord'),
  }
}

/** Average 0-255 energy of a frequency band, mirroring p5.sound FFT.getEnergy. */
function bandEnergy(freq: Uint8Array, sampleRate: number, band: Band): number {
  const [lo, hi] = BAND_RANGES[band]
  const nyquist = sampleRate / 2
  const binCount = freq.length
  let loBin = Math.round((lo / nyquist) * binCount)
  let hiBin = Math.round((hi / nyquist) * binCount)
  loBin = Math.max(0, Math.min(binCount - 1, loBin))
  hiBin = Math.max(loBin, Math.min(binCount - 1, hiBin))
  let sum = 0
  for (let i = loBin; i <= hiBin; i++) sum += freq[i]
  return sum / (hiBin - loBin + 1)
}

const AudioDistortionBackground: React.FC<AudioDistortionBackgroundProps> = ({ effectIndex, imageSrc }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const glRef = useRef<WebGLRenderingContext | null>(null)
  const vertShaderRef = useRef<WebGLShader | null>(null)
  const programsRef = useRef<Map<FragmentKey, ProgramInfo>>(new Map())
  const bufferRef = useRef<WebGLBuffer | null>(null)
  const textureRef = useRef<WebGLTexture | null>(null)
  const textureReadyRef = useRef(false)
  const imageSizeRef = useRef<{ w: number; h: number }>({ w: 1, h: 1 })

  const audioCtxRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const freqDataRef = useRef<Uint8Array<ArrayBuffer> | null>(null)
  const audioElRef = useRef<HTMLAudioElement | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)

  const rafRef = useRef<number | null>(null)
  const frameCountRef = useRef(0)
  const effectRef = useRef<EffectConfig | null>(null)

  // One-time WebGL setup + texture load.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', { premultipliedAlpha: false, alpha: true, antialias: true })
    if (!gl) return
    glRef.current = gl

    const vert = compileShader(gl, gl.VERTEX_SHADER, BASE_VERT)
    if (!vert) return
    vertShaderRef.current = vert

    // Fullscreen quad: interleaved [posX, posY, texU, texV]. base.vert maps xy*2-1.
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    // prettier-ignore
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        0, 0, 0, 0,
        1, 0, 1, 0,
        0, 1, 0, 1,
        1, 1, 1, 1,
      ]),
      gl.STATIC_DRAW,
    )
    bufferRef.current = buffer

    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)
    // 1x1 placeholder until the image loads.
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]))
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    textureRef.current = texture

    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.onload = () => {
      const gli = glRef.current
      if (!gli || !textureRef.current) return
      gli.bindTexture(gli.TEXTURE_2D, textureRef.current)
      gli.texImage2D(gli.TEXTURE_2D, 0, gli.RGBA, gli.RGBA, gli.UNSIGNED_BYTE, image)
      imageSizeRef.current = { w: image.naturalWidth || 1, h: image.naturalHeight || 1 }
      textureReadyRef.current = true
    }
    image.src = imageSrc

    const resize = () => {
      const c = canvasRef.current
      const gli = glRef.current
      if (!c || !gli) return
      const w = Math.floor(window.innerWidth)
      const h = Math.floor(window.innerHeight)
      c.width = w
      c.height = h
      gli.viewport(0, 0, w, h)
    }
    resize()
    window.addEventListener('resize', resize)

    const programs = programsRef.current
    return () => {
      window.removeEventListener('resize', resize)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      const gli = glRef.current
      if (gli) {
        programs.forEach((p) => gli.deleteProgram(p.program))
        if (bufferRef.current) gli.deleteBuffer(bufferRef.current)
        if (textureRef.current) gli.deleteTexture(textureRef.current)
        if (vertShaderRef.current) gli.deleteShader(vertShaderRef.current)
      }
      programs.clear()
      textureReadyRef.current = false
      const audioEl = audioElRef.current
      if (audioEl) {
        audioEl.pause()
        audioEl.src = ''
      }
      sourceRef.current?.disconnect()
      analyserRef.current?.disconnect()
      const ctx = audioCtxRef.current
      if (ctx && ctx.state !== 'closed') void ctx.close()
      audioCtxRef.current = null
      analyserRef.current = null
      sourceRef.current = null
    }
    // imageSrc is stable (imported asset); intentionally run once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Lazily build the Web Audio graph on first activation (needs a user gesture).
  const ensureAudioGraph = () => {
    if (audioCtxRef.current) return
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctor) return

    const ctx = new Ctor()
    const audioEl = new Audio()
    audioEl.loop = true
    audioEl.crossOrigin = 'anonymous'
    audioEl.preload = 'auto'

    const source = ctx.createMediaElementSource(audioEl)
    const analyser = ctx.createAnalyser()
    analyser.fftSize = 1024
    analyser.smoothingTimeConstant = 0.8
    source.connect(analyser)
    analyser.connect(ctx.destination)

    audioCtxRef.current = ctx
    audioElRef.current = audioEl
    sourceRef.current = source
    analyserRef.current = analyser
    freqDataRef.current = new Uint8Array(analyser.frequencyBinCount)
  }

  const stopLoop = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }

  const renderFrame = () => {
    const gl = glRef.current
    const effect = effectRef.current
    const analyser = analyserRef.current
    const freq = freqDataRef.current
    if (!gl || !effect || !analyser || !freq) {
      rafRef.current = requestAnimationFrame(renderFrame)
      return
    }

    frameCountRef.current += 1

    if (textureReadyRef.current) {
      const info = programsRef.current.get(effect.frag)
      const texture = textureRef.current
      if (info && texture) {
        const w = gl.drawingBufferWidth
        const h = gl.drawingBufferHeight
        const { w: iw, h: ih } = imageSizeRef.current

        analyser.getByteFrequencyData(freq)
        const sampleRate = audioCtxRef.current?.sampleRate ?? 44100
        const bassE = bandEnergy(freq, sampleRate, effect.bass.band)
        const midE = bandEnergy(freq, sampleRate, effect.mid.band)

        const time = effect.timeConstant ?? frameCountRef.current / (effect.timeDivisor ?? 20)

        gl.useProgram(info.program)

        gl.bindBuffer(gl.ARRAY_BUFFER, bufferRef.current)
        if (info.aPosition >= 0) {
          gl.enableVertexAttribArray(info.aPosition)
          gl.vertexAttribPointer(info.aPosition, 2, gl.FLOAT, false, 16, 0)
        }
        if (info.aTexCoord >= 0) {
          gl.enableVertexAttribArray(info.aTexCoord)
          gl.vertexAttribPointer(info.aTexCoord, 2, gl.FLOAT, false, 16, 8)
        }

        const u = info.uniforms
        gl.uniform1f(u.u_time ?? null, time)
        gl.uniform2f(u.u_resolution ?? null, w, h)
        gl.uniform2f(u.u_tResolution ?? null, iw, ih)
        gl.uniform2f(u.texRes ?? null, iw, ih)
        gl.uniform1f(u.u_bass ?? null, mapRange(bassE, effect.bass.in[0], effect.bass.in[1], effect.bass.out[0], effect.bass.out[1]))
        gl.uniform1f(u.u_mid ?? null, mapRange(midE, effect.mid.in[0], effect.mid.in[1], effect.mid.out[0], effect.mid.out[1]))
        gl.uniform1f(u.u_tremble ?? null, 0)
        if (effect.lowmid) {
          const lowE = bandEnergy(freq, sampleRate, effect.lowmid.band)
          gl.uniform1f(
            u.u_lowmid ?? null,
            mapRange(lowE, effect.lowmid.in[0], effect.lowmid.in[1], effect.lowmid.out[0], effect.lowmid.out[1]),
          )
        }

        if (effect.twoTextures) {
          gl.activeTexture(gl.TEXTURE0)
          gl.bindTexture(gl.TEXTURE_2D, texture)
          gl.uniform1i(u.img ?? null, 0)
          gl.activeTexture(gl.TEXTURE1)
          gl.bindTexture(gl.TEXTURE_2D, texture)
          gl.uniform1i(u.d_map ?? null, 1)
        } else {
          gl.activeTexture(gl.TEXTURE0)
          gl.bindTexture(gl.TEXTURE_2D, texture)
          gl.uniform1i(u.u_texture ?? null, 0)
        }

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      }
    }

    rafRef.current = requestAnimationFrame(renderFrame)
  }

  // React to effect changes: activate, switch, or deactivate.
  useEffect(() => {
    const gl = glRef.current
    if (!gl) return

    // Off: stop loop + audio, clear canvas so the static image shows through.
    if (effectIndex <= 0) {
      effectRef.current = null
      stopLoop()
      const audioEl = audioElRef.current
      if (audioEl) audioEl.pause()
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      return
    }

    const effect = EFFECTS[effectIndex - 1]
    if (!effect) return
    effectRef.current = effect

    // Compile (and cache) the program for this effect's fragment shader.
    if (!programsRef.current.has(effect.frag) && vertShaderRef.current) {
      const info = buildProgram(gl, vertShaderRef.current, FRAGMENTS[effect.frag])
      if (info) programsRef.current.set(effect.frag, info)
    }

    // Audio: init graph (user gesture), resume ctx, swap + play the effect's track.
    ensureAudioGraph()
    const ctx = audioCtxRef.current
    const audioEl = audioElRef.current
    if (ctx && ctx.state === 'suspended') void ctx.resume()
    if (audioEl) {
      const nextSrc = new URL(effect.audio, window.location.origin).href
      if (audioEl.src !== nextSrc) {
        audioEl.src = effect.audio
        audioEl.load()
      }
      void audioEl.play().catch(() => {})
    }

    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(renderFrame)
    }
    // renderFrame reads from refs; stable across renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectIndex])

  const active = effectIndex > 0

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute left-0 top-0 z-10 block h-full w-full object-cover transition-opacity duration-500"
      style={{ opacity: active ? 1 : 0, pointerEvents: 'none' }}
    />
  )
}

export default memo(AudioDistortionBackground)
