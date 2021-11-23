import React, { FC } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import usePlayer from "../usePlayer";
interface Props {
  initialTrack: number;
  numberOfTracks: number;
}
const TestUsePlayer: FC<Props> = ({ initialTrack, numberOfTracks }) => {
  const [currentTrack, isPlaying, playTrack, nextTrack, previousTrack] =
    usePlayer(initialTrack, numberOfTracks);

  return (
    <div>
      <button
        onClick={() => {
          playTrack(2);
        }}
      >
        play 2
      </button>
      <button
        onClick={() => {
          playTrack(2, false);
        }}
      >
        pause 2
      </button>
      <button onClick={previousTrack}>previous</button>
      <button onClick={nextTrack}>next</button>

      <h1>Current: {currentTrack}</h1>
      <h2>Playing: {isPlaying ? "true" : "false"}</h2>
    </div>
  );
};

describe("usePlayer", () => {
  test("should return the initial track as current track", () => {
    render(<TestUsePlayer initialTrack={1} numberOfTracks={4} />);
    expect(
      screen.getByRole("heading", { name: /Current: 1/ })
    ).toBeInTheDocument();
  });
  test("should not be playing by default", () => {
    render(<TestUsePlayer initialTrack={1} numberOfTracks={4} />);
    expect(
      screen.getByRole("heading", { name: /Playing: false/ })
    ).toBeInTheDocument();
  });
  test("should play the next track if the current is not the last", () => {
    render(<TestUsePlayer initialTrack={1} numberOfTracks={4} />);
    fireEvent.click(screen.getByRole("button", { name: /next/ }));
    expect(
      screen.getByRole("heading", { name: /Current: 2/ })
    ).toBeInTheDocument();
  });
  test("should not play the next track if the current is the last", () => {
    render(<TestUsePlayer initialTrack={3} numberOfTracks={4} />);
    fireEvent.click(screen.getByRole("button", { name: /next/ }));
    expect(
      screen.getByRole("heading", { name: /Current: 3/ })
    ).toBeInTheDocument();
  });
  test("should play the previous track if the current is not the first", () => {
    render(<TestUsePlayer initialTrack={1} numberOfTracks={4} />);
    fireEvent.click(screen.getByRole("button", { name: /previous/ }));
    expect(
      screen.getByRole("heading", { name: /Current: 0/ })
    ).toBeInTheDocument();
  });
  test("should not play the previous track if the current is the first", () => {
    render(<TestUsePlayer initialTrack={0} numberOfTracks={4} />);
    fireEvent.click(screen.getByRole("button", { name: /previous/ }));
    expect(
      screen.getByRole("heading", { name: /Current: 0/ })
    ).toBeInTheDocument();
  });
});
