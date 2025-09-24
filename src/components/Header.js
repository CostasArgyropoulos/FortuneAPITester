import React from "react";
import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../styles.css";

const Header = () => {
  const navigate = useNavigate();

  // const items = [
  //   {
  //     label: "ProcureShip Confirmation",
  //     command: () => {
  //       navigate("/procureship-confirmation");
  //     },
  //   },
  // ];

  const start = (
    <div className="logo-frame" onClick={() => navigate("/")}>
      <img src="/frtn-logo-black.png" alt="Logo" className="header-logo" />
    </div>
  );

  return (
    <div className="header-container">
      {/* <Menubar start={start} model={items}/> */}
      <Menubar start={start} />
    </div>
  );
};

export default Header;
