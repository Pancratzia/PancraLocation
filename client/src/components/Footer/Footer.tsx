import { Link } from "react-router-dom";
import "./Footer.scss";
import { useEffect, useState } from "react";

function Footer() {

  const [currentYear, setCurrentYear] = useState("");

  useEffect(() => {
    const year = new Date().getFullYear();
    setCurrentYear(year.toString()); 
  }, []);

  return (
    <div className="footer">
      <p className="pancratzia">
        Made By{" "}
        <Link className="link" to="https://github.com/Pancratzia">
          Pancratzia
        </Link>
      </p>

      <p className="copy">© {currentYear} - PancraLocation</p>
    </div>
  );
}

export default Footer;
