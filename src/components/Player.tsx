import React, { FC, useEffect, useState } from 'react'
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
  side?: number
  textColor?: string
  tracks: TrackDataInput[]
}

const Player: FC<PlayerProps> = ({
  backgroundColor = '#fff',
  cover,
  fillColor,
  playButtonRadius = 25,
  side = 400,
  textColor = '#333',
  tracks,
}) => {
  const [tracksData, setTracksData] = useState<TrackData[]>(initTracks(tracks))
  // @ts-ignore
  const [currentTrack, hoveredTrack, isPlaying, setTrack, nextTrack, previousTrack, hoverTrack] =
    usePlayer(0, tracks.length)

  useEffect(() => {
    setTracksData(initTracks(tracks))
  }, [tracks])

  return (
    <div
      className={styles.Player}
      style={{
        width: side + 'px',
        backgroundColor,
      }}
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
