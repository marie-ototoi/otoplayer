export interface TrackDataInput {
  title?: string;
  duration: number;
}
export interface TrackData extends TrackDataInput {
  start: number;
  end: number;
  index: number;
  position: number;
}
