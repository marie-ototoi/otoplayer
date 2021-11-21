import React, { FC, useEffect, useRef, useState } from "react";
import styles from "./TrackSvg.module.css";
import type { TrackData } from "../types/tracks";

interface Props {
  currentTrack: number;
  isPlaying: boolean;
  playTrack: (index: number, play: boolean) => void;
  side: number;
  total: number;
  track: TrackData;
}
const TrackSvg: FC<Props> = ({
  currentTrack,
  isPlaying,
  playTrack,
  side,
  total,
  track,
}) => {
  const { index, start, end, duration, position, url } = track;
  const [progress, setProgress] = useState<number>(position);
  const [trackIsPlaying, setTrackIsPlaying] = useState<boolean | null>(null);
  const audioRef = useRef(new Audio(url));

  useEffect(() => {
    if (isPlaying !== trackIsPlaying) {
      if (isPlaying) {
        audioRef.current
          .play()
          .then(function () {
            setTrackIsPlaying(isPlaying);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        audioRef.current.pause();
        setTrackIsPlaying(isPlaying);
      }
    }
  }, [isPlaying, trackIsPlaying]);
  console.log(isPlaying, trackIsPlaying);
  const offset = side / 2;
  const radius = {
    start: (start * (side - 5)) / 2 / total,
    end: (end * (side - 5)) / 2 / total,
    middle: ((start + (end - start) / 2) * (side - 5)) / 2 / total,
  };
  const circumference = Math.PI * radius.middle * 2;
  const strokeOffset = circumference - (progress * circumference) / duration;
  return (
    <g
      className={styles.Track}
      onClick={() => playTrack(index, !trackIsPlaying)}
    >
      <circle
        r={radius.end}
        className={styles.Track__limit}
        cx={offset}
        cy={offset}
      />
      <circle
        r={radius.middle}
        strokeWidth={radius.end - radius.start}
        strokeDasharray={circumference}
        strokeDashoffset={strokeOffset}
        className={styles.Track__played}
        cx={offset}
        cy={offset}
      />
    </g>
  );
};

export default TrackSvg;
