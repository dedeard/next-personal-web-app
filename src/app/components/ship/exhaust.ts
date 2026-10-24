// Engine exhaust: layered shader flame attached to the engine, plus world-space smoke particles.
import * as THREE from 'three'

const NOISE = /* glsl */ `
  float hash(vec3 p) { return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
  float noise(vec3 p) {
    vec3 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x), mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x), mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
      f.z);
  }
  float fbm(vec3 p) { float v = 0.0, a = 0.5; for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; } return v; }
`

interface FlameOptions {
  inner: string
  outer: string
  intensity: number
  speed: number
}

function flameMaterial({ inner, outer, intensity, speed }: FlameOptions) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uInner: { value: new THREE.Color(inner) },
      uOuter: { value: new THREE.Color(outer) },
      uIntensity: { value: intensity },
      uSpeed: { value: speed },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      varying vec3 vNormalV;
      varying vec3 vViewDir;
      uniform float uTime;
      ${NOISE}
      void main() {
        vUv = uv;
        vec3 p = position;
        // ripple the flame surface, stronger toward the tail
        float n = fbm(vec3(p.x * 30.0, p.y * 30.0, uv.y * 6.0 - uTime * 6.0));
        p.xy *= 1.0 + (n - 0.5) * 0.6 * uv.y;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        vNormalV = normalize(normalMatrix * normal);
        vViewDir = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec2 vUv;
      varying vec3 vNormalV;
      varying vec3 vViewDir;
      uniform float uTime, uIntensity, uSpeed;
      uniform vec3 uInner, uOuter;
      ${NOISE}
      void main() {
        float along = vUv.y; // 0 at nozzle, 1 at tail
        float n = fbm(vec3(vUv.x * 6.0, along * 4.0 - uTime * uSpeed, uTime * 0.7));
        float edge = pow(abs(dot(vNormalV, vViewDir)), 1.4); // soft silhouette
        float tail = smoothstep(1.0, 0.15, along + (n - 0.5) * 0.5);
        float alpha = edge * tail * (0.55 + n * 0.9) * uIntensity;
        vec3 col = mix(uInner, uOuter, smoothstep(0.0, 0.7, along + n * 0.25));
        gl_FragColor = vec4(col * alpha, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  })
}

function flameCone(radius: number, length: number, material: THREE.Material) {
  // open cone pointing +Z: wide at the nozzle (z=0), narrow at the tail (z=length); uv.y runs nozzle -> tail
  const geo = new THREE.CylinderGeometry(radius * 0.15, radius, length, 32, 24, true)
  geo.translate(0, length / 2, 0)
  geo.rotateX(Math.PI / 2)
  return new THREE.Mesh(geo, material)
}

function smokeTexture() {
  // lumpy puff: a cluster of soft blobs inside a radial falloff, so overlapping particles read as billowing smoke
  const size = 128
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  for (let i = 0; i < 26; i++) {
    const a = Math.random() * Math.PI * 2
    const d = Math.random() * size * 0.22
    const x = size / 2 + Math.cos(a) * d
    const y = size / 2 + Math.sin(a) * d
    const r = size * (0.12 + Math.random() * 0.16)
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r)
    grad.addColorStop(0, 'rgba(255,255,255,0.35)')
    grad.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, size, size)
  }
  ctx.globalCompositeOperation = 'destination-in'
  const mask = ctx.createRadialGradient(size / 2, size / 2, size * 0.2, size / 2, size / 2, size / 2)
  mask.addColorStop(0, 'rgba(255,255,255,1)')
  mask.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = mask
  ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(canvas)
}

interface ExhaustOptions {
  /** object the flame rides on (the spinning engine pivot) */
  mount: THREE.Object3D
  /** nozzle position in mount's local space */
  nozzle: THREE.Vector3
  /** scene that receives the world-space smoke */
  scene: THREE.Scene
  /** nozzle radius */
  radius?: number
}

export function createExhaust({ mount, nozzle, scene, radius = 0.03 }: ExhaustOptions) {
  const flame = new THREE.Group()
  flame.position.copy(nozzle)
  mount.add(flame)

  const materials = [
    flameMaterial({ inner: '#ffffff', outer: '#4fb4ff', intensity: 1.4, speed: 9 }),
    flameMaterial({ inner: '#ffd27a', outer: '#ff4a12', intensity: 1.1, speed: 6 }),
    flameMaterial({ inner: '#ff8a2a', outer: '#7a1a00', intensity: 0.6, speed: 4 }),
  ]
  const cones = [
    flameCone(radius * 0.55, radius * 7, materials[0]),
    flameCone(radius * 0.9, radius * 12, materials[1]),
    flameCone(radius * 1.25, radius * 16, materials[2]),
  ]
  cones.forEach((c) => flame.add(c))

  const light = new THREE.PointLight('#ff7a2a', 0.6, radius * 20, 2)
  light.position.set(0, 0, radius * 1.5)
  flame.add(light)

  // Smoke: fixed pool of particles recycled in world space, so they trail behind instead of spinning.
  const COUNT = 420
  const LIFE = 2.6
  const RATE = 150 // particles per second
  const positions = new Float32Array(COUNT * 3)
  const ages = new Float32Array(COUNT).fill(LIFE)
  const seeds = new Float32Array(COUNT)
  const velocities = Array.from({ length: COUNT }, () => new THREE.Vector3())
  for (let i = 0; i < COUNT; i++) seeds[i] = Math.random()
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geo.setAttribute('aAge', new THREE.BufferAttribute(ages, 1))
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
  const smokeMap = smokeTexture()
  const smokeMat = new THREE.ShaderMaterial({
    uniforms: {
      uMap: { value: smokeMap },
      uLife: { value: LIFE },
      uSize: { value: radius },
      uViewportHeight: { value: 1000 },
    },
    vertexShader: /* glsl */ `
      attribute float aAge, aSeed;
      varying float vT, vSeed;
      uniform float uLife, uSize, uViewportHeight;
      void main() {
        vT = clamp(aAge / uLife, 0.0, 1.0);
        vSeed = aSeed;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        // world-space puff size (grows as it ages) projected to pixels
        float worldSize = uSize * (1.6 + vT * 4.0) * (0.8 + aSeed * 0.4);
        gl_PointSize = worldSize * projectionMatrix[1][1] * uViewportHeight * 0.5 / -mv.z;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      varying float vT, vSeed;
      uniform sampler2D uMap;
      void main() {
        // spin each puff by its seed and as it ages so the shared texture doesn't repeat visibly
        float ang = vSeed * 6.2831 + vT * (vSeed - 0.5) * 3.0;
        vec2 pc = gl_PointCoord - 0.5;
        pc = mat2(cos(ang), -sin(ang), sin(ang), cos(ang)) * pc + 0.5;
        float a = texture2D(uMap, pc).a;
        float fade = smoothstep(0.0, 0.08, vT) * (1.0 - smoothstep(0.35, 1.0, vT));
        vec3 col = mix(vec3(0.5, 0.36, 0.3), vec3(0.6), smoothstep(0.0, 0.3, vT)) * (0.85 + vSeed * 0.25);
        float alpha = a * fade * 0.55;
        if (alpha < 0.003) discard;
        gl_FragColor = vec4(col, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
  })
  const smoke = new THREE.Points(geo, smokeMat)
  smoke.frustumCulled = false
  scene.add(smoke)

  const emitPoint = new THREE.Vector3()
  const lastEmit = new THREE.Vector3()
  const spawn = new THREE.Vector3()
  const emitDir = new THREE.Vector3()
  const drift = new THREE.Vector3()
  let hasLastEmit = false
  let cursor = 0
  let carry = 0

  function update(dt: number, time: number, viewportHeight?: number) {
    materials.forEach((m) => (m.uniforms.uTime.value = time))
    if (viewportHeight) smokeMat.uniforms.uViewportHeight.value = viewportHeight
    const flicker = 0.92 + Math.sin(time * 38) * 0.04 + Math.sin(time * 23.7) * 0.04
    flame.scale.set(flicker, flicker, 0.9 + (flicker - 0.92) * 2.5)
    light.intensity = 0.45 + flicker * 0.25

    // emit from the flame tail, along the exhaust direction (world space)
    flame.updateWorldMatrix(true, false)
    emitPoint.set(0, 0, radius * 10).applyMatrix4(flame.matrixWorld)
    emitDir.set(0, 0, 1).transformDirection(flame.matrixWorld)
    if (!hasLastEmit) lastEmit.copy(emitPoint)
    hasLastEmit = true
    carry += dt * RATE
    const batch = Math.floor(carry)
    for (let k = 0; k < batch; k++) {
      carry -= 1
      const i = cursor
      cursor = (cursor + 1) % COUNT
      // spread this frame's particles along the path travelled since the last frame, so fast moves leave a continuous trail
      spawn.lerpVectors(lastEmit, emitPoint, (k + Math.random()) / batch)
      ages[i] = Math.random() * dt
      positions[i * 3] = spawn.x + (Math.random() - 0.5) * radius
      positions[i * 3 + 1] = spawn.y + (Math.random() - 0.5) * radius
      positions[i * 3 + 2] = spawn.z + (Math.random() - 0.5) * radius
      drift.set((Math.random() - 0.5) * radius * 2, radius * (0.5 + Math.random()), (Math.random() - 0.5) * radius * 2)
      velocities[i]
        .copy(emitDir)
        .multiplyScalar(radius * (11 + Math.random() * 6))
        .add(drift)
    }
    lastEmit.copy(emitPoint)
    for (let i = 0; i < COUNT; i++) {
      if (ages[i] >= LIFE) continue
      ages[i] += dt
      const v = velocities[i]
      v.multiplyScalar(1 - dt * 0.6) // drag
      v.y += radius * 0.6 * dt // smoke rises
      positions[i * 3] += v.x * dt
      positions[i * 3 + 1] += v.y * dt
      positions[i * 3 + 2] += v.z * dt
    }
    geo.attributes.position.needsUpdate = true
    geo.attributes.aAge.needsUpdate = true
  }

  function dispose() {
    scene.remove(smoke)
    mount.remove(flame)
    geo.dispose()
    smokeMat.dispose()
    smokeMap.dispose()
    materials.forEach((m) => m.dispose())
    cones.forEach((c) => c.geometry.dispose())
  }

  return { update, dispose }
}
