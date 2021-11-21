import React, { FC, useEffect, useState } from "react";
import styles from "./Player.module.css";
import TrackSvg from "./TrackSvg";
import { initTracks } from "../utils/tracks";
import type { TrackDataInput, TrackData } from "../types/tracks";
interface Props {
  autoplay?: boolean;
  side?: number;
  tracks: TrackDataInput[];
}

const Player: FC<Props> = ({ autoplay = false, side = 400, tracks }) => {
  const [tracksData, setTracksData] = useState<TrackData[]>(initTracks(tracks));
  useEffect(() => {
    setTracksData(initTracks(tracks));
  }, [tracks]);

  return (
    <div className={styles.Player} style={{ width: side + "px" }}>
      <div className={styles.PlayerSvg} style={{ backgroundColor: "#0000ff" }}>
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
              side={side}
              track={track}
              total={tracksData[tracksData.length - 1].end}
            />
          ))}
        </svg>
      </div>
      <ul>
        {tracksData.map((track, index) => (
          <li key={`list-track-${index}`}>{index}</li>
        ))}
      </ul>
      <audio controls></audio>
    </div>
  );
};

export default Player;
