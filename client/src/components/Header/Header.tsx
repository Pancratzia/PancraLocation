import { Link } from "react-router-dom";
import "./Header.scss";

function Header() {
  return (
    <div className="header">
      <div className="site-name">
        <h1>
          <Link className="link" to="/">
            Pancra<span>Location</span>
          </Link>
        </h1>
        <p>
          by{" "}
          <Link className="link" to="https://github.com/Pancratzia">
            Pancratzia
          </Link>
        </p>
      </div>
      <div className="container">
        <div className="nav">
          <ul className="links">
            <li>
              <Link className="link" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="link" to="/config">
                Configuration
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
