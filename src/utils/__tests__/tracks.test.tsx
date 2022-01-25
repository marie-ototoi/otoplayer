import { formatDuration, formatOrdinal, getAngle, initTracks } from '../tracks'

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
  describe('Format ordinals', () => {
    test('should return n+st for numbers ending by 1 (except 11)', () => {
      expect(formatOrdinal(1)).toEqual('1st')
      expect(formatOrdinal(21)).toEqual('21st')
      expect(formatOrdinal(101)).toEqual('101st')
    })
    test('should return n+nd for numbers ending by 2 (except 12)', () => {
      expect(formatOrdinal(2)).toEqual('2nd')
      expect(formatOrdinal(22)).toEqual('22nd')
      expect(formatOrdinal(102)).toEqual('102nd')
    })
    test('should return n+rd for numbers ending by 3 (except 13)', () => {
      expect(formatOrdinal(3)).toEqual('3rd')
      expect(formatOrdinal(23)).toEqual('23rd')
      expect(formatOrdinal(103)).toEqual('103rd')
    })
    test('should return n+th for other numbers', () => {
      expect(formatOrdinal(4)).toEqual('4th')
      expect(formatOrdinal(11)).toEqual('11th')
      expect(formatOrdinal(12)).toEqual('12th')
      expect(formatOrdinal(13)).toEqual('13th')
    })
  })
  describe('Get angle for a point on a circle', () => {
    test('should return the angle when the center is 0,0', () => {
      expect(getAngle({ x: 10, y: 0 }, { x: 0, y: 0 })).toEqual(0)
      expect(getAngle({ x: 10, y: 10 }, { x: 0, y: 0 })).toEqual(45)
      expect(getAngle({ x: 0, y: 10 }, { x: 0, y: 0 })).toEqual(90)
      expect(getAngle({ x: -10, y: 10 }, { x: 0, y: 0 })).toEqual(135)
      expect(getAngle({ x: -10, y: 0 }, { x: 0, y: 0 })).toEqual(180)
      expect(getAngle({ x: -10, y: -10 }, { x: 0, y: 0 })).toEqual(225)
      expect(getAngle({ x: 0, y: -10 }, { x: 0, y: 0 })).toEqual(270)
      expect(getAngle({ x: 10, y: -10 }, { x: 0, y: 0 })).toEqual(315)
    })
    test('should return the angle when the center is not 0,0', () => {
      expect(getAngle({ x: 20, y: 10 }, { x: 10, y: 10 })).toEqual(0)
      expect(getAngle({ x: 20, y: 20 }, { x: 10, y: 10 })).toEqual(45)
      expect(getAngle({ x: 10, y: 20 }, { x: 10, y: 10 })).toEqual(90)
      expect(getAngle({ x: 0, y: 20 }, { x: 10, y: 10 })).toEqual(135)
      expect(getAngle({ x: 0, y: 10 }, { x: 10, y: 10 })).toEqual(180)
      expect(getAngle({ x: 0, y: 0 }, { x: 10, y: 10 })).toEqual(225)
      expect(getAngle({ x: 10, y: 0 }, { x: 10, y: 10 })).toEqual(270)
      expect(getAngle({ x: 20, y: 0 }, { x: 10, y: 10 })).toEqual(315)
    })
    test('should return the angle less the rotation offset', () => {
      expect(getAngle({ x: 20, y: 10 }, { x: 10, y: 10 }, 20)).toEqual(340)
      expect(getAngle({ x: 20, y: 10 }, { x: 10, y: 10 }, 100)).toEqual(260)
    })
  })
})
