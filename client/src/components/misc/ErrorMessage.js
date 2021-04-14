import React from "react";
import "./ErrorMessage.scss";

const ErrorMessage = ({ message, clear }) => {
  return (
    <div className="error-message">
      <p>{message}</p>
      <button onClick={clear}>Close</button>
    </div>
  );
};

export default ErrorMessage;
