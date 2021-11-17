/* 

const [spring, springApi] = useSpring(() => ({
  rotation: [cubeXRotation, cubeYRotation, cubeZRotation],
  config: { mass: 5, tension: 1000, friction: 50, precision: 0.0001 }
})) 

  useEffect(() => {
    springApi.start({
      rotation: [cubeXRotation, cubeYRotation, cubeZRotation]
    })
  }, [springApi, cubeYRotation, cubeXRotation, cubeZRotation])

  springApi.start({
  rotation: [cubeXRotation, cubeYRotation + mx, cubeZRotation]
})

*/
