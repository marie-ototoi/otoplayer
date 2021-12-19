import React, { FC, useEffect, useState } from 'react'
import styles from './PlayButton.module.css'

interface Props {
  fillColor: string
  isPlaying: boolean
  playButtonRadius: number
  setTrack: (index?: number, play?: boolean) => void
  side: number
}
const Cover: FC<Props> = ({ fillColor, isPlaying, playButtonRadius, setTrack, side }) => {
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
        <circle className={styles.PlayButton__background} r={playButtonRadius} fill={fillColor} />
        {isPlaying ? (
          <>
            <rect
              className={styles.PlayButton__pause}
              fill={fillColor}
              height={playButtonRadius}
              rx={playButtonRadius / 12}
              width={playButtonRadius / 3}
              x={-playButtonRadius / 3 - playButtonRadius / 8}
              y={(-1 * playButtonRadius) / 2}
            />
            <rect
              className={styles.PlayButton__pause}
              fill={fillColor}
              height={playButtonRadius}
              rx={playButtonRadius / 12}
              width={playButtonRadius / 3}
              x={playButtonRadius / 3 - playButtonRadius / 4}
              y={(-1 * playButtonRadius) / 2}
            />
          </>
        ) : (
          <polygon
            className={styles.PlayButton__play}
            fill={fillColor}
            points={playButton}
            stroke={fillColor}
            strokeWidth={playButtonRadius / 8}
          />
        )}
        <circle className={styles.PlayButton__radius} r={playButtonRadius} stroke={fillColor} />
      </g>
    </a>
  )
}

export default Cover
