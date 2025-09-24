import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header-container" onClick={() => navigate("/")}>
      <div className="logo-frame">
        <img
          src="/frtn-logo-black.png"
          alt="Fortune Logo"
          className="header-logo"
        />
      </div>
      <h1 className="header-title">Fortune API Tester</h1>
    </header>
  );
};

export default Header;
