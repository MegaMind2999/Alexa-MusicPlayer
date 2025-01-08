const Playlist_element = ({
  playlist,
  playlistplay,
  playlistdelete,
  editPlaylist,
}: any) => {
  return (
    <div className="card mb-3 rounded" style={{ maxHeight: "100px" }}>
      <div className="row g-0">
        <div className="col-md-2 d-flex justify-content-center align-items-center">
          <button
            type="button"
            className="btn btn-secondary button-63"
            onClick={() => {
              playlistplay(playlist);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-play"
              viewBox="0 0 16 16"
            >
              <path d="M10.804 8 5 4.633v6.734zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696z"></path>
            </svg>
          </button>
        </div>

        <div className="col-md-8">
          <div className="card-body">
            <h5 className="truncated-title" style={{ fontSize: "1.2vw" }}>
              {playlist.name}
            </h5>
            <p className="card-text">
              <small className="text-muted">
                {playlist.songs.length} Songs
              </small>
            </p>
          </div>
        </div>
        <div className="col-md-1 d-flex justify-content-center align-items-center">
          <button
            type="button"
            style={{ backgroundColor: "white", padding: "3px" }}
            aria-label="Edit"
            onClick={() => editPlaylist(playlist)}
          >
            <img src="/edit.svg"></img>
          </button>
        </div>
        <div className="col-md-1 d-flex justify-content-center align-items-center">
          <button
            type="button"
            className="btn-close btn-close-black"
            aria-label="Close"
            onClick={() => playlistdelete(playlist)}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Playlist_element;
