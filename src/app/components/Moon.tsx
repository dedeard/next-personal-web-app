import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

export const Moon = () => {
  const moonRef = useRef<THREE.Mesh>(null)

  // Slow rotation effect
  useFrame((state) => {
    if (moonRef.current) {
      moonRef.current.rotation.y += 0.001
    }
  })

  return (
    <mesh
      ref={moonRef}
      position={[0, 10, -20]} // Moved moon more into view
      scale={3} // Made moon larger
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#FFFFFF" roughness={1} metalness={0} emissive="#666666" emissiveIntensity={0.2} />
    </mesh>
  )
}
