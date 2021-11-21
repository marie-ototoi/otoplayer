import React from "react";
import { render, screen } from "@testing-library/react";
import Player from "../Player";

const tracks = [
  {
    duration: 70,
  },
  {
    duration: 90,
  },
  {
    duration: 65,
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
    const svgTracks = screen.getAllByText(/Track/);
    expect(svgTracks.length).toEqual(tracks.length);
  });
});
