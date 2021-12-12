import { waitFor } from '@testing-library/react'
import { act, renderHook } from '@testing-library/react-hooks'
import usePlayer from '../usePlayer'

describe('usePlayer', () => {
  // const [currentTrack, hoveredTrack, isPlaying, playTrack, nextTrack, previousTrack, hoverTrack]
  test('should return the initial track as current track', () => {
    const { result } = renderHook(() => usePlayer(1, 4))
    const [currentTrack] = result.current

    expect(currentTrack).toBe(1)
  })
  test('should not be playing by default', () => {
    const { result } = renderHook(() => usePlayer(1, 4))
    const isPlaying = result.current[2]
    expect(isPlaying).toBe(false)
  })
  test('should play the required track', () => {
    const { result } = renderHook(() => usePlayer(1, 4))
    const playTrack = result.current[3]
    act(() => {
      playTrack(3)
    })
    expect(result.current[0]).toBe(3)
  })

  test('should play the current track', () => {
    const { result } = renderHook(() => usePlayer(1, 4))
    const playTrack = result.current[3]
    act(() => {
      playTrack()
    })
    expect(result.current[0]).toBe(1)
  })
  test('should play the next track if the current is not the last', () => {
    const { result } = renderHook(() => usePlayer(1, 4))
    const nextTrack = result.current[4]
    act(() => {
      nextTrack()
    })
    expect(result.current[0]).toBe(2)
  })
  test('should not play the next track if the current is the last', () => {
    const { result } = renderHook(() => usePlayer(3, 4))
    const nextTrack = result.current[4]
    act(() => {
      nextTrack()
    })
    expect(result.current[0]).toBe(3)
  })
  test('should play the previous track if the current is not the first', () => {
    const { result } = renderHook(() => usePlayer(1, 4))
    const previousTrack = result.current[5]
    act(() => {
      previousTrack()
    })
    expect(result.current[0]).toBe(0)
  })
  test('should not play the previous track if the current is the first', () => {
    const { result } = renderHook(() => usePlayer(0, 4))
    const previousTrack = result.current[5]
    act(() => {
      previousTrack()
    })
    expect(result.current[0]).toBe(0)
  })
  it.only('should set hovered track', () => {
    const { result } = renderHook(() => usePlayer(0, 4))
    const hoverTrack = result.current[6]
    act(() => {
      hoverTrack(3)
    })
    expect(result.current[1]).toBe(3)
  })
})
