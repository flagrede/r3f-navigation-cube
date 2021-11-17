import { useMemo } from 'react'
import { textFaceMapping } from './config'
import { getTextCanvas } from './utils'

const CanvasTextTexture = ({ faceIndex, parentCubeFaceIndex }) => {
  const isSubNavigation = parentCubeFaceIndex !== null
  const textCanvas = useMemo(
    () =>
      getTextCanvas({
        text: isSubNavigation ? textFaceMapping[parentCubeFaceIndex].subItems[faceIndex].text : textFaceMapping[faceIndex].text,
        color: isSubNavigation ? textFaceMapping[parentCubeFaceIndex].colors.buttonText : textFaceMapping[faceIndex].colors.buttonText,
        backgroundColor: isSubNavigation ? textFaceMapping[parentCubeFaceIndex].colors.button : textFaceMapping[faceIndex].colors.button
      }),
    [faceIndex, parentCubeFaceIndex, isSubNavigation]
  )

  return <canvasTexture attach="map" image={textCanvas} />
}

export default CanvasTextTexture
