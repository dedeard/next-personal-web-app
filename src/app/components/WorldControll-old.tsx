'use client'

import { Canvas } from '@react-three/fiber'
import { Leva, useControls } from 'leva'
import { Suspense } from 'react'
import { World } from './World'

const WorldControlOld: React.FC = () => {
  const { positionX, positionY, positionZ, rotationX, rotationY, rotationZ } = useControls('World', {
    positionX: {
      value: 6,
    },
    positionY: {
      value: -9,
    },
    positionZ: {
      value: -25,
    },
    rotationX: {
      value: 0,
      min: 0,
      max: Math.PI * 2,
    },
    rotationY: {
      value: 2.4,
      min: 0,
      max: Math.PI * 2,
    },
    rotationZ: {
      value: 0,
      min: 0,
      max: Math.PI * 2,
    },
  })

  return (
    <>
      <Leva />
      <div className="fixed inset-0 h-screen w-screen">
        <Canvas className="touch-none">
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Suspense fallback={null}>
            <World position={[positionX, positionY, positionZ]} rotation={[rotationX, rotationY, rotationZ]} />
          </Suspense>
        </Canvas>
      </div>
    </>
  )
}

export default WorldControlOld
