import React from "react";
import QuoteList from "./QuoteList";
import OrderList from "./OrderList";
import ReceiptList from "./ReceiptList";
import WebServiceDefinitions from "../api/WebServiceDefinitions";
import "../styles.css";

const ProcureshipLayout = () => {
  return (
    <div className="procureship-layout">
      <h2>Procureship Confirmation</h2>
      <WebServiceDefinitions />
      <div className="card-container">
        <QuoteList />
        <OrderList />
        <ReceiptList />
      </div>
    </div>
  );
};

export default ProcureshipLayout;
