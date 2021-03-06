import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

import "./Navbar.scss";
import axios from "axios";

const Navbar = () => {
  const { user, getUser } = useContext(UserContext);

  const logOut = async () => {
    await axios.get("http://localhost:5000/auth/logout");

    await getUser();
  };

  return (
    <div className="navbar">
      <Link to="/">
        <h1>Snippet manager</h1>
      </Link>
      {user === null ? (
        <>
          <Link to="/login">Log in</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        user && (
          <button onClick={logOut} className="btn-logout">
            Log out
          </button>
        )
      )}
    </div>
  );
};

export default Navbar;
