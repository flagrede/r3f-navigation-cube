import { useState } from 'react'
import { Vector3 } from 'three'
import { swapOnX, swapOnY } from './swapUtils'

const makePositionVector = (xyz) => new Vector3(...xyz).multiplyScalar(0.38)

export const edges = [
  [1, 0, 1],
  [0, 1, 1],
  [0, -1, 1],
  [-1, 0, 1]
]

export const edgesVector = edges.map(makePositionVector)

export const edgeDimensions = edgesVector.map((edge) => edge.toArray().map((axis) => (axis === 0 ? 0.5 : 0.25)))

const EdgeCube = ({ onClick, dimensions, position, index, hoverColor }) => {
  const [hover, setHover] = useState(false)
  const handlePointerOut = (e) => {
    e.stopPropagation()
    setHover(false)
  }
  const handlePointerOver = (e) => {
    e.stopPropagation()
    setHover(true)
  }
  const handleClick = (e) => {
    const edgeSelected = edges[index]
    if (edgeSelected[0] !== 0) {
      swapOnY({ direction: edgeSelected[0] })
    } else {
      swapOnX({ direction: edgeSelected[1] })
    }
    e.stopPropagation()
  }
  return (
    <mesh
      scale={1.1}
      position={position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={onClick || handleClick}>
      <meshBasicMaterial color={hover ? hoverColor : 'white'} transparent opacity={0.6} visible={hover} />
      <boxGeometry args={dimensions} />
    </mesh>
  )
}

export default EdgeCube
