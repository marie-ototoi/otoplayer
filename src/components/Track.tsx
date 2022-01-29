import React, { FC, MouseEvent, useEffect, useMemo, useState } from 'react'
import useTrack from '../hooks/useTrack'
import { formatDuration, formatOrdinal, getAngle, getRingPath, throttle } from '../utils/tracks'
import styles from './Track.module.css'
import type { Coords } from '../types/player'
import type { TrackData } from '../types/tracks'

interface Props {
  currentTrack: number
  fillColor: string
  hoverTrack: (index: number | null) => void
  hoveredTrack: number | null
  selectTrack: (index: number | null) => void
  selectedTrack: number | null
  isPlaying: boolean
  nextTrack: () => void
  playButtonRadius: number
  setTrack: (index: number, play: boolean) => void
  coords: Coords
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
  selectTrack,
  selectedTrack,
  setTrack,
  coords,
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
  const [timeMouseDown, setTimeMouseDown] = useState<number | null>(null)
  const offset = coords.side / 2
  const radius = useMemo(() => {
    return {
      start: playButtonRadius + (start * (offset - playButtonRadius)) / total,
      end: playButtonRadius + (end * (offset - playButtonRadius)) / total,
      middle:
        playButtonRadius + ((start + (end - start) / 2) * (offset - playButtonRadius)) / total,
    }
  }, [playButtonRadius, end, start, total, offset])
  const startPath = useMemo(() => getRingPath(radius.start), [radius])
  const middlePath = useMemo(() => getRingPath(radius.middle), [radius])
  const endPath = useMemo(() => getRingPath(radius.end), [radius])
  const circumference = useMemo(() => Math.PI * radius.middle * 2, [radius.middle])
  const rotation = useMemo(() => (index * 360) / tracksLength, [index, tracksLength])
  // console.log(rotation, index)
  const playedOffset = useMemo(
    () => circumference - (progress * circumference) / duration,
    [progress, circumference, duration]
  )
  const formattedDuration = useMemo(() => formatDuration(duration), [duration])
  const [draggedPosition, setDraggedPosition] = useState<number>(position)

  const handleDragTrack = (e: MouseEvent) => {
    if (selectedTrack === index)
      setDraggedPosition(
        (getAngle(
          { x: e.clientX - coords.x, y: e.clientY - coords.y },
          { x: offset, y: offset },
          rotation
        ) *
          duration) /
          360
      )
  }
  const draggedOffset = useMemo(
    () => circumference - (draggedPosition * circumference) / duration,
    [draggedPosition, circumference, duration]
  )
  const isDragging = timeMouseDown && new Date().getTime() - timeMouseDown > 300

  return (
    <>
      <a
        href="#otoplayer"
        onMouseUp={e => {
          if (selectedTrack === index) {
            if (Math.abs(draggedPosition - position) > 1) {
              play(draggedPosition)
              setTrack(index, true)
            } else {
              setTrack(index, !trackIsPlaying)
            }
            setTimeMouseDown(null)
          } else {
            selectTrack(null)
          }
          e.preventDefault()
        }}
        onMouseDown={e => {
          selectTrack(index)
          setDraggedPosition(position)
          setTimeMouseDown(new Date().getTime())
          e.preventDefault()
        }}
        onMouseMove={throttle(handleDragTrack, 100)}
        onFocus={() => {
          hoverTrack(index)
        }}
        onBlur={() => {
          hoverTrack(null)
        }}
        className={styles.Track}
        title={`${trackIsPlaying ? 'Pause' : 'Play'} ${formatOrdinal(index + 1)} track: ${title}`}
        role="button"
      >
        <g transform={`translate(${offset}, ${offset}) rotate(${rotation})  `}>
          <path
            d={middlePath}
            className={styles.Track__played}
            stroke={fillColor}
            strokeWidth={radius.end - radius.start}
            strokeDasharray={circumference}
            strokeDashoffset={playedOffset}
            strokeOpacity={isDragging && selectedTrack === index ? 0.5 : 0.95}
          />
          <path
            d={middlePath}
            className={styles.Track__dragged}
            stroke={fillColor}
            strokeWidth={radius.end - radius.start}
            strokeDasharray={circumference}
            strokeDashoffset={isDragging && selectedTrack === index ? draggedOffset : playedOffset}
            strokeOpacity={0.5}
          />
          <path
            d={middlePath}
            className={styles.Track__transparent}
            stroke={fillColor}
            strokeWidth={radius.end - radius.start}
            strokeDasharray={circumference}
            strokeDashoffset={0}
          />
          <path
            d={endPath}
            className={styles.Track__limit}
            stroke={fillColor}
            strokeOpacity={0.2}
          />
          <path
            d={startPath}
            className={styles.Track__limit}
            stroke={fillColor}
            strokeOpacity={0}
          />
        </g>
      </a>
      {(hoveredTrack === index || (hoveredTrack === null && currentTrack === index)) && (
        <foreignObject x={0} y={coords.side} width={coords.side} height={100}>
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
              <time title="time elapsed">
                {isDragging && selectedTrack === index
                  ? formatDuration(draggedPosition)
                  : formatDuration(progress)}
              </time>
              /<time title="total time">{formattedDuration}</time>
            </p>
          </div>
        </foreignObject>
      )}
    </>
  )
}

export default Track
