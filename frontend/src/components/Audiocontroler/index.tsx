const AudioControler = ({
  isPlaying,
  onPlayPauseClick,
  onPrevClick,
  onNextClick,
}: any) => (
  <div
    className="audio-controls btn-group btn-group-sm"
    role="group"
    aria-label="Large button group"
  >
    <button
      type="button"
      className="btn btn-outline-primary"
      aria-label="Previous"
      onClick={onPrevClick}
      style={{
        backgroundColor: "black",
        paddingLeft: "10px",
        paddingRight: "10px",
      }}
    >
      <img src="/prev.svg" />
    </button>
    {isPlaying ? (
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={() => onPlayPauseClick(false)}
        aria-label="Pause"
        style={{
          backgroundColor: "black",
          marginRight: "8px",
          marginLeft: "8px",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
      >
        <img src="/pause.svg" />
      </button>
    ) : (
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={() => onPlayPauseClick(true)}
        aria-label="Play"
        style={{
          backgroundColor: "black",
          marginRight: "8px",
          marginLeft: "8px",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
      >
        <img src="/play.svg" />
      </button>
    )}
    <button
      type="button"
      className="btn btn-outline-primary"
      aria-label="Next"
      onClick={onNextClick}
      style={{
        backgroundColor: "black",
        paddingLeft: "10px",
        paddingRight: "10px",
      }}
    >
      <img src="/next.svg" />
    </button>
  </div>
);

export default AudioControler;
