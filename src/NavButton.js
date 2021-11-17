import { A11y } from '@react-three/a11y'
import { useThree } from '@react-three/fiber'
import { state } from './App'
import Diamond from './Diamond'

const NavButton = ({ left }) => {
  const viewport = useThree((state) => state.viewport)
  const radius = Math.min(12, viewport.width / 2.5)

  return (
    <A11y
      role="button"
      description={`Spin ${left ? 'left' : 'right'}`}
      actionCall={() => {
        if (left) {
          state.activeFace -= 1
        } else {
          state.activeFace += 1
        }
      }}>
      <Diamond position={[left ? -radius : radius, 0, 0]} rotation={[0, 0, -Math.PI / 4]} scale={[1, 1, 1]}>
        <meshBasicMaterial color="aqua" />
      </Diamond>
    </A11y>
  )
}

export default NavButton
