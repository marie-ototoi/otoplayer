import React, { FC, useEffect, useState } from 'react'
import styles from './PlayButton.module.css'

interface Props {
  isPlaying: boolean
  playButtonRadius: number
  setTrack: (index?: number, play?: boolean) => void
  side: number
}
const Cover: FC<Props> = ({ isPlaying, playButtonRadius, setTrack, side }) => {
  const [playButton, setPlayButton] = useState(``)
  useEffect(() => {
    setPlayButton(
      `${-1 * (playButtonRadius / 4)},${-1 * (playButtonRadius / 2)} ${
        (2 * playButtonRadius) / 4
      },${0} ${-1 * (playButtonRadius / 4)},${playButtonRadius / 2}`
    )
  }, [playButtonRadius])
  return (
    <a
      href="#otoplayer"
      onClick={() => setTrack(undefined, !isPlaying)}
      className={styles.PlayButton}
      title={`${isPlaying ? 'Pause' : 'Play'} current track`}
      role="button"
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
              x={-playButtonRadius / 3 - playButtonRadius / 8}
              rx={playButtonRadius / 12}
              width={playButtonRadius / 3}
              y={(-1 * playButtonRadius) / 2}
              height={playButtonRadius}
            />
            <rect
              fill="#ffffff"
              x={playButtonRadius / 3 - playButtonRadius / 4}
              rx={playButtonRadius / 12}
              width={playButtonRadius / 3}
              y={(-1 * playButtonRadius) / 2}
              height={playButtonRadius}
            />
          </>
        ) : (
          <polygon
            points={playButton}
            fill="#ffffff"
            stroke="#ffffff"
            strokeWidth={playButtonRadius / 8}
            strokeLinejoin="round"
          />
        )}
        <circle r={playButtonRadius} fill="transparent" stroke="#ffffff" strokeOpacity={0.5} />
      </g>
    </a>
  )
}

export default Cover
