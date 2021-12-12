import React, { FC } from 'react'

interface Props {
  cover: string
  side: number
}
const Cover: FC<Props> = ({ cover, side }) => {
  return (
    <>
      <mask id="mask">
        <circle r={side / 2} cx={side / 2} cy={side / 2} fill="white" />
      </mask>
      <image href={cover} x="0" y="0" height={side} width={side} mask="url(#mask)" />
    </>
  )
}

export default Cover
