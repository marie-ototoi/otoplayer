import { waitFor } from '@testing-library/react'
import { act, renderHook } from '@testing-library/react-hooks'
import useTrack from '../useTrack'

describe('useTrack', () => {
  //  [progress, trackIsPlaying, play, pause]
  test('should set the initial position as given', async () => {
    const { result } = renderHook(() => useTrack(0, 'test'))
    await waitFor(() => {
      expect(result.current[0]).toBe(0)
    })
  })
  test('should set the initial playing state to `init`', async () => {
    const { result } = renderHook(() => useTrack(0, 'test'))

    await waitFor(() => {
      expect(result.current[1]).toBe('init')
    })
  })
  test('should set the playing state to true when the user clicks on play', async () => {
    const { result } = renderHook(() => useTrack(0, 'test'))
    act(() => {
      result.current[2]()
    })
    await waitFor(() => {
      expect(result.current[1]).toBe('playing')
    })
  })
  test('should set the playing state to false when the user clicks on pause', async () => {
    const { result } = renderHook(() => useTrack(0, 'test'))
    act(() => {
      result.current[2]()
      result.current[3]()
    })
    await waitFor(() => {
      expect(result.current[1]).toBe('paused')
    })
  })
})
