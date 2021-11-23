import React, { FC } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import useTrack from "../useTrack";

interface Props {
  position: number;
  url: string;
  nextTrack: () => void;
}
const TestUseTrack: FC<Props> = ({ position, url, nextTrack }) => {
  const [progress, trackIsPlaying, play, pause] = useTrack(
    position,
    url,
    nextTrack
  );
  return (
    <div>
      <button onClick={play}>play</button>
      <button onClick={pause}>pause</button>

      <h1>Progress: {progress}</h1>
      <h2>Playing: {trackIsPlaying ? "true" : "false"}</h2>
    </div>
  );
};

describe("usePlayer", () => {
  test("should return the initial track as current track", () => {
    render(<TestUseTrack position={0} url="test" nextTrack={() => {}} />);
    expect(
      screen.getByRole("heading", { name: /Current: 1/ })
    ).toBeInTheDocument();
  });
});
