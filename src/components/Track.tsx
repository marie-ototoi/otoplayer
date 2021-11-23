import React, { FC, useEffect, useRef, useState } from "react";
import useTrack from "../hooks/useTrack";
import styles from "./Track.module.css";
import type { TrackData } from "../types/tracks";

interface Props {
  currentTrack: number;
  isPlaying: boolean;
  setTrack: (index: number, play: boolean) => void;
  nextTrack: () => void;
  side: number;
  total: number;
  track: TrackData;
}
const Track: FC<Props> = ({
  currentTrack,
  isPlaying,
  nextTrack,
  setTrack,
  side,
  total,
  track,
}) => {
  const { index, start, end, duration, position, url } = track;
  const [progress, trackIsPlaying, play, pause] = useTrack(
    position,
    url,
    nextTrack
  );

  useEffect(() => {
    if (isPlaying && index === currentTrack) {
      play();
    } else {
      pause();
    }
  }, [currentTrack, index, isPlaying, play, pause]);

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
      onClick={() => {
        setTrack(index, !trackIsPlaying);
      }}
    >
      <circle
        r={radius.end}
        className={styles.Track__limit}
        cx={offset}
        cy={offset}
        strokeOpacity={0.5}
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
      <circle
        r={radius.middle}
        strokeWidth={radius.end - radius.start}
        strokeDasharray={circumference}
        strokeDashoffset={0}
        className={styles.Track__transparent}
        cx={offset}
        cy={offset}
      />
    </g>
  );
};

export default Track;
