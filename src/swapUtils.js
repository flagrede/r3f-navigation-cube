import { state } from './App'

export const swapOnY = ({ direction }) => {
  if (state.isSubMenu) {
    state.subCube.swapY += direction
    state.subCube.rotationAxis = [0, direction, 0]
  } else {
    state.mainCube.swapY += direction
    state.mainCube.rotationAxis = [0, direction, 0]
  }
}

export const swapOnX = ({ direction }) => {
  if (state.isSubMenu) {
    state.subCube.swapX += direction
    state.subCube.rotationAxis = [direction, 0, 0]
  } else {
    state.mainCube.swapX += direction
    state.mainCube.rotationAxis = [direction, 0, 0]
  }
}
