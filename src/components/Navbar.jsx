import { NavLink } from "react-router-dom";
import "./Navbar.css";

const navItems = [
  { label: "HOME", path: "/" },
  { label: "MYPALETTE", path: "/mypalette" },
  { label: "PIECES OF ME", path: "#" },
  { label: "PALETTE LOG", path: "#" },
];

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-menu">
        {navItems.map((item, index) => (
          <div className="navbar-item-wrap" key={item.label}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                item.path !== "#" && isActive
                  ? "navbar-link active"
                  : "navbar-link"
              }
            >
              {item.label}
            </NavLink>

            {index < navItems.length - 1 && (
              <span className="navbar-divider">/</span>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
