import React, { useContext, useEffect } from "react";
import QuoteList from "./QuoteList";
import OrderList from "./OrderList";
import ReceiptList from "./ReceiptList";
import { ApiContext } from "../context/ApiContext";
import "../styles.css";

const ProcureshipLayout = () => {
  const {
    setApiUrl,
    webService,
    setWebService,
    functionName,
    setFunctionName,
  } = useContext(ApiContext);

  useEffect(() => {
    let apiUrl_ = `${process.env.REACT_APP_DEFAULT_MICROSOFT_ENDPOINT}/${process.env.REACT_APP_COMPANY_ID}/${process.env.REACT_APP_ENVIRONMENT}/ODataV4/${webService}_${functionName}?company=${process.env.REACT_APP_COMPANY_NAME}`;
    setApiUrl(apiUrl_);
  }, [webService, functionName, setApiUrl]);

  const onWebServiceChange = (e) => {
    setWebService(e.target.value);
  };

  const onFunctionNameChange = (e) => {
    setFunctionName(e.target.value);
  };

  return (
    <div className="procureship-layout">
      <h2>Procureship Confirmation</h2>
      <div className="procureship-definitions">
        <form>
          <input
            type="text"
            value={webService}
            onChange={onWebServiceChange}
            placeholder="Input Web Service"
          />
          <input
            type="text"
            value={functionName}
            onChange={onFunctionNameChange}
            placeholder="Input Function Name"
          />
        </form>
      </div>
      <div className="card-container">
        <QuoteList />
        <OrderList />
        <ReceiptList />
      </div>
    </div>
  );
};

export default ProcureshipLayout;
