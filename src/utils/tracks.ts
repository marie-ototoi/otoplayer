import type { TrackDataInput, TrackData } from '../types/tracks'

export const initTracks = (tracks: TrackDataInput[]): TrackData[] => {
  return tracks.reduce((acc: TrackData[], cur: TrackDataInput, index: number) => {
    const prev = acc.length > 0 ? acc[acc.length - 1].end : 0
    acc.push({
      ...cur,
      position: 0,
      start: prev,
      end: prev + cur.duration,
      index,
    })
    return acc
  }, [])
}
