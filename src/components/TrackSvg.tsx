import React, { FC } from "react";
import styles from "./TrackSvg.module.css";
import type { TrackData } from "../types/tracks";

interface Props {
  side: number;
  total: number;
  track: TrackData;
}
const TrackSvg: FC<Props> = ({ side, total, track }) => {
  const { index, start, end, duration, position } = track;
  const offset = side / 2;
  const radius = {
    start: (start * side) / 2 / total,
    end: (end * side) / 2 / total,
    middle: ((start + (end - start) / 2) * side) / 2 / total,
  };
  const circumference = Math.PI * radius.middle * 2;
  const strokeOffset = circumference - (position * circumference) / duration;
  return (
    <g className={styles.Track}>
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
      <text fill="#000">Track {index}</text>
    </g>
  );
};

export default TrackSvg;
