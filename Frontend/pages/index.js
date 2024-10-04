import Layout from "../components/Layout/Layout";
import Link from "next/link";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../config/firebaseConfig";
import React, { useState } from "react";
import { useRouter } from "next/router"; // Import useRouter

const auth = getAuth(app);

const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+_[a-zA-Z0-9]+[a-zA-Z0-9]*@dtu\.ac\.in$/;
  return emailRegex.test(email);
};

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const router = useRouter(); // Initialize useRouter

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Validate email
    if (!isValidEmail(email)) {
      setError("Invalid email format. Please use your college email ID.");
      return;
    }

    setError(""); // Clear any previous errors
    setIsLoading(true); // Show loading indicator

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Login successful, proceed to redirect to homepage
        alert("Login successful");
        router.push("/index-3"); // Redirect to homepage
      })
      .catch((error) => {
        // Handle login errors
        setError(`Error: ${error.message}`);
      })
      .finally(() => {
        // Hide loading indicator
        setIsLoading(false);
      });
  };

  return (
    <>
      <Layout hideHeader={true}>
        <section className="pt-100 login-register">
          <div className="container">
            <div className="row login-register-cover">
              <div className="col-lg-4 col-md-6 col-sm-12 mx-auto beautify">
                <div
                  className="text"
                  style={{ textAlign: "center", marginTop: "50px" }}
                >
                  <h2 className="mt-10 mb-5 text-brand-1">Welcome Back!👋</h2>
                  <p className="font-sm text-muted mb-30">
                    Login to access your account
                  </p>
                </div>
                <form
                  className="login-register text-start"
                  onSubmit={handleLogin}
                >
                  {error && <p className="text-danger">{error}</p>}
                  <div className="form-group" style={{ position: "relative" }}>
                    <i
                      className="fas fa-envelope"
                      style={{
                        position: "absolute",
                        left: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#888",
                      }}
                    ></i>
                    <input
                      className="form-control"
                      id="input-1"
                      type="email"
                      required
                      name="email"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      style={{
                        backgroundColor: "#f1f1f1",
                        border: "none",
                        paddingLeft: "50px",
                      }}
                    />
                  </div>
                  <div className="form-group" style={{ position: "relative" }}>
                    <i
                      className="fas fa-lock"
                      style={{
                        position: "absolute",
                        left: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#888",
                      }}
                    ></i>
                    <input
                      className="form-control"
                      id="input-4"
                      type="password"
                      required
                      name="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      style={{
                        backgroundColor: "#f1f1f1",
                        border: "none",
                        paddingLeft: "50px",
                      }}
                    />
                  </div>
                  <div className="login_footer form-group d-flex justify-content-between">
                    {/* You can add "Remember me" checkbox and "Forgot Password" link here */}
                  </div>
                  <div className="form-group">
                    <button
                      className="btn btn-brand-1 hover-up w-100"
                      type="submit"
                      disabled={isLoading} // Disable button when loading
                      style={{
                        backgroundColor: "#00b33c",
                        color: "#fff",
                        border: "none",
                        padding: "10px",
                      }}
                    >
                      {isLoading ? "Logging in..." : "Log in"}{" "}
                      {/* Display loading text when loading */}
                    </button>
                  </div>
                  <div
                    className="text-muted text"
                    style={{ textAlign: "center" }}
                  >
                    <span>or</span>
                  </div>
                  <div className="text" style={{ textAlign: "center" }}>
                    <span
                      style={{
                        fontSize: "15px",
                        marginTop: "20px",
                        fontWeight: "600",
                      }}
                    >
                      Sign Up as
                    </span>
                  </div>
                  <div
                    className="form-group d-flex justify-content-center mt-3"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "1rem",
                    }}
                  >
                 <Link href="/page-register">
  <div
    className="btn btn-outline-secondary mx-2"
    style={{
      borderRadius: "5px",
      padding: "12px 65px",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      backgroundColor: "#3C65F5",
      color: "white",
      border: "none",
      cursor: "pointer",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3C65F5")}
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#3C65F5")}
  >
    <span>
      <i
        className="fas fa-user"
        style={{ marginLeft: "30px", color: "white" }}
      ></i>
      Student
    </span>
  </div>
</Link>

<Link href="/faculty-register">
  <div
    className="btn btn-outline-secondary mx-2"
    style={{
      borderRadius: "5px",
      padding: "12px 65px",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      backgroundColor: "#3C65F5",
      color: "white",
      border: "none",
      cursor: "pointer",
    }}
  >
    <span>
      <i
        className="fas fa-user-tie"
        style={{ marginLeft: "230px", color: "white" }}
      ></i>
      Faculty
    </span>
  </div>
</Link>

                  </div>
                </form>
              </div>
              <div className="img-1 d-none d-lg-block">
                <img
                  className="shape-1"
                  src="assets/imgs/page/login-register/img-4.svg"
                  alt="JobBox"
                />
              </div>
              <div className="img-2">
                <img
                  src="assets/imgs/page/login-register/img-3.svg"
                  alt="JobBox"
                />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

