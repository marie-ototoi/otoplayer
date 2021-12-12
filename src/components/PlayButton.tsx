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
    <a
      href="#otoplayer"
      onClick={() => setTrack(undefined, !isPlaying)}
      className={styles.PlayButton}
    >
      <g transform={`translate(${side / 2},${side / 2})`}>
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
    </a>
  )
}

export default Cover
