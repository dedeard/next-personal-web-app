import { animated, useSpring } from '@react-spring/three'
import { useAnimations, useGLTF } from '@react-three/drei'
import { GroupProps } from '@react-three/fiber'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    BezierCurve003_foliage_baked_0: THREE.Mesh
    BezierCurve003_foliage_baked_0_1: THREE.Mesh
    building_D_pipes_pipes_moving_baked_0: THREE.Mesh
    rock_left_stones_0: THREE.Mesh
    rock_left_ROCKS_SMALL_0: THREE.Mesh
    rock_left_rock_A_0: THREE.Mesh
    rock_left_rock_B_0: THREE.Mesh
    stone_small_C001_rock_top_baked_0: THREE.Mesh
    stone_small_C002_rock_right_baked_0: THREE.Mesh
    rock_middle_rock_middle_baked_0: THREE.Mesh
    bridge_suspended002_platform_calm_0: THREE.Mesh
    bridge_suspended010_platform_unstable_baked_0: THREE.Mesh
    _rootJoint: THREE.Bone
  }
  materials: {
    foliage_baked: THREE.Material
    pipes_moving_baked: THREE.Material
    stones: THREE.Material
    ROCKS_SMALL: THREE.Material
    rock_A: THREE.Material
    rock_B: THREE.Material
    rock_top_baked: THREE.Material
    rock_right_baked: THREE.Material
    rock_middle_baked: THREE.Material
    platform_calm: THREE.Material
    platform_unstable_baked: THREE.Material
  }
  animations: THREE.AnimationClip[]
}

type WorldProps = {
  isAudioPlay?: boolean
  position?: [number, number, number]
  rotation?: [number, number, number]
} & GroupProps

type Position = {
  x: number
  y: number
  z: number
}

type Rotation = {
  x: number
  y: number
  z: number
}

export function World({ isAudioPlay, ...props }: WorldProps) {
  const group = useRef<THREE.Group>(null)
  const pathname = usePathname()
  const [position, setPosition] = useState<Position>({ x: 6, y: -9, z: -28 })
  const [rotation, setRotation] = useState<Rotation>({ x: 0, y: 2.4, z: 0 })
  const [glitchIntensity, setGlitchIntensity] = useState<number>(0)

  // Audio analysis setup
  const audioContext = useRef<AudioContext | null>(null)
  const analyser = useRef<AnalyserNode | null>(null)
  const sourceNode = useRef<AudioBufferSourceNode | null>(null)
  const animationFrame = useRef<number | null>(null)

  // Main position and rotation springs
  const springs = useSpring({
    to: {
      px: position.x,
      py: position.y,
      pz: position.z,
      rx: rotation.x,
      ry: rotation.y,
      rz: rotation.z,
    },
    config: {
      duration: 1500,
      easing: (t: number) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
    },
  })

  // Glitch effect spring for Sketchfab_Scene
  const shakeSpring = useSpring({
    to: {
      x: glitchIntensity * (Math.random() - 0.5) * 2,
      y: glitchIntensity * (Math.random() - 0.5) * 2,
      z: glitchIntensity * (Math.random() - 0.5) * 2,
    },
    config: {
      duration: 50,
      friction: 20,
    },
  })

  useEffect(() => {
    if (isAudioPlay) {
      void initAudio()
    } else {
      stopAudio()
    }

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
      if (audioContext.current) {
        void audioContext.current.close()
        audioContext.current = null
      }
    }
  }, [isAudioPlay])

  const initAudio = async (): Promise<void> => {
    try {
      if (audioContext.current) return

      audioContext.current = new AudioContext()
      analyser.current = audioContext.current.createAnalyser()
      analyser.current.fftSize = 256

      const response = await fetch('/audio/audio.mp3')
      const arrayBuffer = await response.arrayBuffer()
      const audioBuffer = await audioContext.current.decodeAudioData(arrayBuffer)

      sourceNode.current = audioContext.current.createBufferSource()
      sourceNode.current.buffer = audioBuffer
      sourceNode.current.loop = true
      sourceNode.current.connect(analyser.current)
      analyser.current.connect(audioContext.current.destination) // Agar suara terdengar

      sourceNode.current.start(0)
      analyze()
    } catch (error) {
      console.error('Error initializing audio:', error)
    }
  }

  const stopAudio = () => {
    if (sourceNode.current) {
      sourceNode.current.stop()
      sourceNode.current.disconnect()
      sourceNode.current = null
    }
    if (audioContext.current) {
      void audioContext.current.close()
      audioContext.current = null
    }
    setGlitchIntensity(0)
  }

  const analyze = (): void => {
    if (!analyser.current) return

    const dataArray = new Uint8Array(analyser.current.frequencyBinCount)

    const updateGlitch = () => {
      if (!analyser.current) return

      analyser.current.getByteFrequencyData(dataArray)

      // Calculate average amplitude
      const average = dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length
      const normalizedIntensity = average / 255 // Normalize to 0-1

      setGlitchIntensity(normalizedIntensity)
      animationFrame.current = requestAnimationFrame(updateGlitch)
    }

    updateGlitch()
  }

  // Path-based position updates
  useEffect(() => {
    if (pathname === '/about') {
      setPosition({ x: 6, y: -9, z: -28 })
      setRotation({ x: 0, y: 3, z: 0 })
    } else if (pathname === '/contact') {
      setPosition({ x: -36, y: -13, z: -35 })
      setRotation({ x: 0, y: 1, z: 0 })
    } else if (pathname === '/projects') {
      setPosition({ x: 5, y: 1, z: -109 })
      setRotation({ x: 0, y: 1.2, z: 0.2 })
    } else if (pathname === '/guestbook') {
      setPosition({ x: 8, y: -18, z: -51 })
      setRotation({ x: 0.24, y: 4.8, z: 0 })
    } else {
      setPosition({ x: 6, y: -9, z: -28 })
      setRotation({ x: 0, y: 2.4, z: 0 })
    }
  }, [pathname])

  const { nodes, materials, animations } = useGLTF('/glb/mobile_home.glb') as GLTFResult
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    actions['Scene']?.play?.()
  }, [actions])

  return (
    <animated.group
      ref={group}
      position-x={springs.px}
      position-y={springs.py}
      position-z={springs.pz}
      rotation-x={springs.rx}
      rotation-y={springs.ry}
      rotation-z={springs.rz}
      dispose={null}
      {...props}
    >
      <animated.group name="Sketchfab_Scene" position-x={shakeSpring.x} position-y={shakeSpring.y} position-z={shakeSpring.z}>
        <group name="Sketchfab_model" rotation={[Math.PI / 2, 0, -Math.PI]}>
          <group name="622331dd64104be7aa66e2f7d6b5dc8efbx" rotation={[-Math.PI, 0, 0]} scale={0.01}>
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="BezierCurve003"
                  position={[1208.747, -1918.884, -205.693]}
                  rotation={[0, 0, -Math.PI / 2]}
                  scale={[73.461, 114.205, 73.461]}
                >
                  <mesh
                    name="BezierCurve003_foliage_baked_0"
                    geometry={nodes.BezierCurve003_foliage_baked_0.geometry}
                    material={materials.foliage_baked}
                  />
                  <mesh
                    name="BezierCurve003_foliage_baked_0_1"
                    geometry={nodes.BezierCurve003_foliage_baked_0_1.geometry}
                    material={materials.foliage_baked}
                  />
                </group>
                <group name="building_D_pipes" position={[70.961, 517.462, 1209.234]} rotation={[0, 0, Math.PI]} scale={100}>
                  <mesh
                    name="building_D_pipes_pipes_moving_baked_0"
                    geometry={nodes.building_D_pipes_pipes_moving_baked_0.geometry}
                    material={materials.pipes_moving_baked}
                  />
                </group>
                <group name="rock_left" position={[-1129.298, 4955.811, 5110.5]} rotation={[0, 0, -Math.PI / 2]} scale={100}>
                  <mesh name="rock_left_stones_0" geometry={nodes.rock_left_stones_0.geometry} material={materials.stones} />
                  <mesh name="rock_left_ROCKS_SMALL_0" geometry={nodes.rock_left_ROCKS_SMALL_0.geometry} material={materials.ROCKS_SMALL} />
                  <mesh name="rock_left_rock_A_0" geometry={nodes.rock_left_rock_A_0.geometry} material={materials.rock_A} />
                  <mesh name="rock_left_rock_B_0" geometry={nodes.rock_left_rock_B_0.geometry} material={materials.rock_B} />
                </group>
                <group name="stone_small_C001" position={[-1129.298, 4955.811, 5110.5]} rotation={[0, 0, -Math.PI / 2]} scale={100}>
                  <mesh
                    name="stone_small_C001_rock_top_baked_0"
                    geometry={nodes.stone_small_C001_rock_top_baked_0.geometry}
                    material={materials.rock_top_baked}
                  />
                </group>
                <group name="stone_small_C002" position={[-1129.298, 4955.811, 5110.5]} rotation={[0, 0, -Math.PI / 2]} scale={100}>
                  <mesh
                    name="stone_small_C002_rock_right_baked_0"
                    geometry={nodes.stone_small_C002_rock_right_baked_0.geometry}
                    material={materials.rock_right_baked}
                  />
                </group>
                <group name="rock_middle" position={[-1129.298, 4955.811, 5110.5]} rotation={[0, 0, -Math.PI / 2]} scale={100}>
                  <mesh
                    name="rock_middle_rock_middle_baked_0"
                    geometry={nodes.rock_middle_rock_middle_baked_0.geometry}
                    material={materials.rock_middle_baked}
                  />
                </group>
                <group name="bridge_suspended002" position={[-2351.661, 3178, 1078.609]} rotation={[0, 0, -2.834]} scale={100}>
                  <mesh
                    name="bridge_suspended002_platform_calm_0"
                    geometry={nodes.bridge_suspended002_platform_calm_0.geometry}
                    material={materials.platform_calm}
                  />
                </group>
                <group name="Armature001" position={[-154.142, 606.122, -66.65]} rotation={[0, 0, -Math.PI / 2]} scale={100}>
                  <group name="Object_23">
                    <primitive object={nodes._rootJoint} />
                  </group>
                </group>
                <group name="bridge_suspended010" position={[641.867, -5206.882, 755.615]} rotation={[0, 0, -Math.PI / 2]} scale={100}>
                  <mesh
                    name="bridge_suspended010_platform_unstable_baked_0"
                    geometry={nodes.bridge_suspended010_platform_unstable_baked_0.geometry}
                    material={materials.platform_unstable_baked}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </animated.group>
    </animated.group>
  )
}

useGLTF.preload('/glb/mobile_home.glb')
