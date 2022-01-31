import { useCallback, useState } from 'react'

type Props = {
  currentTrack: number
  hoveredTrack: number | null
  selectedTrack: number | null
  isPlaying: boolean
  playTrack: (trackIndex?: number, play?: boolean) => void
  nextTrack: () => number
  previousTrack: () => number
  hoverTrack: (trackIndex: number | null) => void
  selectTrack: (trackIndex: number | null) => void
}

const usePlayer = (trackIndex: number, lastIndex: number): Props => {
  const [currentTrack, setCurrentTrack] = useState<number>(trackIndex)
  const [hoveredTrack, setHoveredTrack] = useState<number | null>(null)
  const [selectedTrack, setSelectedTrack] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  const playTrack = (trackIndex: number = currentTrack, play: boolean = true): void => {
    if (!(trackIndex === currentTrack && play === isPlaying)) {
      setCurrentTrack(trackIndex)
      setSelectedTrack(null)
      setIsPlaying(play)
    }
  }

  const nextTrack = useCallback((): number => {
    if (trackIndex < lastIndex - 1) {
      setCurrentTrack(trackIndex + 1)
      return trackIndex + 1
    }
    return trackIndex
  }, [trackIndex, lastIndex])

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
  const selectTrack = (trackIndex: number | null): void => {
    if (selectedTrack !== trackIndex) {
      setSelectedTrack(trackIndex)
    }
  }
  return {
    currentTrack,
    hoveredTrack,
    selectedTrack,
    isPlaying,
    playTrack,
    nextTrack,
    previousTrack,
    hoverTrack,
    selectTrack,
  }
}

export default usePlayer
