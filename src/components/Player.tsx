import React, { FC, useEffect, useState } from 'react'
import styles from './Player.module.css'
import Cover from './Cover'
import PlayButton from './PlayButton'
import Track from './Track'
import { initTracks } from '../utils/tracks'
import usePlayer from '../hooks/usePlayer'
import type { TrackDataInput, TrackData } from '../types/tracks'
interface Props {
  background?: string
  cover?: string
  playButtonRadius?: number
  side?: number
  tracks: TrackDataInput[]
}

const Player: FC<Props> = ({
  background = '#ffffff',
  cover,
  playButtonRadius = 25,
  side = 400,
  tracks,
}) => {
  const [tracksData, setTracksData] = useState<TrackData[]>(initTracks(tracks))
  const [currentTrack, isPlaying, setTrack, nextTrack] = usePlayer(0, tracks.length)

  useEffect(() => {
    setTracksData(initTracks(tracks))
  }, [tracks])

  return (
    <div className={styles.Player} style={{ width: side + 'px', background }}>
      <svg
        data-testid="player"
        xmlns="http://www.w3.org/2000/svg"
        width={side}
        height={side}
        role="img"
      >
        {cover && <Cover side={side} cover={cover} />}
        {tracksData.map((track, index) => (
          <Track
            key={`svg-track-${index}`}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            nextTrack={nextTrack}
            playButtonRadius={playButtonRadius}
            setTrack={setTrack}
            side={side}
            total={tracksData[0].end}
            track={track}
          />
        ))}
        <PlayButton
          isPlaying={isPlaying}
          playButtonRadius={playButtonRadius}
          setTrack={setTrack}
          side={side}
        />
      </svg>
      <ul>
        {tracksData.map((track, index) => (
          <li key={`list-track-${index}`}>{index}</li>
        ))}
      </ul>
    </div>
  )
}

export default Player
