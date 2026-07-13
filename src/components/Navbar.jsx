import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";

const navItems = [
  { label: "HOME", path: "/" },
  { label: "MYPALETTE", path: "/mypalette", hasSubmenu: true },
  { label: "PIECES OF ME", path: "/pieces-of-me" },
  { label: "PALETTE LOG", path: "/palette-log" },
];

function Navbar({ colorGroups = [] }) {
  const location = useLocation();
  const isMyPalettePage = location.pathname.startsWith("/mypalette");

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-menu">
          {navItems.map((item, index) => (
            <div
              className={`navbar-item-wrap ${
                item.hasSubmenu ? "has-submenu" : ""
              } ${item.hasSubmenu && isMyPalettePage ? "submenu-open" : ""}`}
              key={item.label}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  item.path !== "#" && isActive
                    ? "navbar-link active"
                    : "navbar-link"
                }
              >
                <span className="navbar-link-text">{item.label}</span>
              </NavLink>

              {item.hasSubmenu && (
                <div className="navbar-submenu">
                  {colorGroups.map((group) => (
                    <NavLink
                      key={group.id}
                      to={`/mypalette/${group.id}`}
                      className={({ isActive }) =>
                        isActive
                          ? "navbar-submenu-link active"
                          : "navbar-submenu-link"
                      }
                    >
                      <span className="navbar-submenu-link-text">
                        {group.groupName.toUpperCase()}
                      </span>
                    </NavLink>
                  ))}
                </div>
              )}

              {index < navItems.length - 1 && (
                <span className="navbar-divider">/</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
