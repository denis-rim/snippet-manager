import { Link } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => (
  <div className="navbar">
    <Link to="/">
      <h1>Snippet manager</h1>
    </Link>
    <Link to="/login">Log in</Link>
    <Link to="/register">Register</Link>
  </div>
);

export default Navbar;
