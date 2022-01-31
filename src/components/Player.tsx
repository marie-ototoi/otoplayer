import React, { FC, useEffect, useRef, useState } from 'react'
import styles from './Player.module.css'
import Cover from './Cover'
import PlayButton from './PlayButton'
import Track from './Track'
import { initTracks } from '../utils/tracks'
import usePlayer from '../hooks/usePlayer'
import type { Coords } from '../types/player'
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
  const [coords, setCoords] = useState<Coords>()
  const playerRef = useRef<HTMLDivElement>(null)
  // @ts-ignore
  const {
    currentTrack,
    hoveredTrack,
    selectedTrack,
    isPlaying,
    playTrack,
    hoverTrack,
    selectTrack,
  } = usePlayer(0, tracks.length)

  useEffect(() => {
    setTracksData(initTracks(tracks))
  }, [tracks])

  useEffect(() => {
    if (playerRef.current) {
      const box = playerRef.current.getBoundingClientRect()
      setCoords({
        side: playerRef.current.clientWidth,
        x: box.x,
        y: box.y,
      })
    }
    function updateSize() {
      if (playerRef.current) {
        const box = playerRef.current.getBoundingClientRect()
        setCoords({
          side: playerRef.current.clientWidth,
          x: box.x,
          y: box.y,
        })
      }
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
      {coords && (
        <svg
          data-testid="player"
          xmlns="http://www.w3.org/2000/svg"
          width={coords.side}
          height={coords.side + 100}
          focusable="false"
        >
          {cover && <Cover side={coords.side} cover={cover} />}
          <PlayButton
            currentTrack={currentTrack}
            fillColor={fillColor ?? backgroundColor}
            isPlaying={isPlaying}
            playButtonRadius={playButtonRadius}
            setTrack={playTrack}
            side={coords.side}
          />
          {tracksData.map((track, index) => (
            <Track
              currentTrack={currentTrack}
              fillColor={fillColor ?? backgroundColor}
              hoverTrack={hoverTrack}
              hoveredTrack={hoveredTrack}
              isPlaying={isPlaying}
              key={`svg-track-${index}`}
              playButtonRadius={playButtonRadius}
              setTrack={playTrack}
              selectedTrack={selectedTrack}
              selectTrack={selectTrack}
              coords={coords}
              textColor={textColor}
              total={tracksData[tracksData.length - 1].end}
              track={track}
              tracksLength={tracks.length}
            />
          ))}
        </svg>
      )}
    </div>
  )
}

export default Player
