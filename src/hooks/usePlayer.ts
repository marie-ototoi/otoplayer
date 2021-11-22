import React, { useState } from "react";

const usePlayer = (
  trackIndex: number,
  autoplay: boolean
): [number, boolean, (trackIndex: number, play?: boolean) => void] => {
  const [currentTrack, setCurrentTrack] = useState<number>(trackIndex);
  const [isPlaying, setIsPlaying] = useState<boolean>(autoplay);

  const playTrack = (trackIndex: number, play: boolean = true): void => {
    console.log(trackIndex, play);
    setCurrentTrack(trackIndex);
    setIsPlaying(play);
  };

  return [currentTrack, isPlaying, playTrack];
};

export default usePlayer;
