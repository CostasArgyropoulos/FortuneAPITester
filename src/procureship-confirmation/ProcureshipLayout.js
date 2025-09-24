import React, { useContext, useEffect, useState } from "react";
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
    tenantId,
    environment,
    companyName,
  } = useContext(ApiContext);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (
      !tenantId ||
      !environment ||
      !webService ||
      !functionName ||
      !companyName
    ) {
      setErrorMessage("Missing required settings to build Web Service URL");
      setApiUrl("");
      return;
    }
    setErrorMessage("");
    let apiUrl_ = `https://api.businesscentral.dynamics.com/v2.0/${tenantId}/${environment}/ODataV4/${webService}_${functionName}?company=${companyName}`;
    setApiUrl(apiUrl_);
  }, [tenantId, environment, companyName, webService, functionName, setApiUrl]);

  const onWebServiceChange = (e) => setWebService(e.target.value);
  const onFunctionNameChange = (e) => setFunctionName(e.target.value);

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
            required
          />
          <input
            type="text"
            value={functionName}
            onChange={onFunctionNameChange}
            placeholder="Input Function Name"
            required
          />
        </form>
        {errorMessage && (
          <div className="response-message response-failure">
            {errorMessage}
          </div>
        )}
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
