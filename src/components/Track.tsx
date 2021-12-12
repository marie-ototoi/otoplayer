import React, { FC, useEffect } from 'react'
import useTrack from '../hooks/useTrack'
import styles from './Track.module.css'
import type { TrackData } from '../types/tracks'

interface Props {
  currentTrack: number
  isPlaying: boolean
  tracksLength: number
  setTrack: (index: number, play: boolean) => void
  nextTrack: () => void
  playButtonRadius: number
  side: number
  total: number
  track: TrackData
}
const Track: FC<Props> = ({
  currentTrack,
  isPlaying,
  tracksLength,
  nextTrack,
  playButtonRadius,
  setTrack,
  side,
  total,
  track,
}) => {
  const { index, start, end, duration, position, url } = track
  const [progress, trackIsPlaying, play, pause] = useTrack(position, url, nextTrack)

  useEffect(() => {
    if (isPlaying && index === currentTrack) {
      play()
    } else {
      pause()
    }
  }, [currentTrack, index, isPlaying, play, pause])

  const offset = side / 2
  const radius = {
    start: playButtonRadius + (start * (side / 2 - playButtonRadius)) / total,
    end: playButtonRadius + (end * (side / 2 - playButtonRadius)) / total,
    middle:
      playButtonRadius + ((start + (end - start) / 2) * (side / 2 - playButtonRadius)) / total,
  }

  const circumference = Math.PI * radius.middle * 2
  const rotation = (index * 360) / tracksLength

  const strokeOffset = circumference - (progress * circumference) / duration
  return (
    <a
      href="#otoplayer"
      onClick={e => {
        setTrack(index, !trackIsPlaying)
        e.preventDefault()
      }}
      className={styles.Track}
    >
      <g transform={`rotate(${rotation}, ${offset}, ${offset})`}>
        <circle
          r={radius.end}
          className={styles.Track__limit}
          cx={offset}
          cy={offset}
          strokeOpacity={0.5}
        />
        <circle
          r={radius.middle}
          strokeWidth={radius.end - radius.start}
          strokeDasharray={circumference}
          strokeDashoffset={strokeOffset}
          className={styles.Track__played}
          cx={offset}
          cy={offset}
        />
        <circle
          r={radius.middle}
          strokeWidth={radius.end - radius.start}
          strokeDasharray={circumference}
          strokeDashoffset={0}
          className={styles.Track__transparent}
          cx={offset}
          cy={offset}
        />
      </g>
    </a>
  )
}

export default Track
