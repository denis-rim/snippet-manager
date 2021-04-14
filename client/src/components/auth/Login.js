import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// import "AuthForm.scss";

const Login = () => {
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    const loginData = {
      email: formEmail,
      password: formPassword,
    };

    await axios.post("http://localhost:5000/auth/login/", loginData);
  };

  return (
    <div className="auth-form">
      <h2>Log in</h2>
      <form className="form" onSubmit={login}>
        <label htmlFor="form-email">Email</label>
        <input
          id="form-email"
          type="email"
          value={formEmail}
          onChange={(e) => setFormEmail(e.target.value)}
        />

        <label htmlFor="form-password">Password</label>
        <input
          id="form-password"
          type="password"
          value={formPassword}
          onChange={(e) => setFormPassword(e.target.value)}
        />

        <button className="btn-submit" type="submit">
          Log in{" "}
        </button>
      </form>
      <p>
        Don't have an account yet?
        <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
