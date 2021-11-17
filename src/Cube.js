import { a } from '@react-spring/three'
import { useA11y } from '@react-three/a11y'
import { extend, useFrame, useThree } from '@react-three/fiber'
import { useDrag } from '@use-gesture/react'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useSnapshot } from 'valtio'
import { state } from './App'
import CanvasTextTexture from './CanvasTextTexture'
import { textFaceMapping } from './config'
import EdgeCube, { edgeDimensions, edgesVector } from './EdgeCube'
import HullMaterial from './materials/HullMaterial'
import { swapOnX, swapOnY } from './swapUtils'

extend({ HullMaterial })

const HALF_ROTATION = 0.765
const CUBE_Y = 1.2
const LERP_STEP = 0.1

const Cube = ({ cubeState, isFaceChangingRef }) => {
  const { isSubMenu } = useSnapshot(state)
  const { swapY, swapX, rotationAxis, activeFaceIndex, parentCubeFaceIndex } = cubeState
  const { viewport } = useThree()
  const { factor } = viewport

  const [rotationQuaternion] = useState(new THREE.Quaternion(0, 0, 0, 1))
  const [textRotationQuaternion] = useState(new THREE.Quaternion(0, 0, 0, 1))
  const [destQuaternion] = useState(new THREE.Quaternion(0, 0, 0, 1))
  const [offsetQuaternion] = useState(new THREE.Quaternion(0, 0, 0, 1))
  const [rotationAxisVector] = useState(new THREE.Vector3(0, 0, 0))
  const [textRotationAxisVector] = useState(new THREE.Vector3(0, 0, 0))
  const [raycastOriginVector] = useState(new THREE.Vector3(0, 1, 2))
  const [raycastDestinationVector] = useState(new THREE.Vector3(0, 0, -1))
  const [rotationEuler] = useState(new THREE.Euler(0, 0, 0))

  const a11y = useA11y()
  const cubeRef = useRef()
  const hoverCubeRef = useRef()
  const edgeButtonsRef = useRef()
  const raycastRef = useRef(new THREE.Raycaster())
  const hoverColor =
    parentCubeFaceIndex !== null
      ? textFaceMapping[parentCubeFaceIndex]?.colors.secondary
      : textFaceMapping[activeFaceIndex]?.colors.secondary

  useFrame(() => {
    edgeButtonsRef.current.visible = false
    isFaceChangingRef.current = true
    offsetQuaternion.setFromEuler(rotationEuler)
    cubeRef.current.quaternion.premultiply(offsetQuaternion)
    hoverCubeRef.current.quaternion.premultiply(offsetQuaternion)
    cubeRef.current.quaternion.slerp(destQuaternion, LERP_STEP)
    hoverCubeRef.current.quaternion.slerp(destQuaternion, LERP_STEP)

    if (cubeRef.current.quaternion.angleTo(destQuaternion) < 0.1) {
      destQuaternion.copy(textRotationQuaternion)
      isFaceChangingRef.current = false
    }
    if (cubeRef.current.quaternion.angleTo(textRotationQuaternion) < 0.1) {
      edgeButtonsRef.current.visible = true
    }
  })

  useEffect(() => {
    raycastRef.current.set(raycastOriginVector, raycastDestinationVector)
  }, [raycastOriginVector, raycastDestinationVector])

  // Compute quaternion cube rotation (up/down/right/left) and add it to current quaternion
  useEffect(() => {
    rotationQuaternion.setFromAxisAngle(
      rotationAxisVector.fromArray(rotationAxis.map(Math.abs)),
      THREE.MathUtils.degToRad(90 * rotationAxis[0] + 90 * rotationAxis[1])
    )

    destQuaternion.premultiply(rotationQuaternion)
  }, [rotationAxis, rotationAxisVector, destQuaternion, rotationQuaternion])

  // Update new selected face
  // Compute text quaternion if text needs to be rotated
  useEffect(() => {
    const faceIndexUpdate = setTimeout(() => {
      const intersects = raycastRef.current.intersectObject(cubeRef.current)
      if (intersects.length > 0) {
        const newFaceIndex = intersects[0].faceIndex
        const selectedFaceNormal = intersects[0].face.normal
        const [normalX, normalY, normalZ] = selectedFaceNormal
        const backFaceWeight = normalZ === -1 ? 1 : 0
        textRotationQuaternion.setFromAxisAngle(
          textRotationAxisVector.fromArray([Math.abs(normalY), Math.abs(normalX) + backFaceWeight, 0]),
          THREE.MathUtils.degToRad(90 * normalY + 90 * normalX * -1 + 180 * backFaceWeight)
        )
        if (cubeState.parentCubeFaceIndex !== null) {
          state.subCube.activeFaceIndex = newFaceIndex - (newFaceIndex % 2)
        } else {
          state.mainCube.activeFaceIndex = newFaceIndex - (newFaceIndex % 2)
        }
      }
    }, 200)
    return () => clearTimeout(faceIndexUpdate)
  }, [swapY, swapX, textRotationQuaternion, textRotationAxisVector, isSubMenu, cubeState])

  const bind = useDrag(
    ({ active, movement: [mx, my], direction: [xDir, yDir], cancel }) => {
      if (active && Math.abs(mx) > HALF_ROTATION) {
        const newYDirection = xDir < 0 ? -1 : 1
        rotationEuler.set(0, 0, 0)
        swapOnY({ direction: newYDirection })
        cancel()
      } else if (active && Math.abs(my) > HALF_ROTATION) {
        const newXDirection = yDir < 0 ? -1 : 1
        rotationEuler.set(0, 0, 0)
        swapOnX({ direction: newXDirection })
        cancel()
      } else if (active && (Math.abs(mx) < HALF_ROTATION || Math.abs(my) < HALF_ROTATION)) {
        rotationEuler.set(my / 10, mx / 10, 0)
      }
    },
    { transform: ([x, y]) => [x / factor, y / factor], eventOptions: { passive: false } }
  )

  return (
    <group scale={[2, 2, 2]} position={[0, CUBE_Y, 0]}>
      <a.mesh {...bind()} ref={cubeRef} renderOrder={3}>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshBasicMaterial attachArray="material">
          <CanvasTextTexture faceIndex={0} parentCubeFaceIndex={parentCubeFaceIndex} />
        </meshBasicMaterial>
        <meshBasicMaterial attachArray="material">
          <CanvasTextTexture faceIndex={2} parentCubeFaceIndex={parentCubeFaceIndex} />
        </meshBasicMaterial>
        <meshBasicMaterial attachArray="material">
          <CanvasTextTexture faceIndex={4} parentCubeFaceIndex={parentCubeFaceIndex} />
        </meshBasicMaterial>
        <meshBasicMaterial attachArray="material">
          <CanvasTextTexture faceIndex={6} parentCubeFaceIndex={parentCubeFaceIndex} />
        </meshBasicMaterial>
        <meshBasicMaterial attachArray="material">
          <CanvasTextTexture faceIndex={8} parentCubeFaceIndex={parentCubeFaceIndex} />
        </meshBasicMaterial>
        <meshBasicMaterial attachArray="material">
          <CanvasTextTexture faceIndex={10} parentCubeFaceIndex={parentCubeFaceIndex} />
        </meshBasicMaterial>
      </a.mesh>

      <a.group ref={edgeButtonsRef} renderOrder={1}>
        {edgesVector.map((edge, index) => (
          <EdgeCube key={index} index={index} position={edge} dimensions={edgeDimensions[index]} hoverColor={hoverColor} />
        ))}
      </a.group>

      <a.mesh ref={hoverCubeRef} renderOrder={2} visible={a11y.focus}>
        <boxBufferGeometry args={[1, 1, 1]} />
        <hullMaterial depthWrite={false} color={hoverColor} side={THREE.BackSide} transmission={1} roughness={0.4} />
      </a.mesh>
    </group>
  )
}

export default Cube
