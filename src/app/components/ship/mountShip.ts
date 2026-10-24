import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { createExhaust } from './exhaust'
import { createMouseFollow } from './follow'
import { createLasers } from './lasers'
import { createShipSound } from './sound'

const MODEL_URL = '/media/models/fighter.glb'
const MUTE_KEY = 'ship-muted'
// Points measured on the model, in its own coordinates: the engine nozzle (+Z is the tail) and the twin guns.
const NOZZLE = new THREE.Vector3(-0.0013, -0.031, 0.245)
const MUZZLES = [new THREE.Vector3(-0.085, -0.03, -0.52), new THREE.Vector3(0.085, -0.03, -0.52)]

const isTyping = (el: EventTarget | null) =>
  el instanceof HTMLElement && (el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName))

/**
 * Full-screen fighter that follows the mouse, hovers and fires when the mouse is still, and shoots on click.
 * Renders into `container` and returns a cleanup function.
 */
export function mountShip(container: HTMLElement) {
  let disposed = false
  const cleanups: (() => void)[] = []
  const listen = <K extends keyof WindowEventMap>(type: K, fn: (e: WindowEventMap[K]) => void) => {
    window.addEventListener(type, fn)
    cleanups.push(() => window.removeEventListener(type, fn))
  }

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  renderer.setSize(innerWidth, innerHeight)
  container.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const pmrem = new THREE.PMREMGenerator(renderer)
  const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  scene.environment = envMap
  const camera = new THREE.PerspectiveCamera(40, innerWidth / innerHeight, 0.01, 100)
  camera.position.set(0, 4.6, 3.7) // the ship flies at this distance by default, so this sets its on-screen size
  camera.lookAt(0, 0, 0)
  camera.updateMatrixWorld()

  let muted = false
  try {
    muted = localStorage.getItem(MUTE_KEY) === '1'
  } catch {}
  const sound = createShipSound({ muted })
  const screenX = (v: THREE.Vector3) => v.clone().project(camera).x // -1 left .. 1 right, for stereo pan

  let frame: ((dt: number, time: number) => void) | null = null
  const clock = new THREE.Clock()
  const render = () => {
    const dt = Math.min(clock.getDelta(), 0.05)
    frame?.(dt, clock.elapsedTime)
    renderer.render(scene, camera)
  }

  new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).load(MODEL_URL, (gltf) => {
    if (disposed) return
    const model = gltf.scene
    const mixer = new THREE.AnimationMixer(model)
    gltf.animations.forEach((clip) => mixer.clipAction(clip).play())

    // flame rides on the spinning engine; nozzle converted from model space into the pivot's space
    const pivot = model.getObjectByName('engine_pivot')!
    model.updateMatrixWorld(true)
    const exhaust = createExhaust({ mount: pivot, nozzle: pivot.worldToLocal(NOZZLE.clone()), scene })

    // centre the model inside a ship group that the follow controller flies around
    const center = new THREE.Box3().setFromObject(model).getCenter(new THREE.Vector3())
    model.position.sub(center)
    const ship = new THREE.Group()
    ship.add(model)
    scene.add(ship)

    const follow = createMouseFollow({ ship, camera })
    const lasers = createLasers({
      ship,
      scene,
      muzzles: MUZZLES.map((m) => m.clone().sub(center)),
      onFire: (origin) => sound.laser(screenX(origin)),
    })

    // guns fire while the button is held, or in bursts while the ship hovers idle in the centre
    let userFiring = false
    listen('pointerdown', (e) => {
      sound.unlock() // audio may only start inside a user gesture
      if (e.button === 0 && !isTyping(e.target)) userFiring = true
    })
    listen('pointerup', () => (userFiring = false))
    listen('blur', () => (userFiring = false))

    frame = (dt, time) => {
      mixer.update(dt)
      follow.update(dt, time)
      const burst = follow.idle && time % 1.6 < 0.7 // ~0.7s volley, ~0.9s pause
      if (userFiring || burst) lasers.start()
      else lasers.stop()
      lasers.update(dt)
      exhaust.update(dt, time, renderer.domElement.height)
      sound.engine(follow.speed, follow.nearness, screenX(ship.position))
    }

    cleanups.push(() => {
      follow.dispose()
      lasers.dispose()
      exhaust.dispose()
      mixer.stopAllAction()
      model.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose()
          const mats = Array.isArray(o.material) ? o.material : [o.material]
          mats.forEach((m) => {
            const pbr = m as THREE.MeshStandardMaterial
            ;[pbr.map, pbr.normalMap, pbr.roughnessMap, pbr.metalnessMap].forEach((t) => t?.dispose())
            m.dispose()
          })
        }
      })
    })
  })

  listen('keydown', (e) => {
    if (e.key.toLowerCase() !== 'm' || e.ctrlKey || e.metaKey || e.altKey || isTyping(e.target)) return
    const nowMuted = sound.toggleMute()
    try {
      localStorage.setItem(MUTE_KEY, nowMuted ? '1' : '0')
    } catch {}
  })
  listen('resize', () => {
    camera.aspect = innerWidth / innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(innerWidth, innerHeight)
  })
  const onVisibility = () => {
    if (document.hidden) {
      renderer.setAnimationLoop(null)
      sound.suspend()
    } else {
      clock.getDelta() // drop the time spent hidden
      renderer.setAnimationLoop(render)
      sound.resume()
    }
  }
  document.addEventListener('visibilitychange', onVisibility)
  cleanups.push(() => document.removeEventListener('visibilitychange', onVisibility))

  renderer.setAnimationLoop(render)

  return () => {
    disposed = true
    renderer.setAnimationLoop(null)
    cleanups.forEach((fn) => fn())
    sound.dispose()
    envMap.dispose()
    pmrem.dispose()
    renderer.dispose()
    renderer.domElement.remove()
  }
}
