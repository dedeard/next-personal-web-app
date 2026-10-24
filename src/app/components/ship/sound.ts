// Synthesized ship audio (Web Audio, no files): a laser "pew" per shot and an engine rumble whose
// loudness and pitch follow the ship's speed and distance. Browsers only allow audio after a user
// gesture, so call unlock() from a click/pointerdown handler.

function noiseBuffer(ctx: AudioContext, seconds: number, brown: boolean) {
  const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * seconds), ctx.sampleRate)
  const data = buffer.getChannelData(0)
  let last = 0
  for (let i = 0; i < data.length; i++) {
    const white = Math.random() * 2 - 1
    if (brown) {
      last = (last + 0.02 * white) / 1.02
      data[i] = last * 3.5
    } else {
      data[i] = white
    }
  }
  return buffer
}

const clampPan = (pan: number) => Math.max(-1, Math.min(1, pan))

export function createShipSound({ volume = 0.45, muted: startMuted = false } = {}) {
  let ctx: AudioContext | null = null
  let master: GainNode
  let engineGain: GainNode
  let engineFilter: BiquadFilterNode
  let enginePan: StereoPannerNode
  let hum: OscillatorNode
  let crackBuffer: AudioBuffer
  let muted = startMuted

  function init() {
    ctx = new AudioContext()
    master = ctx.createGain()
    master.gain.value = muted ? 0 : volume
    master.connect(ctx.destination)
    crackBuffer = noiseBuffer(ctx, 0.05, false)

    // engine: looping brown noise through a lowpass, plus a low sawtooth hum
    enginePan = ctx.createStereoPanner()
    engineGain = ctx.createGain()
    engineGain.gain.value = 0
    engineFilter = ctx.createBiquadFilter()
    engineFilter.type = 'lowpass'
    engineFilter.frequency.value = 300
    engineFilter.Q.value = 2
    const rumble = ctx.createBufferSource()
    rumble.buffer = noiseBuffer(ctx, 4, true)
    rumble.loop = true
    hum = ctx.createOscillator()
    hum.type = 'sawtooth'
    hum.frequency.value = 52
    const humGain = ctx.createGain()
    humGain.gain.value = 0.18
    rumble.connect(engineFilter)
    hum.connect(humGain).connect(engineFilter)
    engineFilter.connect(engineGain).connect(enginePan).connect(master)
    rumble.start()
    hum.start()
  }

  const running = () => !!ctx && ctx.state === 'running'

  return {
    /** Start audio; must run inside a user gesture. */
    unlock() {
      if (!ctx) init()
      if (ctx!.state === 'suspended') void ctx!.resume()
    },
    get muted() {
      return muted
    },
    toggleMute() {
      muted = !muted
      if (ctx) master.gain.setTargetAtTime(muted ? 0 : volume, ctx.currentTime, 0.05)
      return muted
    },

    /** One laser shot. pan: -1 (left) .. 1 (right). */
    laser(pan = 0) {
      if (!running()) return
      const audio = ctx!
      const t = audio.currentTime
      const out = audio.createStereoPanner()
      out.pan.value = clampPan(pan)
      out.connect(master)

      const detune = 1 + (Math.random() - 0.5) * 0.12
      const osc = audio.createOscillator()
      osc.type = 'square'
      osc.frequency.setValueAtTime(1700 * detune, t)
      osc.frequency.exponentialRampToValueAtTime(140 * detune, t + 0.17)
      const oscGain = audio.createGain()
      oscGain.gain.setValueAtTime(0.0001, t)
      oscGain.gain.exponentialRampToValueAtTime(0.16, t + 0.005)
      oscGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.2)
      const tone = audio.createBiquadFilter()
      tone.type = 'lowpass'
      tone.frequency.value = 4200
      osc.connect(tone).connect(oscGain).connect(out)
      osc.start(t)
      osc.stop(t + 0.22)

      // tiny noise crack at the start
      const crack = audio.createBufferSource()
      crack.buffer = crackBuffer
      const hp = audio.createBiquadFilter()
      hp.type = 'highpass'
      hp.frequency.value = 2500
      const crackGain = audio.createGain()
      crackGain.gain.setValueAtTime(0.08, t)
      crackGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.05)
      crack.connect(hp).connect(crackGain).connect(out)
      crack.start(t)
    },

    /**
     * Per-frame engine update.
     * @param speed ship speed (world units / s)
     * @param near  0 (far away) .. 1 (close to camera)
     * @param pan   -1 .. 1
     */
    engine(speed: number, near: number, pan: number) {
      if (!running()) return
      const t = ctx!.currentTime
      const s = Math.min(speed / 3, 1)
      engineGain.gain.setTargetAtTime((0.12 + s * 0.35) * (0.25 + near * 0.75), t, 0.1)
      engineFilter.frequency.setTargetAtTime(260 + s * 900, t, 0.1)
      hum.frequency.setTargetAtTime(48 + s * 40, t, 0.1)
      enginePan.pan.setTargetAtTime(clampPan(pan) * 0.7, t, 0.1)
    },

    /** Silence the engine without tearing the graph down (e.g. while the tab is hidden). */
    suspend() {
      if (ctx && ctx.state === 'running') void ctx.suspend()
    },
    resume() {
      if (ctx && ctx.state === 'suspended') void ctx.resume()
    },
    dispose() {
      void ctx?.close()
      ctx = null
    },
  }
}
