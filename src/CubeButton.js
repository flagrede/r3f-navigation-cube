import { A11y } from '@react-three/a11y'
import { useRef } from 'react'
import { state } from './App'
import Cube from './Cube'

const CubeButton = ({ cubeState }) => {
  const isFaceChangingRef = useRef(false)
  return (
    <A11y
      role="button"
      a11yElStyle={{ pointerEvents: 'none' }}
      actionCall={() => {
        if (!isFaceChangingRef.current) {
          state.isSubMenu = !state.isSubMenu
          state.clickSound()
        }
      }}>
      <Cube cubeState={cubeState} isFaceChangingRef={isFaceChangingRef} />
    </A11y>
  )
}

export default CubeButton
