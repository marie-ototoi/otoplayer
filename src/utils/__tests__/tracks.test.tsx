import { initTracks } from "../tracks";

describe("Player", () => {
  const tracks = [
    {
      duration: 30,
    },
    {
      duration: 90,
    },
    {
      duration: 65,
    },
  ];
  test("should enrich track data with data relative to other tracks", () => {
    expect(initTracks(tracks)).toEqual([
      {
        duration: 30,
        end: 80,
        index: 0,
        position: 0,
        start: 50,
      },
      {
        duration: 90,
        end: 170,
        index: 1,
        position: 0,
        start: 80,
      },
      {
        duration: 65,
        end: 235,
        index: 2,
        position: 0,
        start: 170,
      },
    ]);
  });
});
