import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./AuthForm.scss";

const Register = () => {
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formPasswordVerify, setFormPasswordVerify] = useState("");

  const register = async (e) => {
    e.preventDefault();

    const registerData = {
      email: formEmail,
      password: formPassword,
      passwordVerify: formPasswordVerify,
    };

    await axios.post("http://localhost:5000/auth/", registerData);
  };

  return (
    <div className="auth-form">
      <h2>Register a new account</h2>
      <form className="form" onSubmit={register}>
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

        <label htmlFor="form-password-verify">Password</label>
        <input
          id="form-password-verify"
          type="password"
          value={formPasswordVerify}
          onChange={(e) => setFormPasswordVerify(e.target.value)}
        />

        <button className="btn-submit" type="submit">
          Register
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login instead</Link>
      </p>
    </div>
  );
};

export default Register;
