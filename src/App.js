import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProcereshipLayout from "./procureship-confirmation/ProcereshipLayout";
import { ApiProvider } from "./context/ApiContext";
import {
  HomePage,
  DynamicWebServiceTester,
  DynamicApiTester,
} from "./components";
import "./App.css";

const App = () => {
  return (
    <ApiProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/web-service" element={<DynamicWebServiceTester />} />
          <Route path="/api-page" element={<DynamicApiTester />} />
          <Route
            path="/procureship-confirmation"
            element={<ProcereshipLayout />}
          />
        </Routes>
        <Footer />
      </Router>
    </ApiProvider>
  );
};

export default App;

const Header = () => {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/");
  };

  return (
    <header className="header">
      <h1 onClick={goToHomePage} className="header-title">
        Fortune API Tester
      </h1>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Fortune API Tester</p>
    </footer>
  );
};
