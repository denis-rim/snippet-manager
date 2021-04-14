import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/UserContext";

import "./AuthForm.scss";
import ErrorMessage from "../misc/ErrorMessage";

const Login = () => {
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const { getUser } = useContext(UserContext);

  const history = useHistory();

  const login = async (e) => {
    e.preventDefault();

    const loginData = {
      email: formEmail,
      password: formPassword,
    };
    try {
      await axios.post("http://localhost:5000/auth/login/", loginData);
    } catch (error) {
      if (error.response.data.errorMessage) {
        setErrorMessage(error.response.data.errorMessage);
      }
      return;
    }

    await getUser();
    history.push("/");
  };

  return (
    <div className="auth-form">
      <h2>Log in</h2>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          clear={() => setErrorMessage(null)}
        />
      )}
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
        <Link to="/register"> Register here</Link>
      </p>
    </div>
  );
};

export default Login;
