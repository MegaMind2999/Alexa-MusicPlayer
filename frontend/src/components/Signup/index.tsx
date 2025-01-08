import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import API_ENDPOINTS from "../../config";
import axios from "axios";
export const SignupPage = () => {
  const [username, setUsername] = useState<string>(""); // Username is a string
  const [password, setPassword] = useState<string>(""); // Password is a string
  const [email, setemail] = useState<string>(""); // Password is a string
  const [image, setImage] = useState(null);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!username) {
      toast.error("User name is required", {
        position: "top-right",
        autoClose: 5000,
      });
    } else if (!password) {
      toast.error("password is required", {
        position: "top-right",
        autoClose: 5000,
      });
    } else if (!email) {
      toast.error("email is required", {
        position: "top-right",
        autoClose: 5000,
      });
    } else {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("profileimg", image ?? new Blob());

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${API_ENDPOINTS.GET_AUTH}/signup`,
        data: formData,
      };

      axios
        .request(config)
        .then(() => {
          toast.success("Successfully created the account go to sign in", {
            position: "top-right", // Use the string directly instead of accessing POSITION
            autoClose: 5000, // Duration in milliseconds
          });
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            // Check if the error has a response and if the status code is 400
            toast.error("Error: user is already exist please login.", {
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
    }
  };
  const handleImageChange = (e: any) => {
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      setImage(file); // Update state with the selected file
    }
  };
  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="/loginpic.png"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem", height: "100%" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleSubmit}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <FontAwesomeIcon icon={faMusic} size="3x" />
                        <span
                          className="h1 fw-bold mb-0"
                          style={{ marginLeft: "8px" }}
                        >
                          Alexa Music Player
                        </span>
                      </div>

                      <h5
                        className="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        Create your account
                      </h5>
                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="text"
                          id="form2Example17"
                          className="form-control form-control-lg"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="form2Example17">
                          Username
                        </label>
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="email"
                          id="form2Example18"
                          className="form-control form-control-lg"
                          value={email}
                          onChange={(e) => setemail(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="form2Example18">
                          Email address
                        </label>
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example27"
                          className="form-control form-control-lg"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="form2Example27">
                          Password
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="file"
                          id="form2Example18"
                          className="form-control form-control-lg"
                          accept="image/*" // Accept only image files
                          onChange={handleImageChange}
                          required // Marking the input as required
                        />
                        <label className="form-label" htmlFor="form2Example18">
                          Upload a Picture
                        </label>
                      </div>

                      <div className="pt-1 mb-4">
                        <button
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-dark btn-lg btn-block"
                          type="submit"
                        >
                          Sign up
                        </button>
                      </div>

                      <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                        Have an account?{" "}
                        <a href="/login" className="color: #393f81;">
                          Login here
                        </a>
                      </p>
                      <a href="#!" className="small text-muted">
                        Terms of use.
                      </a>
                      <a href="#!" className="small text-muted">
                        Privacy policy
                      </a>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
