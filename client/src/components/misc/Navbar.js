import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

import "./Navbar.scss";

const Navbar = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="navbar">
      <Link to="/">
        <h1>Snippet manager</h1>
      </Link>
      {!user ? (
        <>
          <Link to="/login">Log in</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <button className="btn-logout">Log out</button>
      )}
    </div>
  );
};

export default Navbar;
