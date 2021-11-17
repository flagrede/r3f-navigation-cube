import { state } from './App'

export const rotateNegativeX = ({ activeFace }) => {
  if (activeFace - 1 < 0) {
    state.activeFace = 5
  } else {
    state.activeFace--
  }
}

export const rotatePositiveX = ({ activeFace }) => {
  state.activeFace = (activeFace + 1) % 6
}

export const getTextCanvas = ({ text, color, backgroundColor }) => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  const width = 100
  const height = 100
  canvas.style.position = 'absolute'
  canvas.style.top = 'calc(50% - 20px)'
  canvas.style.width = width + 'px'
  canvas.style.height = height + 'px'
  canvas.width = width * 20
  canvas.height = height * 20
  context.scale(20, 20)
  context.fillStyle = backgroundColor
  context.fillRect(0, 0, width, height)
  const fontSize = 12

  context.font = `bold ${fontSize}px system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'`
  context.fillStyle = color
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  const x = width / 2
  const y = height / 2
  context.fillText(text, x, y)
  return canvas
}
