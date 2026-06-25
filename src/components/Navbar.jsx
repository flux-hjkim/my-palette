import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Your Color Palette</Link>
      <Link to="/mypalette">My Palette</Link>
    </nav>
  );
}

export default Navbar;
