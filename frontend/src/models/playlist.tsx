import Song from "./song";

export default interface Playlist {
  _id: String;
  name: String;
  songs: Song[];
  createdAt: Date;
  __v: number;
}
