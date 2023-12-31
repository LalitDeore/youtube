import React, { useState, useContext } from "react";
import Axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Context } from "../context/contextApi";
import "../components css/signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [surname, setSurname] = useState("");
  const [mobileNO, setMobileNO] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setIsLogIn } = useContext(Context);

  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const navigate = useNavigate();

  const handleSignup = (event) => {
    event.preventDefault();
    // Validate the input fields (optional, you can do more validation here)
    if (!name || !email || !password) {
      alert("Please fill in all required fields.");
      return;
    }

    // Make a POST request to the backend
    Axios.post("https://youtube-backend-b65q.onrender.com/signup", {
      name: name,
      middlename: middleName,
      surname: surname,
      email: email,
      mobile: mobileNO,
      password: password,
    })
      .then((response) => {
        console.log(response);
        setIsLogIn(true);
        alert("Signup successful");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to sign up. Please try again.");
      });
  };

  const loginHandler = () => {
    navigate("/login");
  };

  return (
    <>
      {isLoginPage ? (
        <div className="login-button-container">
          <button className="login-button" onClick={loginHandler}>
            Click Here to Login
          </button>
        </div>
      ) : (
        <div className="sign-up">
          <div className="element">
            <form onSubmit={handleSignup}>
              <div className="registration-detail">
                {/* <h1 className="title">Sign UP for New User</h1>
                <br></br> */}
                <input
                  className="detail"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                <span className="field-name">Name</span>
              </div>
              <div className="registration-detail">
                <input
                  className="detail"
                  placeholder="Enter Your Middle Name"
                  value={middleName}
                  onChange={(event) => setMiddleName(event.target.value)}
                />
                <span className="field-name">Middle Name</span>
              </div>
              <div className="registration-detail">
                <input
                  className="detail"
                  placeholder="Enter Your Surname"
                  value={surname}
                  onChange={(event) => setSurname(event.target.value)}
                />
                <span className="field-name">Surname</span>
              </div>
              <div className="registration-detail">
                <input
                  className="detail"
                  placeholder="Enter Your Mobile NO."
                  value={mobileNO}
                  onChange={(event) => setMobileNO(event.target.value)}
                />
                <span className="field-name">Mobile No.</span>
              </div>
              <div className="registration-detail">
                <input
                  className="detail"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <span className="field-name">Email</span>
              </div>
              <div className="registration-detail">
                <input
                  className="detail"
                  placeholder="Enter Your Password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <span className="field-name">Password</span>
              </div>
              <div className="registration-btn">
                <button className="signup-btn" type="submit">
                  Signup
                </button>

                <span>
                  Already Signed Up{" "}
                  <button className="login-btn" onClick={loginHandler}>
                    Click Here
                  </button>{" "}
                  to login
                </span>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
