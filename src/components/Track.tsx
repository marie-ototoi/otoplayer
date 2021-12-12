import React, { FC, useEffect, useMemo } from 'react'
import useTrack from '../hooks/useTrack'
import { getRingPath } from '../utils/tracks'
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
  const radius = useMemo(() => {
    return {
      start: playButtonRadius + (start * (side / 2 - playButtonRadius)) / total,
      end: playButtonRadius + (end * (side / 2 - playButtonRadius)) / total,
      middle:
        playButtonRadius + ((start + (end - start) / 2) * (side / 2 - playButtonRadius)) / total,
    }
  }, [playButtonRadius, end, start, total, side])
  const middlePath = useMemo(() => getRingPath(radius.middle, side), [radius, side])
  const endPath = useMemo(() => getRingPath(radius.end, side), [radius, side])

  const circumference = Math.PI * radius.middle * 2
  const rotation = (index * 360) / tracksLength

  const strokeOffset = circumference - (progress * circumference) / duration
  return (
    <>
      <a
        href="#otoplayer"
        onClick={e => {
          setTrack(index, !trackIsPlaying)
          e.preventDefault()
        }}
        className={styles.Track}
      >
        <g transform={`rotate(${rotation}, ${offset}, ${offset})`}>
          <path d={endPath} className={styles.Track__limit} strokeOpacity={0.5} />
          <path
            d={middlePath}
            className={styles.Track__played}
            strokeWidth={radius.end - radius.start}
            strokeDasharray={circumference}
            strokeDashoffset={strokeOffset}
          />
          <path
            d={middlePath}
            className={styles.Track__transparent}
            strokeWidth={radius.end - radius.start}
            strokeDasharray={circumference}
            strokeDashoffset={0}
          />
        </g>
      </a>
      <foreignObject x={0} y={side} width={side} height={100}>
        <h2>Track Name</h2>
      </foreignObject>
    </>
  )
}

export default Track
