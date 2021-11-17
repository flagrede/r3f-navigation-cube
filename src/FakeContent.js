import { useEffect, useState } from 'react'
import Placeholder from 'react-placeholder'
import { tw } from 'twind'
import { LoremIpsum } from 'react-lorem-ipsum'
import { useSnapshot } from 'valtio'
import { state } from './App'
import { textFaceMapping } from './config'
import { css } from 'twind/css'

const FakeContent = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { mainCube } = useSnapshot(state)
  const mainActiveFaceIndex = mainCube.activeFaceIndex

  useEffect(() => {
    setIsLoading(true)
    const isLoadingTimeout = setTimeout(() => setIsLoading(false), 500)

    return () => clearInterval(isLoadingTimeout)
  }, [mainActiveFaceIndex])

  return (
    <div
      className={tw(
        `absolute flex justify-center w-full bottom-0 px-6 md:x-20 py-6`,
        css`
          top: 75%;
        `
      )}>
      <div className={tw(`w-full lg:w-5/12`)}>
        {isLoading ? (
          <Placeholder ready={false} type="text" rows={4} color="#d0d0d0" className={tw`animate-pulse `} />
        ) : (
          <div className={tw`text-md tracking-wide antialiased`} style={{ color: textFaceMapping[mainActiveFaceIndex].colors.paragraph }}>
            <LoremIpsum avgWordsPerSentence={6} />
          </div>
        )}
      </div>
    </div>
  )
}

export default FakeContent
