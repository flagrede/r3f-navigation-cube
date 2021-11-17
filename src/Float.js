import { useFrame } from '@react-three/fiber'

const Float = ({ groupRef }) => {
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    groupRef.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20
    groupRef.current.rotation.x = Math.cos(t / 4) / 8
    groupRef.current.rotation.y = Math.sin(t / 4) / 8
    groupRef.current.position.y = Math.sin(t / 1.5) / 10
  })

  return null
}

export default Float
