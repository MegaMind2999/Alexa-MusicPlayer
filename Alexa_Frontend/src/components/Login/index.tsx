import { FormEvent, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
export const LoginPage = () => {
  const [email, setemail] = useState<string>(""); // Password is a string
  const [password, setPassword] = useState<string>(""); // Password is a string
  const { login }: any = useAuth();
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would usually send a request to your backend to authenticate the user
    // For the sake of this example, we're using a mock authentication
    // Replace with actual authentication logic
    await login({ email: email, password: password });
  };
  const [user, _setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();
  if (user != null) {
    navigate("/app");
  }
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
                    <form onSubmit={handleLogin}>
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
                        Sign into your account
                      </h5>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="email"
                          id="form2Example17"
                          className="form-control form-control-lg"
                          value={email}
                          onChange={(e) => setemail(e.target.value)}
                        />
                        <label className="form-label" htmlFor="form2Example17">
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
                        />
                        <label className="form-label" htmlFor="form2Example27">
                          Password
                        </label>
                      </div>

                      <div className="pt-1 mb-4">
                        <button
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-dark btn-lg btn-block"
                          type="submit"
                        >
                          Login
                        </button>
                      </div>

                      <a className="small text-muted" href="#!">
                        Forgot password?
                      </a>
                      <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                        Don't have an account?{" "}
                        <a href="/signup" className="color: #393f81;">
                          Register here
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
