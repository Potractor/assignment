import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import Alert from "../components/Alert";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ message: "" });
  const clickHandler = async (e) => {
    e.preventDefault();
    try {
      const payload = { username, password };
      const resp = await axios.post(
        "https://fakestoreapi.com/auth/login",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (resp.status === 200 || resp.status === 201) {
        const accessToken = resp.data.token;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("expiration", (Date.now() + 100000).toString());
        window.location.href = "/";
      }
    } catch (e) {
      setAlert({ ...alert, message: "Please enter valid credentials" });
    }
  };
  return (
    <form onSubmit={clickHandler} className="login-form">
      <div className="login-title">Login form</div>
      <div className="inputs">
        <label>Username: </label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password: </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div></div>
        <div className="submit-button">
          <button>Submit</button>
        </div>
      </div>
      {alert?.message && <Alert {...alert} />}
    </form>
  );
};

export default Login;
