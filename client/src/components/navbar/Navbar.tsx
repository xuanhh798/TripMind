import NavItems from "./NavItems";
import "./Navbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen); // This should toggle the state
  };

  return (
    <nav className="navbar">
      <div className="nav-item">
        <Link to="/">
          <ul>
            <a href="#">TripMind</a>
          </ul>
        </Link>
      </div>

      {/* Hamburger Icon */}
      <div className="hamburger nav-item" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Navigation Links */}
      <div className={`nav-links ${isOpen ? "active" : ""} nav-item`}>
        <NavItems />
      </div>
    </nav>
  );
}

export default Navbar;
