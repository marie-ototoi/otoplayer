import React from "react";
import { render, screen } from "@testing-library/react";
import Player from "../Player";

const tracks = [
  {
    duration: 30,
    url: "/tracks/texte_30.mp3",
  },
  {
    duration: 90,
    url: "/tracks/texte_30.mp3",
  },
  {
    duration: 65,
    url: "/tracks/texte_30.mp3",
  },
];
describe("Player", () => {
  test("should render the player", () => {
    render(<Player tracks={tracks} />);
    const player = screen.getByTestId("player");
    expect(player).toBeInTheDocument();
  });
  test("should render the tracks", () => {
    render(<Player tracks={tracks} />);
    const svgTracks = screen.getByTestId("player").children;
    expect(svgTracks.length).toEqual(tracks.length);
  });
});
