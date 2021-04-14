import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/UserContext";
import ErrorMessage from "../misc/ErrorMessage";

import "./AuthForm.scss";

const Register = () => {
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formPasswordVerify, setFormPasswordVerify] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const { getUser } = useContext(UserContext);

  const history = useHistory();

  const register = async (e) => {
    e.preventDefault();

    const registerData = {
      email: formEmail,
      password: formPassword,
      passwordVerify: formPasswordVerify,
    };
    try {
      await axios.post("http://localhost:5000/auth/", registerData);
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
      <h2>Register a new account</h2>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          clear={() => setErrorMessage(null)}
        />
      )}
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
        Already have an account? <Link to="/login"> Login instead</Link>
      </p>
    </div>
  );
};

export default Register;
