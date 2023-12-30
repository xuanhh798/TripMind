import "./Navbar.css";

export default function NavItems() {
  return (
    /* Navigation Links */
    <ul>
      {items.map((item) => (
        <a className="nav-links-item" href="#">
          {item}
        </a>
      ))}
    </ul>
  );
}

export const items = ["About", "Contact"];
