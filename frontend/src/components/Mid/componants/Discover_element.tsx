import { DropdownButton, Dropdown } from "react-bootstrap";
import API_ENDPOINTS from "../../../config";
import Playlist from "../../../models/playlist";
const Discover_element = ({
  title,
  artist,
  coverImage,
  album,
  id,
  duration,
  audioFile,
  genre,
  createdAt,
  lyrics,
  song,
  addToQueue,
  Playlist,
  addsongtoplaylist,
  handlePlayOne,
}: any) => {
  return (
    <div className="card mb-3 rounded" style={{ maxHeight: "200px" }}>
      <div className="row g-0" style={{ width: "100%" }}>
        <div
          className="col-md-2 song-cover-container"
          style={{ paddingBottom: "10px", position: "relative" }}
        >
          <img
            src={`${API_ENDPOINTS.GET_UPLOADS}/${coverImage}`}
            className="img-fluid rounded-circle border border-primary"
            alt={title}
            style={{
              width: "120px",
              height: "100%",
              padding: "6px",
              marginTop: "4px",
              marginLeft: "5px",
            }}
          />

          {/* Overlay with play icon */}
          <div className="overlay img-fluid  border-primary">
            <img
              src="/playicon.svg"
              className="play-icon"
              onClick={() => {
                handlePlayOne(song);
              }}
            />
          </div>
        </div>

        <div className="col-md-7">
          <div className="card-body">
            <h5 className="truncated-title" style={{ fontSize: "1.5vw" }}>
              {title}
            </h5>
            <p className="truncated-title" style={{ fontSize: "1vw" }}>
              {artist}
            </p>
            <p className="card-text">
              <small className="truncated-title" style={{ fontSize: "0.9vw" }}>
                {duration}
              </small>
            </p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-body">
            <button
              style={{ fontSize: "1vw" }}
              type="button"
              className="btn btn-outline-dark"
              onClick={() =>
                addToQueue({
                  id,
                  title,
                  artist,
                  coverImage,
                  album,
                  duration,
                  audioFile,
                  genre,
                  createdAt,
                  lyrics,
                })
              }
            >
              Add to queue <i className="fas fa-arrow-right ml-2"></i>
            </button>

            <DropdownButton
              variant="text-dark"
              id="dropdown-basic-button"
              title={
                <span style={{ marginTop: "10px", fontSize: "1vw" }}>
                  Add to Playlist
                </span>
              }
              className="ml-1"
              style={{ marginTop: "10px", fontSize: "1vw" }}
            >
              {Playlist.length === 0 && (
                <Dropdown.Item active={false}>{"No playlists"}</Dropdown.Item>
              )}
              {Playlist.map((plist: Playlist) => (
                <Dropdown.Item
                  onClick={() => {
                    addsongtoplaylist(plist._id, id);
                  }}
                >
                  {plist.name}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover_element;
