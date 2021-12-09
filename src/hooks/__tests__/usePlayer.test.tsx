import { waitFor } from '@testing-library/react'
import { act, renderHook } from '@testing-library/react-hooks'
import usePlayer from '../usePlayer'

describe('usePlayer', () => {
  // const [currentTrack, isPlaying, playTrack, nextTrack, previousTrack]
  test('should return the initial track as current track', async () => {
    const { result } = renderHook(() => usePlayer(1, 4))
    await waitFor(() => {
      expect(result.current[0]).toBe(1)
    })
  })
  test('should not be playing by default', async () => {
    const { result } = renderHook(() => usePlayer(1, 4))
    await waitFor(() => {
      expect(result.current[1]).toBe(false)
    })
  })
  test('should play the required track', async () => {
    const { result } = renderHook(() => usePlayer(1, 4))
    act(() => {
      result.current[2](3)
    })
    await waitFor(() => {
      expect(result.current[0]).toBe(3)
    })
  })

  test('should play the current track', async () => {
    const { result } = renderHook(() => usePlayer(1, 4))
    act(() => {
      result.current[2]()
    })
    await waitFor(() => {
      expect(result.current[0]).toBe(1)
    })
  })
  test('should play the next track if the current is not the last', async () => {
    const { result } = renderHook(() => usePlayer(1, 4))
    act(() => {
      result.current[3]()
    })
    await waitFor(() => {
      expect(result.current[0]).toBe(2)
    })
  })
  test('should not play the next track if the current is the last', async () => {
    const { result } = renderHook(() => usePlayer(3, 4))
    act(() => {
      result.current[3]()
    })
    await waitFor(() => {
      expect(result.current[0]).toBe(3)
    })
  })
  test('should play the previous track if the current is not the first', async () => {
    const { result } = renderHook(() => usePlayer(1, 4))
    act(() => {
      result.current[4]()
    })
    await waitFor(() => {
      expect(result.current[0]).toBe(0)
    })
  })
  test('should not play the previous track if the current is the first', async () => {
    const { result } = renderHook(() => usePlayer(0, 4))
    act(() => {
      result.current[4]()
    })
    await waitFor(() => {
      expect(result.current[0]).toBe(0)
    })
  })
})
