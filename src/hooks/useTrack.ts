import { useEffect, useRef, useState } from 'react'
import { throttle } from '../utils/tracks'

type UseTrackControls = [number, boolean, (position?: number) => void, () => void]

const useTrack = (position: number, url: string, nextTrack: () => void): UseTrackControls => {
  const [progress, setProgress] = useState<number>(position)
  const [trackIsPlaying, setTrackIsPlaying] = useState<boolean>(false)
  const audioRef = useRef<HTMLAudioElement>()

  useEffect(() => {
    audioRef.current = new Audio(url)
  }, [url])

  useEffect(() => {
    if (audioRef.current) {
      const ref = audioRef.current
      const updateProgress = () => {
        setProgress(ref.currentTime)
      }
      ref.addEventListener('timeupdate', throttle(updateProgress, 1000))
      ref.addEventListener('ended', nextTrack)
      return () => {
        ref.removeEventListener('timeupdate', throttle(updateProgress, 1000))
        ref.removeEventListener('ended', nextTrack)
        ref.pause()
      }
    }
  }, [audioRef, nextTrack])

  const playTrack = (position?: number): void => {
    if (position && audioRef.current) audioRef.current.currentTime = position
    audioRef.current
      ?.play()
      .then(function () {
        setTrackIsPlaying(true)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const pauseTrack = (): void => {
    if (!audioRef.current?.paused) audioRef.current?.pause()
    setTrackIsPlaying(false)
  }

  return [progress, trackIsPlaying, playTrack, pauseTrack]
}

export default useTrack
