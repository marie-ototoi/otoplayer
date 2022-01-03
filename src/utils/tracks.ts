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

export const getRingPath = (radius: number): string => {
  return `m ${-radius}, 0
  A ${radius},${radius} 0 0,1 ${radius}, ${0}
  A ${radius},${radius} 0 1,1 ${-radius}, ${0}
  `
}

export const formatDuration = (duration: number): string => {
  const date = new Date()
  date.setHours(0, 0, duration)
  let options: Intl.DateTimeFormatOptions = {
    minute: 'numeric',
    second: 'numeric',
  }
  if (date.getHours() > 0) options.hour = 'numeric'
  return new Intl.DateTimeFormat('fr-FR', options).format(date)
}

const rules = new Intl.PluralRules('en-US', {
  type: 'ordinal',
})
const suffixes = new Map([
  ['one', 'st'],
  ['two', 'nd'],
  ['few', 'rd'],
  ['other', 'th'],
])
export const formatOrdinal = (n: number) => {
  const rule = rules.select(n)
  const suffix = suffixes.get(rule)
  return `${n}${suffix}`
}
