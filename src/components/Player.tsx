import React, { FC, useEffect, useState } from "react";
import styles from "./Player.module.css";
import TrackSvg from "./TrackSvg";
import { initTracks } from "../utils/tracks";
import usePlayer from "../hooks/usePlayer";
import type { TrackDataInput, TrackData } from "../types/tracks";
interface Props {
  side?: number;
  tracks: TrackDataInput[];
  background?: string;
}

const Player: FC<Props> = ({ background = "#0000ff", side = 400, tracks }) => {
  const [tracksData, setTracksData] = useState<TrackData[]>(initTracks(tracks));
  const [currentTrack, isPlaying, playTrack] = usePlayer(0, false);

  useEffect(() => {
    setTracksData(initTracks(tracks));
  }, [tracks]);

  return (
    <div className={styles.Player} style={{ width: side + "px" }}>
      <div className={styles.PlayerSvg} style={{ background }}>
        <svg
          data-testid="player"
          xmlns="http://www.w3.org/2000/svg"
          width={side}
          height={side}
          role="img"
        >
          {tracksData.map((track, index) => (
            <TrackSvg
              key={`svg-track-${index}`}
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              playTrack={playTrack}
              side={side}
              track={track}
              total={tracksData[0].end}
            />
          ))}
        </svg>
      </div>
      <ul>
        {tracksData.map((track, index) => (
          <li key={`list-track-${index}`}>{index}</li>
        ))}
      </ul>
    </div>
  );
};

export default Player;
