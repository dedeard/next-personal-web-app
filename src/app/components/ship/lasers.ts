// Twin laser cannons: glowing bolts fired along the ship's nose (-Z), with a muzzle flash.
import * as THREE from 'three'

function boltMaterial(color: string, core: boolean) {
  return new THREE.ShaderMaterial({
    uniforms: { uColor: { value: new THREE.Color(color) }, uFade: { value: 1 } },
    vertexShader: /* glsl */ `
      varying vec3 vNormalV;
      varying vec3 vViewDir;
      varying float vAlong;
      void main() {
        vAlong = uv.y;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vNormalV = normalize(normalMatrix * normal);
        vViewDir = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vNormalV;
      varying vec3 vViewDir;
      varying float vAlong;
      uniform vec3 uColor;
      uniform float uFade;
      void main() {
        float edge = pow(abs(dot(vNormalV, vViewDir)), ${core ? '0.6' : '2.2'});
        float ends = smoothstep(0.0, 0.25, vAlong) * smoothstep(1.0, 0.6, vAlong);
        float a = edge * ends * uFade * ${core ? '1.0' : '0.8'};
        vec3 col = ${core ? 'mix(uColor, vec3(1.0), 0.75)' : 'uColor'};
        gl_FragColor = vec4(col * a, a);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
}

interface Bolt {
  group: THREE.Group
  velocity: THREE.Vector3
  age: number
  materials: THREE.ShaderMaterial[]
}

interface LaserOptions {
  /** ship group; muzzles are in its local space and bolts fly along its -Z */
  ship: THREE.Object3D
  /** bolts live in world space so they keep flying straight after a turn */
  scene: THREE.Scene
  /** gun positions in ship space */
  muzzles: THREE.Vector3[]
  color?: string
  speed?: number
  life?: number
  length?: number
  /** shots per second while firing */
  rate?: number
  onFire?: (origin: THREE.Vector3) => void
}

export function createLasers({
  ship,
  scene,
  muzzles,
  color = '#3fe8ff',
  speed = 7,
  life = 1.1,
  length = 0.45,
  rate = 9,
  onFire,
}: LaserOptions) {
  const coreGeo = new THREE.CylinderGeometry(0.006, 0.006, length, 8, 1, true)
  const glowGeo = new THREE.CylinderGeometry(0.022, 0.022, length * 1.15, 12, 1, true)
  ;[coreGeo, glowGeo].forEach((g) => g.rotateX(-Math.PI / 2)) // align along -Z, uv.y runs tail -> tip

  const bolts: Bolt[] = []
  const flashes = muzzles.map((m) => {
    const light = new THREE.PointLight(color, 0, 0.6, 2)
    light.position.copy(m)
    ship.add(light)
    const sprite = new THREE.Mesh(new THREE.SphereGeometry(0.03, 12, 8), boltMaterial(color, false))
    sprite.position.copy(m)
    sprite.visible = false
    ship.add(sprite)
    return { light, sprite, t: 1 }
  })

  const origin = new THREE.Vector3()
  const forward = new THREE.Vector3()
  const quat = new THREE.Quaternion()
  let firing = false
  let cooldown = 0
  let side = 0

  function fireOnce() {
    ship.updateWorldMatrix(true, false)
    ship.getWorldQuaternion(quat)
    forward.set(0, 0, -1).applyQuaternion(quat)
    // alternate guns for a left-right rhythm
    const i = side++ % muzzles.length
    origin.copy(muzzles[i]).applyMatrix4(ship.matrixWorld)
    const group = new THREE.Group()
    const core = new THREE.Mesh(coreGeo, boltMaterial(color, true))
    const glow = new THREE.Mesh(glowGeo, boltMaterial(color, false))
    group.add(glow, core)
    group.quaternion.copy(quat)
    group.position.copy(origin).addScaledVector(forward, length / 2)
    scene.add(group)
    bolts.push({ group, velocity: forward.clone().multiplyScalar(speed), age: 0, materials: [core.material, glow.material] })
    flashes[i].t = 0
    onFire?.(origin)
  }

  function removeBolt(index: number) {
    const bolt = bolts[index]
    scene.remove(bolt.group)
    bolt.materials.forEach((m) => m.dispose())
    bolts.splice(index, 1)
  }

  function update(dt: number) {
    cooldown -= dt
    if (firing && cooldown <= 0) {
      fireOnce()
      cooldown = 1 / rate
    }
    for (let b = bolts.length - 1; b >= 0; b--) {
      const bolt = bolts[b]
      bolt.age += dt
      bolt.group.position.addScaledVector(bolt.velocity, dt)
      const fade = 1 - THREE.MathUtils.smoothstep(bolt.age, life * 0.6, life)
      bolt.materials.forEach((m) => (m.uniforms.uFade.value = fade))
      if (bolt.age >= life) removeBolt(b)
    }
    flashes.forEach((f) => {
      f.t += dt
      const k = Math.max(0, 1 - f.t / 0.08)
      f.light.intensity = k * 2.5
      f.sprite.visible = k > 0
      f.sprite.scale.setScalar(0.6 + k)
      ;(f.sprite.material as THREE.ShaderMaterial).uniforms.uFade.value = k
    })
  }

  return {
    update,
    start() {
      if (!firing) cooldown = 0 // first shot right away
      firing = true
    },
    stop() {
      firing = false
    },
    dispose() {
      for (let b = bolts.length - 1; b >= 0; b--) removeBolt(b)
      flashes.forEach((f) => {
        ship.remove(f.light, f.sprite)
        f.sprite.geometry.dispose()
        ;(f.sprite.material as THREE.Material).dispose()
      })
      coreGeo.dispose()
      glowGeo.dispose()
    },
  }
}
