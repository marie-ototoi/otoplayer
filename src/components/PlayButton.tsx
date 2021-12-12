import React, { FC, useState } from 'react'
import styles from './PlayButton.module.css'

interface Props {
  isPlaying: boolean
  playButtonRadius: number
  setTrack: (index?: number, play?: boolean) => void
  side: number
}
const Cover: FC<Props> = ({ isPlaying, playButtonRadius, setTrack, side }) => {
  const [playButton] = useState(
    `${-1 * (playButtonRadius / 4)},${-1 * (playButtonRadius / 2)} ${
      (2 * playButtonRadius) / 4
    },${0} ${-1 * (playButtonRadius / 4)},${playButtonRadius / 2}`
  )
  return (
    <button
      className={styles.PlayButton}
      style={{
        left: side / 2 - playButtonRadius / 1.5 + 'px',
        top: side / 2 - playButtonRadius / 1.5 + 'px',
      }}
      onClick={() => setTrack(undefined, !isPlaying)}
    >
      <svg
        data-testid="button"
        xmlns="http://www.w3.org/2000/svg"
        width={playButtonRadius * 2}
        height={playButtonRadius * 2}
        focusable="true"
      >
        <g transform={`translate(${playButtonRadius},${playButtonRadius})`}>
          <circle
            r={playButtonRadius}
            fill="#ffffff"
            stroke="#ffffff"
            strokeOpacity={0.5}
            className={styles.PlayButton__background}
          />
          {isPlaying ? (
            <>
              <rect
                fill="#ffffff"
                x={-playButtonRadius / 3 - 3}
                rx={2}
                width={8}
                y={(-1 * playButtonRadius) / 2}
                height={playButtonRadius}
              />
              <rect
                fill="#ffffff"
                x={playButtonRadius / 3 - 6}
                rx={2}
                width={8}
                y={(-1 * playButtonRadius) / 2}
                height={playButtonRadius}
              />
            </>
          ) : (
            <polygon
              points={playButton}
              fill="#ffffff"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinejoin="round"
            />
          )}
          <circle r={playButtonRadius} fill="transparent" stroke="#ffffff" strokeOpacity={0.5} />
        </g>
      </svg>
    </button>
  )
}

export default Cover
