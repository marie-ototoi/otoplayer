import { formatDuration, initTracks } from '../tracks'

describe('Track utils', () => {
  describe('Init tracks', () => {
    const tracks = [
      {
        duration: 30,
        url: '/tracks/texte_30.mp3',
      },
      {
        duration: 90,
        url: '/tracks/texte_30.mp3',
      },
      {
        duration: 65,
        url: '/tracks/texte_30.mp3',
      },
    ]
    test('should enrich track data with data relative to other tracks', () => {
      expect(initTracks(tracks)).toEqual([
        {
          duration: 30,
          end: 30,
          index: 0,
          position: 0,
          start: 0,
          url: '/tracks/texte_30.mp3',
        },
        {
          duration: 90,
          end: 120,
          index: 1,
          position: 0,
          start: 30,
          url: '/tracks/texte_30.mp3',
        },
        {
          duration: 65,
          end: 185,
          index: 2,
          position: 0,
          start: 120,
          url: '/tracks/texte_30.mp3',
        },
      ])
    })
  })
  describe('Format duration', () => {
    test('should not return hours if the duration is less than 1 hour', () => {
      expect(formatDuration(120)).toEqual('02:00')
    })
    test('should  return hours if the duration is more than 1 hour', () => {
      expect(formatDuration(3800)).toEqual('01:03:20')
    })
  })
})
