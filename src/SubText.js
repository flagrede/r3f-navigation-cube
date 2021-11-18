import { tw } from 'twind'
import { css } from 'twind/css'
import { textFaceMapping } from './config'

const SubText = ({ mainActiveFaceIndex, subActiveFaceIndex, isSubmenu }) => {
  return isSubmenu ? (
    <h2
      className={tw(
        'absolute tracking-tight',
        css`
          top: 120px;
          @screen md {
            top: 160px;
          }
        `
      )}
      style={{ color: textFaceMapping[mainActiveFaceIndex].colors.paragraph }}>
      {`${textFaceMapping[mainActiveFaceIndex]?.text} ${`> ${textFaceMapping[mainActiveFaceIndex].subItems[subActiveFaceIndex].text}`}`}
    </h2>
  ) : null
}

export default SubText
