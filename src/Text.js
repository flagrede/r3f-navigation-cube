import { a } from '@react-spring/web'
import React from 'react'
import { css, tw } from 'twind/css'

const Text = ({ text, opacity, background }) => {
  return (
    <a.div
      className={tw(
        'absolute',
        css`
          transform: translate3d(-50%, 0, 0);
          top: 50px;
        `
      )}
      style={{ opacity }}>
      <a.div
        className={
          (tw('relative w-full overflow-hidden leading-tight select-none'),
          css`
            will-change: transform;
          `)
        }
        style={{ transform: opacity.to((t) => `translate3d(0,${(1 - t) * (1 * 40)}px,0)`) }}>
        <div>{text}</div>
        <a.div
          className={tw(
            'absolute top-0 left-0',
            css`
              will-change: background, transform;
              width: 120%;
              height: 120%;
            `
          )}
          style={{ background, transform: opacity.to((t) => `translate3d(0,${t * 100}%,0) rotateZ(-10deg)`) }}
        />
      </a.div>
    </a.div>
  )
}

export default Text
