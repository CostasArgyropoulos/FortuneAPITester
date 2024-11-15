import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProcureshipLayout from "./procureship-confirmation/ProcureshipLayout";
import { ApiProvider } from "./context/ApiContext";
import {
  Header,
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
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/web-service" element={<DynamicWebServiceTester />} />
            <Route path="/api-page" element={<DynamicApiTester />} />
            <Route
              path="/procureship-confirmation"
              element={<ProcureshipLayout />}
            />
          </Routes>
        </div>
        <Footer />
      </Router>
    </ApiProvider>
  );
};

export default App;

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Fortune API Tester</p>
    </footer>
  );
};
