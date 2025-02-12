'use client'

import { useRootBackground } from '@/contexts/RootBackgroundContext'
import { Environment, Lightformer } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, memo, useEffect, useRef, useState } from 'react'
import { FiVolume2, FiVolumeX } from 'react-icons/fi'
import * as THREE from 'three'
import { World } from './World'

const CameraController = () => {
  const { camera } = useThree()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const targetRotation = useRef(new THREE.Euler())

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Convert mouse position to normalized coordinates (-1 to 1)
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = (event.clientY / window.innerHeight) * 2 - 1
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state, delta) => {
    // Calculate target rotation based on mouse position
    // Significantly reduced rotation range (80% less)
    targetRotation.current.y = mousePosition.x * Math.PI * 0.06
    targetRotation.current.x = mousePosition.y * Math.PI * 0.1

    // Smoothly interpolate current rotation to target rotation
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, targetRotation.current.x, delta * 0.16)
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, targetRotation.current.y, delta * 2)
  })

  return null
}

const WorldControl = () => {
  const { isVideoPlayed, toggleVideo } = useRootBackground()
  return (
    <>
      <button
        aria-label="Audio toggle"
        type="button"
        className="fixed right-0 top-0 z-[120] mr-3 mt-3 leading-none md:mr-5 md:mt-5 lg:mr-10"
        onClick={() => toggleVideo()}
      >
        {isVideoPlayed ? <FiVolume2 size={18} /> : <FiVolumeX size={18} />}
      </button>
      <div className="fixed flex inset-0 z-[10] h-screen w-screen">
        {/* <AudioGlitch /> */}

        <div className="pointer-events-none  flex-1">
          <Canvas className="touch-none relative  z-10">
            <CameraController />

            {/* Ambient light for general illumination */}
            <ambientLight intensity={0.1} />

            {/* Main directional light (sun-like) with shadows */}
            <directionalLight
              position={[10, 10, 5]}
              intensity={1.5}
              castShadow
              shadow-mapSize={[1024, 1024]}
              shadow-camera-far={50}
              shadow-camera-left={-10}
              shadow-camera-right={10}
              shadow-camera-top={10}
              shadow-camera-bottom={-10}
            />

            {/* Additional fill light */}
            <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#b5d6f7" />

            {/* Environment lighting */}
            <Environment preset="city">
              <Lightformer position={[10, 10, 10]} scale={10} intensity={4} color="white" />
            </Environment>

            <Suspense>
              <World isAudioPlay={isVideoPlayed} />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </>
  )
}

export default memo(WorldControl)
