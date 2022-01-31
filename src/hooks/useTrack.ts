import { useEffect, useRef, useState } from 'react'
import { throttle } from '../utils/tracks'

type UseTrackControls = [
  number,
  'init' | 'playing' | 'paused' | 'ended',
  (position?: number) => void,
  () => void
]

const useTrack = (position: number, url: string): UseTrackControls => {
  const [progress, setProgress] = useState<number>(position)
  const [trackStatus, setTrackStatus] = useState<'init' | 'playing' | 'paused' | 'ended'>('init')
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
      ref.addEventListener('ended', () => setTrackStatus('ended'))
      return () => {
        ref.removeEventListener('timeupdate', throttle(updateProgress, 1000))
        ref.removeEventListener('ended', () => setTrackStatus('ended'))
        ref.pause()
      }
    }
  }, [audioRef])

  const playTrack = (position?: number): void => {
    if (position && audioRef.current) audioRef.current.currentTime = position
    audioRef.current
      ?.play()
      .then(function () {
        setTrackStatus('playing')
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const pauseTrack = (): void => {
    if (!audioRef.current?.paused) audioRef.current?.pause()
    setTrackStatus('paused')
  }

  return [progress, trackStatus, playTrack, pauseTrack]
}

export default useTrack
