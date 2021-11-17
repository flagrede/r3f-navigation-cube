import { useA11y } from '@react-three/a11y'

const Diamond = ({ position, rotation }) => {
  const a11y = useA11y()
  return (
    <mesh position={position} rotation={rotation}>
      <tetrahedronBufferGeometry />
      <meshStandardMaterial
        metalness={1}
        roughness={0.8}
        color={a11y.focus || a11y.hover ? '#cc66dd' : '#ffffff'}
        emissive={a11y.focus ? '#cc4444' : a11y.hover ? '#339922' : '#003399'}
      />
    </mesh>
  )
}

export default Diamond
