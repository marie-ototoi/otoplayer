import { useState } from 'react'

type Props = [
  number,
  boolean,
  (trackIndex?: number, play?: boolean) => void,
  () => number,
  () => number
]

const usePlayer = (trackIndex: number, lastIndex: number): Props => {
  const [currentTrack, setCurrentTrack] = useState<number>(trackIndex)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  const playTrack = (trackIndex: number = currentTrack, play: boolean = true): void => {
    setCurrentTrack(trackIndex)
    setIsPlaying(play)
  }

  const nextTrack = (): number => {
    if (trackIndex < lastIndex - 1) {
      setCurrentTrack(trackIndex + 1)
      return trackIndex + 1
    }
    return trackIndex
  }

  const previousTrack = (): number => {
    if (trackIndex > 0) {
      setCurrentTrack(trackIndex - 1)
      return trackIndex - 1
    }
    return trackIndex
  }

  return [currentTrack, isPlaying, playTrack, nextTrack, previousTrack]
}

export default usePlayer
