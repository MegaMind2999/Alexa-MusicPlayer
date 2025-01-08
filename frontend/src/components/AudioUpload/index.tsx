import { useRef, useState } from "react";
import axios, { AxiosProgressEvent } from "axios";
import { toast } from "react-toastify";
import API_ENDPOINTS from "../../config";
import { useNavigate } from "react-router-dom";

// Path to your default cover image

const AudioUpload = () => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null); // State for audio file
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Create a typed ref for the file input
  const handleFileChange = (event: any) => {
    setAudioFile(event.target.files[0]); // Get the selected file
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault(); // Prevent the default form submission

    if (!audioFile) {
      toast.warning("Please select an audio file to upload.", {
        position: "top-right", // Use the string directly instead of accessing POSITION
        autoClose: 5000, // Duration in milliseconds
      });
      return;
    }

    const formData = new FormData();
    formData.append("audioFile", audioFile); // Append the audio file to form data
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${API_ENDPOINTS.GET_SONGS}/uploadsong`,
      data: formData,
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted); // Update the progress
        }
      },
    };
    toast.warning("Uploading started.", {
      position: "top-right", // Use the string directly instead of accessing POSITION
      autoClose: 5000, // Duration in milliseconds
    });
    setIsDisabled(true);
    axios
      .request(config)
      .then(() => {
        toast.success(`Uploaded the song successfully`, {
          position: "top-right",
          autoClose: 5000,
        });
        setUploadProgress(0);
        setAudioFile(null); // Clear the audio file state
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Reset the input field
        }
        setIsDisabled(false);
      })
      .catch((error) => {
        setIsDisabled(false);
        console.log(error);
        if (error.response && error.response.status === 500) {
          // Check if the error has a response and if the status code is 400
          toast.error("Error: in the uploaded file make sure its valid", {
            position: "top-right",
            autoClose: 5000,
          });
        } else {
          toast.error("An unexpected error occurred.", {
            position: "top-right",
            autoClose: 5000,
          });
        }
      });
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100 justify-content-between align-items-center flex-wrap">
        <button
          type="button"
          className="button-19"
          onClick={() => navigate("/app")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-return-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5"
            ></path>
          </svg>
          Return home
        </button>

        <div
          className="p-2 d-flex flex-wrap"
          style={{ justifyContent: "center" }}
        >
          <img
            src="/Monkey.gif"
            alt="Description of GIF"
            style={{ borderRadius: "15px", display: "block" }}
          />
        </div>
        <div
          className="p-2  d-flex flex-wrap"
          style={{ justifyContent: "center" }}
        >
          <p className="h2" style={{ fontFamily: "Georgia, serif" }}>
            Upload a music file that you only enjoy
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="formFileLg" className="form-label">
            Select file to upload
          </label>
          <input
            className="form-control form-control-lg"
            id="formFileLg"
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            ref={fileInputRef}
          ></input>
          {uploadProgress > 0 && (
            <div className="progress my-3">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${uploadProgress}%` }}
                aria-valuenow={uploadProgress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                {uploadProgress}%
              </div>
            </div>
          )}

          <div
            className="p-2 d-flex flex-wrap"
            style={{ justifyContent: "center" }}
          >
            <button type="submit" className="button-49" disabled={isDisabled}>
              UPLOAD
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AudioUpload;
