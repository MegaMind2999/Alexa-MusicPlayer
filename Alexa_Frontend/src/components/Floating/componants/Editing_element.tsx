const Editing_element = ({ song, removesong }: any) => {
  return (
    <div className="card mb-3 rounded draggable" style={{ maxHeight: "200px" }}>
      <div className="row g-0">
        <div className="col-md-11">
          <h4 className="truncated-title" style={{ fontSize: "1.3vw" }}>
            {song.title}
          </h4>
        </div>

        <div className="col-md-1 d-flex justify-content-center align-items-center">
          <button
            type="button"
            className="btn-close btn-close-black"
            aria-label="Close"
            onClick={() => {
              removesong(song._id);
            }}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Editing_element;
