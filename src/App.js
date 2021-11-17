import { useSpring, useTransition } from '@react-spring/core'
import { a as a3 } from '@react-spring/three'
import { a } from '@react-spring/web'
import { ContactShadows, Environment } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import React, { Suspense, useEffect, useRef } from 'react'
import { tw } from 'twind'
import useSound from 'use-sound'
import { proxy, useSnapshot } from 'valtio'
import clickSfx from './sounds/clickSfx.wav'
import navigationSfx from './sounds/navigationSfx.wav'
import { textFaceMapping } from './config'
import CubeButton from './CubeButton'
import FakeContent from './FakeContent'
import SubText from './SubText'
import { swapOnX, swapOnY } from './swapUtils'
import Text from './Text'
import Float from './Float'

export const state = proxy({
  mainCube: { swapY: 0, swapX: 0, swapZ: 0, activeFaceIndex: 0, rotationAxis: [0, 0, 0], parentCubeFaceIndex: null },
  subCube: { swapY: 0, swapX: 0, swapZ: 0, activeFaceIndex: 0, rotationAxis: [0, 0, 0], parentCubeFaceIndex: null },
  isSubMenu: false,
  navigationSound: () => null,
  clickSound: () => null
})

const App = () => {
  const { subCube, mainCube, isSubMenu } = useSnapshot(state)
  const mainActiveFaceIndex = mainCube.activeFaceIndex
  const subActiveFaceIndex = subCube.activeFaceIndex
  const SelectedModel = textFaceMapping[mainActiveFaceIndex].model
  const canvasContainerRef = useRef()
  const [navigationSound] = useSound(navigationSfx)
  const [clickSound] = useSound(clickSfx)
  const groupRef = useRef()

  // Animated text color
  const textColorSpring = useSpring({
    background: textFaceMapping[mainActiveFaceIndex]?.colors.background,
    color: textFaceMapping[mainActiveFaceIndex]?.colors.headline
  })
  // Animated text transition
  const transitionText = useTransition(mainActiveFaceIndex, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { friction: 60 }
  })

  // Animated main cube
  const cubeSpring = useSpring({
    position: isSubMenu ? [0, 0, -6] : [0, 0, 0]
  })

  // Animated sub menu cube
  const transitionSubMenuCube = useTransition(isSubMenu, {
    from: { position: [0, 6, 0] },
    enter: { position: [0, 0, 0] },
    leave: { position: [0, 6, 0] }
  })

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      swapOnY({ direction: -1 })
    } else if (event.key === 'ArrowRight') {
      swapOnY({ direction: +1 })
    } else if (event.key === 'ArrowUp') {
      swapOnX({ direction: -1 })
    } else if (event.key === 'ArrowDown') {
      swapOnX({ direction: +1 })
    }
  }

  useEffect(() => {
    state.navigationSound = navigationSound
    state.clickSound = clickSound
  }, [navigationSound, clickSound])

  useEffect(() => {
    canvasContainerRef.current.focus()
  }, [])

  useEffect(() => {
    if (isSubMenu) {
      state.subCube.parentCubeFaceIndex = mainCube.activeFaceIndex
    } else {
      state.subCube.swapX = 0
      state.subCube.swapY = 0
    }
  }, [isSubMenu, mainCube])

  return (
    <>
      <a.div
        className={tw`pointer-events-none fixed top-0 left-0 w-full h-full flex justify-center items-center text-center`}
        style={{ ...textColorSpring }}>
        <h1 className={tw`whitespace-pre text-6xl md:text-8xl font-bold tracking-tight`}>
          {transitionText((style, location) => (
            <Text
              open={true}
              t={style.t}
              opacity={style.opacity}
              background={textColorSpring.background}
              text={textFaceMapping[mainActiveFaceIndex]?.text}
            />
          ))}
        </h1>
        <SubText mainActiveFaceIndex={mainActiveFaceIndex} subActiveFaceIndex={subActiveFaceIndex} isSubmenu={isSubMenu} />
      </a.div>
      <div className={tw`w-full h-full`} ref={canvasContainerRef} onKeyDown={handleKeyDown} style={{ touchAction: 'none' }} tabIndex="-10">
        <Canvas camera={{ position: [0, 0, 7] }}>
          <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
          <ambientLight intensity={0.8} />
          <a3.group {...cubeSpring}>
            <CubeButton cubeState={mainCube} />
          </a3.group>
          {transitionSubMenuCube(
            (style, isActive) =>
              isActive && (
                <a3.group {...style}>
                  <CubeButton cubeState={subCube} />
                </a3.group>
              )
          )}
          <ContactShadows rotation-x={Math.PI / 2} position={[0, -2, 0]} opacity={0.4} width={30} height={30} blur={1} far={15} />
          <Suspense fallback="loading...">
            <group ref={groupRef}>
              <SelectedModel position={[-3, -2, 0]} rotation={[0, 0, 0]} scale={3} />
              <Environment preset="city" />
              <Float groupRef={groupRef} />
            </group>
          </Suspense>
        </Canvas>
      </div>
      <FakeContent />
    </>
  )
}

export default App
