import React, { FC } from 'react'
import styles from './PlayList.module.css'
import type { TrackData } from '../types/tracks'
interface Props {
  currentTrack: number
  tracks: TrackData[]
}
const PlayList: FC<Props> = ({ currentTrack, tracks }) => {
  return (
    <ul>
      {tracks.map((track, index) => {
        const { title } = track
        return (
          <li
            key={`list-track-${index}`}
            className={`${styles.PlayListItem} ${
              currentTrack === index ? styles['PlayListItem--active'] : ''
            }`}
          >
            <button>{title}</button>
          </li>
        )
      })}
    </ul>
  )
}

export default PlayList
