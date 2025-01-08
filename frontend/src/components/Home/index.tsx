import { useState, useEffect, useRef } from "react";
import { PageFooter } from "../Footer";
import Header from "../Header";
import Mid from "../Mid";
import Song from "../../models/song";
import { API_ENDPOINTS } from "../../config";

export const Home = () => {
  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  const [queue, setQueue] = useState<Song[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [queuechange, setqueuechange] = useState(false);
  const [trackIndex, setTrackIndex] = useState<number>(-1);
  const [currTrackdata, setcurrTrackdata] = useState<Song>({
    _id: "",
    title: "Song name",
    artist: "artist",
    album: "album",
    duration: "00:00",
    coverImage: "",
    audioFile: "",
    genre: "",
    createdAt: new Date(),
    lyrics: "",
  });

  useEffect(() => {
    if (trackIndex == -1 && queue.length != 0) {
      setTrackIndex(0);
      setcurrTrackdata(queue[0]);
    }
    if (queue.length == 0) {
      setTrackIndex(-1);
      setcurrTrackdata({
        _id: "",
        title: "Song name",
        artist: "artist",
        album: "album",
        duration: "00:00",
        coverImage: "",
        audioFile: "",
        genre: "",
        createdAt: new Date(),
        lyrics: "",
      });
      setIsPlaying(false);
      if (audioPlayerRef) {
        audioPlayerRef.current!.pause();
        audioPlayerRef.current!.src = "";
      }
    }
    if (queue.length != 0 && isPlaying) {
      const curr = audioPlayerRef.current?.src;
      const indexofsong = queue.findIndex((song) => {
        const expectedSrc = `${API_ENDPOINTS.GET_UPLOADS}/${song.audioFile}`;
        return curr === expectedSrc; // Compare with the current src
      });
      if (indexofsong !== -1) {
        setTrackIndex(indexofsong);
      } else {
        if (queue.length == 0) {
          setTrackIndex(-1);
          setIsPlaying(false);
          audioPlayerRef.current!.pause();
          audioPlayerRef.current!.src = "";
          setqueuechange(!queuechange);
        } else {
        }
        setTrackIndex(0);
        setIsPlaying(false);
        audioPlayerRef.current!.pause();
        audioPlayerRef.current!.src = `${API_ENDPOINTS.GET_UPLOADS}/${queue[0].audioFile}`;
        setqueuechange(!queuechange);
      }
    }
  }, [queue]);

  useEffect(() => {
    // Fetch songs from the API
    const fetchSongs = async () => {
      try {
        const response = await fetch(
          `${API_ENDPOINTS.GET_SONGS}?search=${encodeURIComponent(searchTerm)}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setSongs(data.songs);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSongs();
  }, [searchTerm]);
  const handlePlayOne = (song: Song) => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      setIsPlaying(false);
      setQueue([]);
      setQueue([song]);
      audioPlayerRef.current.src = `${API_ENDPOINTS.GET_UPLOADS}/${song.audioFile}`;
      audioPlayerRef.current.addEventListener(
        "loadeddata",
        () => {
          setIsPlaying(true);
          audioPlayerRef.current!.play().catch((error: any) => {
            console.error("Error playing audio:", error);
          });
        },
        { once: true }
      );
      setcurrTrackdata(song);
    }
  };
  return (
    <div>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <Mid
        songs={songs}
        queue={queue}
        setQueue={setQueue}
        handlePlayOne={handlePlayOne}
        queuechange={queuechange}
        setqueuechange={setqueuechange}
      />

      <PageFooter
        trackIndex={trackIndex}
        Trackdata={currTrackdata}
        setTrackIndex={setTrackIndex}
        audioPlayerRef={audioPlayerRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        queue={queue}
        setcurrTrackdata={setcurrTrackdata}
        queuechange={queuechange}
      />
    </div>
  );
};
