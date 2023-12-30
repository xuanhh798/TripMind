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
          <a href="#">
            <span
              className="text-primary text-xl font-normal
             mb-0.5"
            >
              TripMind
            </span>
          </a>
        </Link>
      </div>

      <div className="flex">
        <div className="flex items-center space-x-1 sm:space-x-2 mx-3 sm:mx-4">
          {/* Hamburger Icon */}
          <div className="hamburger nav-item" onClick={toggleMenu}>
            <div></div>
            <div></div>
            <div></div>
          </div>

          {/* Navigation Links */}
          <div className={`nav-links ${isOpen ? "active" : ""} nav-item`}>
            <a
              href="/about"
              className="duration-500 text-muted-foreground hover:text-primary transition-colors text-sm flex flex-row items-center p-2"
            >
              About
            </a>
            <a
              href="/contact"
              className="duration-500 text-muted-foreground hover:text-primary transition-colors text-sm flex flex-row items-center p-2"
            >
              Contact
            </a>
            <a
              href="/page"
              className="duration-500 text-muted-foreground hover:text-primary transition-colors text-sm flex flex-row items-center p-2"
            >
              Article
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
