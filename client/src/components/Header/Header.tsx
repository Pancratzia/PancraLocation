import { Link, useLocation } from "react-router-dom";
import "./Header.scss";

function Header() {
  const location = useLocation();

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
              <Link className={`link ${location.pathname === '/' ? 'isActive' : ''}`} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className={`link ${location.pathname === '/config' ? 'isActive' : ''}`} to="/config">
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
