import { useEffect, useRef, useState } from 'react'

type UseTrackControls = [number, boolean, () => void, () => void]

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
      ref.addEventListener('timeupdate', updateProgress)
      ref.addEventListener('ended', nextTrack)
      return () => {
        ref.removeEventListener('timeupdate', updateProgress)
        ref.removeEventListener('ended', updateProgress)
        ref.pause()
      }
    }
  }, [audioRef, nextTrack])

  const playTrack = (): void => {
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
    audioRef.current?.pause()
    setTrackIsPlaying(false)
  }

  return [progress, trackIsPlaying, playTrack, pauseTrack]
}

export default useTrack
