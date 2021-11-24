import { initTracks } from '../tracks'

describe('Player', () => {
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
        duration: 65,
        end: 185,
        index: 2,
        position: 0,
        start: 120,
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
        duration: 30,
        end: 30,
        index: 0,
        position: 0,
        start: 0,
        url: '/tracks/texte_30.mp3',
      },
    ])
  })
})
