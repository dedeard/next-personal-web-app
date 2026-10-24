// Fly a ship toward the mouse: it chases the point under the pointer at a given distance from the
// camera, turns its nose (-Z) toward its direction of travel, pitches with climbs/dives and banks into turns.
// Wheel scrolling pushes that distance out (ship flies away) or pulls it in (ship comes closer); the page
// still scrolls normally. When the pointer has been still for `idleDelay` seconds the ship returns to the
// centre of the view and hovers there, nose pointing away from the camera, until the mouse moves again.
import * as THREE from 'three'

interface FollowOptions {
  ship: THREE.Object3D
  camera: THREE.PerspectiveCamera
  distance?: number
  minDistance?: number
  maxDistance?: number
  speed?: number
  maxBank?: number
  idleDelay?: number
}

export function createMouseFollow({
  ship,
  camera,
  distance = camera.position.length(),
  minDistance = distance * 0.5,
  maxDistance = distance * 2.4,
  speed = 2.6,
  maxBank = 0.7,
  idleDelay = 2,
}: FollowOptions) {
  const raycaster = new THREE.Raycaster()
  const ndc = new THREE.Vector2(0, 0)
  const CENTER = new THREE.Vector2(0, 0)
  const target = new THREE.Vector3()
  const right = new THREE.Vector3()
  const up = new THREE.Vector3()
  const base = ship.position.clone() // smoothed flight position, before the hover bob
  const prev = ship.position.clone()
  const velocity = new THREE.Vector3()
  let targetDistance = distance
  let currentDistance = distance
  let yaw = 0
  let pitch = 0
  let bank = 0
  let now = 0
  let lastMove = -Infinity // idle until the pointer first moves
  let idle = true

  function onMove(e: PointerEvent) {
    lastMove = now
    ndc.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1)
  }
  function onWheel(e: WheelEvent) {
    setDistance(targetDistance * Math.exp(e.deltaY * 0.0012))
  }
  function setDistance(d: number) {
    targetDistance = THREE.MathUtils.clamp(d, minDistance, maxDistance)
  }
  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('wheel', onWheel, { passive: true })

  const wrap = (a: number) => Math.atan2(Math.sin(a), Math.cos(a))

  function update(dt: number, time: number) {
    now = time
    idle = time - lastMove > idleDelay
    currentDistance += (targetDistance - currentDistance) * (1 - Math.exp(-dt * 3))
    raycaster.setFromCamera(idle ? CENTER : ndc, camera)
    raycaster.ray.at(currentDistance, target)
    if (idle) {
      // lazy figure-eight drift around the centre, in screen-aligned directions
      right.setFromMatrixColumn(camera.matrixWorld, 0)
      up.setFromMatrixColumn(camera.matrixWorld, 1)
      const r = currentDistance * 0.07
      target.addScaledVector(right, Math.sin(time * 0.6) * r).addScaledVector(up, Math.sin(time * 1.2) * r * 0.35)
    }

    prev.copy(base)
    base.lerp(target, 1 - Math.exp(-dt * (idle ? speed * 0.8 : speed)))
    velocity.subVectors(base, prev).divideScalar(Math.max(dt, 1e-4))

    const planar = Math.hypot(velocity.x, velocity.z)
    const hovering = idle && base.distanceTo(target) < currentDistance * 0.1
    let turnRate = 0
    let desired: number | null = null
    if (hovering) {
      // face away from the camera (nose into the scene) with a gentle sway, ready to shoot
      const camYaw = Math.atan2(camera.position.x - base.x, camera.position.z - base.z)
      desired = camYaw + Math.sin(time * 0.9) * 0.22
    } else if (planar > 0.05) {
      // nose is local -Z: heading angle that maps -Z onto the travel direction
      desired = Math.atan2(-velocity.x, -velocity.z)
    }
    if (desired !== null) {
      const step = wrap(desired - yaw) * (1 - Math.exp(-dt * (hovering ? 2.5 : 6)))
      yaw = wrap(yaw + step)
      turnRate = step / Math.max(dt, 1e-4)
    }
    const climb = planar + Math.abs(velocity.y) > 0.05 ? Math.atan2(velocity.y, Math.max(planar, 0.3)) : 0
    pitch += (THREE.MathUtils.clamp(climb * 0.8, -0.6, 0.6) - pitch) * (1 - Math.exp(-dt * 4))
    bank += (THREE.MathUtils.clamp(-turnRate * 0.35, -maxBank, maxBank) - bank) * (1 - Math.exp(-dt * 5))

    ship.rotation.set(pitch, yaw, bank, 'YXZ')
    ship.position.copy(base)
    ship.position.y += Math.sin(time * 1.6) * 0.02 // idle hover bob
  }

  return {
    update,
    setDistance,
    /** true while the pointer has been still long enough that the ship is hovering in the centre */
    get idle() {
      return idle
    },
    /** ship speed in world units per second */
    get speed() {
      return velocity.length()
    },
    /** 0 at the far limit, 1 at the near limit */
    get nearness() {
      return 1 - (currentDistance - minDistance) / (maxDistance - minDistance)
    },
    dispose() {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('wheel', onWheel)
    },
  }
}
