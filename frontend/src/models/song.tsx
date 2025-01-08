export default interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  coverImage: string;
  audioFile: string;
  genre: string;
  createdAt: Date;
  lyrics: string;
}
