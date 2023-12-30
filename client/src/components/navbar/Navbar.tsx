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
    <nav className="flex items-center justify-between py-3 px-4 sm:px-8 border-b sticky top-0 bg-background h-16 z-50">
      <div className="flex items-center space-x-1.5">
        <Link to="/">
          <a href="#">TripMind</a>
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
