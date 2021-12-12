import { useState } from 'react'

type Props = [
  number,
  number | null,
  boolean,
  (trackIndex?: number, play?: boolean) => void,
  () => number,
  () => number,
  (trackIndex: number | null) => void
]

const usePlayer = (trackIndex: number, lastIndex: number): Props => {
  const [currentTrack, setCurrentTrack] = useState<number>(trackIndex)
  const [hoveredTrack, setHoveredTrack] = useState<number | null>(null)
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

  const hoverTrack = (trackIndex: number | null): void => {
    if (hoveredTrack !== trackIndex) {
      setHoveredTrack(trackIndex)
    }
  }
  return [currentTrack, hoveredTrack, isPlaying, playTrack, nextTrack, previousTrack, hoverTrack]
}

export default usePlayer
