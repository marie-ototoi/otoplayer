import React, { FC } from "react";
import "./Player.css";

interface Props {
  autoplay?: boolean;
  side?: number;
}
const Player: FC<Props> = ({ autoplay = false, side = 500 }) => {
  return (
    <svg
      width={side}
      height={side}
      xmlns="http://www.w3.org/2000/svg"
      fill="inherit"
    ></svg>
  );
};

export default Player;
