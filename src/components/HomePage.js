import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to the API Tester</h1>
      <div className="choice-buttons">
        <Link to="/web-service" className="choice-button">
          Call a Web Service
        </Link>
        <Link to="/api-page" className="choice-button">
          Call an API Page
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
