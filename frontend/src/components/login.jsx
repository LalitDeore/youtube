import React, { useState, useContext } from "react";
import Axios from "axios";
import "../components css/login.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/contextApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { setLoading } = useContext(Context);

  const handleLogin = (event) => {
    event.preventDefault();
    if (!email || !password) {
      alert("Please fill  both email and password.");
      return;
    }

    // Make a POST request to the backend
    Axios.post("http://localhost:3001/login", {
      email: email,
      password: password,
    })
      .then((response) => {
        console.log(response);
        setLoading(true);
        navigate("/");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        alert("Invalid email or password. Please try again.");
      });
  };

  return (
    <div className="sign-up">
      <div className="element">
        <form onSubmit={handleLogin}>
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
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
