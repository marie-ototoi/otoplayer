import React, { FC, useEffect, useRef, useState } from 'react'
import styles from './Player.module.css'
import Cover from './Cover'
import PlayButton from './PlayButton'
import Track from './Track'
import { initTracks } from '../utils/tracks'
import usePlayer from '../hooks/usePlayer'
import type { TrackDataInput, TrackData } from '../types/tracks'
export interface PlayerProps {
  backgroundColor?: string
  cover?: string
  fillColor?: string
  playButtonRadius?: number
  textColor?: string
  tracks: TrackDataInput[]
}

const Player: FC<PlayerProps> = ({
  backgroundColor = '#fff',
  cover,
  fillColor,
  playButtonRadius = 25,
  textColor = '#333',
  tracks,
}) => {
  const [tracksData, setTracksData] = useState<TrackData[]>(initTracks(tracks))
  const [side, setSide] = useState<number>(1)
  const playerRef = useRef<HTMLDivElement>(null)
  // @ts-ignore
  const [currentTrack, hoveredTrack, isPlaying, setTrack, nextTrack, previousTrack, hoverTrack] =
    usePlayer(0, tracks.length)

  useEffect(() => {
    setTracksData(initTracks(tracks))
  }, [tracks])

  useEffect(() => {
    if (playerRef.current) setSide(playerRef.current.clientWidth)
  }, [playerRef])

  useEffect(() => {
    function updateSize() {
      if (playerRef.current) setSide(playerRef.current.clientWidth)
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [playerRef])

  return (
    <div
      className={styles.Player}
      style={{
        backgroundColor,
      }}
      ref={playerRef}
    >
      <svg
        data-testid="player"
        xmlns="http://www.w3.org/2000/svg"
        width={side}
        height={side + 100}
        focusable="false"
      >
        {cover && <Cover side={side} cover={cover} />}
        <PlayButton
          currentTrack={currentTrack}
          fillColor={fillColor ?? backgroundColor}
          isPlaying={isPlaying}
          playButtonRadius={playButtonRadius}
          setTrack={setTrack}
          side={side}
        />
        {tracksData.map((track, index) => (
          <Track
            currentTrack={currentTrack}
            fillColor={fillColor ?? backgroundColor}
            hoverTrack={hoverTrack}
            hoveredTrack={hoveredTrack}
            isPlaying={isPlaying}
            key={`svg-track-${index}`}
            nextTrack={nextTrack}
            playButtonRadius={playButtonRadius}
            setTrack={setTrack}
            side={side}
            textColor={textColor}
            total={tracksData[tracksData.length - 1].end}
            track={track}
            tracksLength={tracks.length}
          />
        ))}
      </svg>
    </div>
  )
}

export default Player
