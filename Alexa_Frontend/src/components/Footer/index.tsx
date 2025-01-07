import { useEffect, useState } from "react";
import API_ENDPOINTS from "../../config";
import Song from "../../models/song";
import AudioControler from "../Audiocontroler";

const formatTime = (time: any) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
};

export function PageFooter({
  trackIndex,
  Trackdata,
  setTrackIndex,
  audioPlayerRef,
  isPlaying,
  setIsPlaying,
  queue,
  setcurrTrackdata,
  queuechange,
}: any) {
  const currTrackdata = Trackdata as Song;
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setmuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const updateTime = () => {
    setCurrentTime(audioPlayerRef.current.currentTime);
    setDuration(audioPlayerRef.current.duration);
  };
  useEffect(() => {
    if (queue.length != 0) {
      setTrackIndex(0);
      console.log(audioPlayerRef);
      setcurrTrackdata(queue[0]);
      setCurrentTime(0);
      audioPlayerRef.current.src = `${API_ENDPOINTS.GET_UPLOADS}/${queue[0].audioFile}`; // Change the audio source
      audioPlayerRef.current.load();
      audioPlayerRef.current.addEventListener(
        "loadeddata",
        () => {
          setIsPlaying(true);
          audioPlayerRef.current.play().catch((error: any) => {
            console.error("Error playing audio:", error);
          });
        },
        { once: true }
      );
    }
  }, [queuechange]);
  useEffect(() => {
    const audio = audioPlayerRef.current;
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("ended", playNextTrack); // Automatically play next track when current ends
    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("ended", playNextTrack);
    };
  }, [trackIndex]);

  useEffect(() => {
    if (trackIndex != -1) {
      setCurrentTime(0); // Reset current time
      setDuration(0); // Reset duration
    }
  }, [trackIndex]);

  const playNextTrack = () => {
    if (queue.length != 0) {
      const nextIndex = (trackIndex + 1) % queue.length; // Loop back to the first track
      setTrackIndex(nextIndex);
      setcurrTrackdata(queue[nextIndex]);
      setCurrentTime(0); // Reset current time
      audioPlayerRef.current.src = `${API_ENDPOINTS.GET_UPLOADS}/${queue[nextIndex].audioFile}`; // Change the audio source
      audioPlayerRef.current.load();
      audioPlayerRef.current.addEventListener(
        "loadeddata",
        () => {
          setIsPlaying(true);
          audioPlayerRef.current.play().catch((error: any) => {
            console.error("Error playing audio:", error);
          });
        },
        { once: true }
      );
    }
  };

  // Play the previous track
  const playPreviousTrack = () => {
    if (queue.length != 0) {
      const prevIndex = (trackIndex - 1 + queue.length) % queue.length; // Loop back to the last track
      setTrackIndex(prevIndex);
      setcurrTrackdata(queue[prevIndex]);
      setCurrentTime(0); // Reset current time
      audioPlayerRef.current.src = `${API_ENDPOINTS.GET_UPLOADS}/${queue[prevIndex].audioFile}`; // Change the audio source
      audioPlayerRef.current.load();
      audioPlayerRef.current.addEventListener(
        "loadeddata",
        () => {
          setIsPlaying(true);
          audioPlayerRef.current.play().catch((error: any) => {
            console.error("Error playing audio:", error);
          });
        },
        { once: true }
      );
    }
  };

  const onPlayPauseClick = (state: boolean) => {
    if (queue.length != 0) {
      if (state) {
        if (audioPlayerRef.current) {
          audioPlayerRef.current.play();
          setIsPlaying(true);
        }
      } else {
        if (audioPlayerRef.current) {
          audioPlayerRef.current.pause();
          setIsPlaying(false);
        }
      }
    }
  };
  const changemuted = (state: boolean) => {
    if (audioPlayerRef) {
      if (audioPlayerRef.current.muted != state) {
        audioPlayerRef.current.muted = state;
        setmuted(state);
      }
    }
  };
  const handleVolumeChange = (event: any) => {
    const newVolume = event.target.value; // Get the volume from the slider
    setVolume(newVolume);
    audioPlayerRef.current.volume = newVolume; // Set the volume of the audio element
  };
  return (
    <div className="bottom-div">
      <div className="container text-center">
        <div className="row">
          <div className="col-1 albumcovericonholder">
            <img
              src={
                currTrackdata.coverImage
                  ? `${API_ENDPOINTS.GET_UPLOADS}/${currTrackdata.coverImage}`
                  : "/Music_icon.jpg"
              }
              style={{ height: "65px", width: "65px", display: "inline" }}
              className="albumcovericon"
            ></img>
          </div>
          <div className="col-3">
            <p className="marquee">
              <span>{currTrackdata.title}</span>
            </p>
            <p className="marquee">
              <span>{currTrackdata.album}</span>
            </p>
            <p className="marquee">
              <span>{currTrackdata.artist}</span>
            </p>
          </div>
          <div className="col-4">
            <audio
              ref={audioPlayerRef}
              src={`${API_ENDPOINTS.GET_UPLOADS}/${currTrackdata.audioFile}`}
            />
            <AudioControler
              isPlaying={isPlaying}
              onNextClick={playNextTrack}
              onPlayPauseClick={onPlayPauseClick}
              onPrevClick={playPreviousTrack}
            ></AudioControler>
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              className="progress"
              onChange={(e) => {
                audioPlayerRef.current.currentTime = e.target.value;
              }}
              style={{ width: "100%", marginTop: "8px" }}
            />
            <div className="d-flex justify-content-between">
              <span id="currentTime" style={{ color: "white" }}>
                {currentTime ? formatTime(currentTime) : "00:00"}
              </span>
              <span id="duration" style={{ color: "white" }}>
                {duration ? formatTime(duration) : "00:00"}
              </span>
            </div>
          </div>
          <div className="col-2">
            {muted ? (
              <button
                type="button"
                style={{ backgroundColor: "black" }}
                className="btn btn-secondary"
                onClick={() => {
                  changemuted(false);
                }}
              >
                <img src="/muted.svg" />
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-secondary"
                style={{ backgroundColor: "black" }}
                onClick={() => {
                  changemuted(true);
                }}
              >
                <img src="/unmuted.svg" />
              </button>
            )}
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              style={{
                width: "100%",
                height: "5px",
                marginTop: "8px",
                background:
                  "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(0,255,77,1) 73%, rgba(175,0,0,1) 100%)",
                appearance: "none",
                color: "red",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
