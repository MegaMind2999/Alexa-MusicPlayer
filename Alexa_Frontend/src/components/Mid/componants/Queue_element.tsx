import API_ENDPOINTS from "../../../config";

const Queue_element = ({
  title,
  coverImage,
  duration,
  index,
  queue,
  removeFromQueue,
}: any) => {
  return (
    <div className="card mb-3 rounded" style={{ maxHeight: "100px" }}>
      <div className="row g-0" style={{ paddingBottom: "4px" }}>
        <div className="col-md-2 d-flex justify-content-center align-items-center">
          <img
            src={`${API_ENDPOINTS.GET_UPLOADS}/${coverImage}`}
            className="img-fluid rounded-circle border border-primary"
            alt={title}
            style={{
              height: "100%",
              padding: "6px",
              marginTop: "4px",
              marginLeft: "5px",
            }}
          />
        </div>

        <div className="col-md-8">
          <div className="card-body">
            <p className="truncated-title" style={{ fontSize: "1vw" }}>
              {title}
            </p>
            <p className="card-text">
              <small className="truncated-title" style={{ fontSize: ".8vw" }}>
                {duration}
              </small>
            </p>
          </div>
        </div>
        <div className="col-md-2 d-flex justify-content-center align-items-center">
          <button
            type="button"
            className="btn-close btn-close-black"
            aria-label="Close"
            onClick={() => removeFromQueue(queue, index)}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Queue_element;
