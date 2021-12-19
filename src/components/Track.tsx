import React, { FC, useEffect, useMemo } from 'react'
import useTrack from '../hooks/useTrack'
import { formatDuration, getRingPath } from '../utils/tracks'
import styles from './Track.module.css'
import type { TrackData } from '../types/tracks'

interface Props {
  currentTrack: number
  fillColor: string
  hoverTrack: (index: number | null) => void
  hoveredTrack: number | null
  isPlaying: boolean
  nextTrack: () => void
  playButtonRadius: number
  setTrack: (index: number, play: boolean) => void
  side: number
  textColor: string
  total: number
  track: TrackData
  tracksLength: number
}
const Track: FC<Props> = ({
  currentTrack,
  fillColor,
  hoverTrack,
  hoveredTrack,
  isPlaying,
  nextTrack,
  playButtonRadius,
  setTrack,
  side,
  textColor,
  total,
  track,
  tracksLength,
}) => {
  const { index, start, end, duration, position, title, url } = track
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
  const formattedDuration = useMemo(() => formatDuration(duration), [duration])
  return (
    <>
      <a
        href="#otoplayer"
        onClick={e => {
          setTrack(index, !trackIsPlaying)
          e.preventDefault()
        }}
        onFocus={() => {
          hoverTrack(index)
        }}
        onBlur={() => {
          hoverTrack(null)
        }}
        onMouseEnter={() => {
          hoverTrack(index)
        }}
        onMouseLeave={() => {
          hoverTrack(null)
        }}
        className={styles.Track}
        title={`${trackIsPlaying ? 'Pause' : 'Play'} track ${index + 1} ${title}`}
        role="button"
      >
        <g transform={`translate(${offset}, ${offset}) rotate(${rotation})  `}>
          <path
            d={endPath}
            className={styles.Track__limit}
            stroke={fillColor}
            strokeOpacity={0.5}
          />
          <path
            d={middlePath}
            className={styles.Track__played}
            stroke={fillColor}
            strokeWidth={radius.end - radius.start}
            strokeDasharray={circumference}
            strokeDashoffset={strokeOffset}
          />
          <path
            d={middlePath}
            className={styles.Track__transparent}
            stroke={fillColor}
            strokeWidth={radius.end - radius.start}
            strokeDasharray={circumference}
            strokeDashoffset={0}
          />
        </g>
      </a>
      {(hoveredTrack === index || (hoveredTrack === null && currentTrack === index)) && (
        <foreignObject x={0} y={side} width={side} height={100}>
          <div className={styles.Track__infos}>
            <h2
              className={styles.Track__infos__title}
              style={{ color: textColor }}
              title={`Current track: ${index + 1} ${title} Status ${
                trackIsPlaying ? 'Playing' : 'Paused'
              }`}
            >
              {title}
            </h2>
            <p className={styles.Track__infos__time} style={{ color: textColor }}>
              <time title="time elapsed">{formatDuration(progress)}</time>/
              <time title="total time">{formattedDuration}</time>
            </p>
          </div>
        </foreignObject>
      )}
    </>
  )
}

export default Track
