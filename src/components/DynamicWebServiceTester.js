import React, { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import { useGetBCToken } from "../hooks/useGetBCToken";
import { ApiContext } from "../context/ApiContext";
import { ProgressSpinner } from "primereact/progressspinner";
import { useAutosizeTextArea } from "../utils";
import "../styles.css";

const DynamicWebServiceTester = () => {
  const {
    apiUrl,
    setApiUrl,
    webService,
    setWebService,
    functionName,
    setFunctionName,
    companyName,
    tenantId,
    environment,
    contentType,
  } = useContext(ApiContext);
  const getBCToken = useGetBCToken();

  const [parameterName, setParameterName] = useState("");
  const [postData, setPostData] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [responseMessageClass, setResponseMessageClass] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const textAreaRef = useRef(null);

  useAutosizeTextArea(textAreaRef.current, postData);

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
  }, [tenantId, environment, webService, functionName, companyName, setApiUrl]);

  const handleWebServiceChange = (e) => {
    setWebService(e.target.value);
    responseMessageClass === "response-failure" && setResponseMessage("");
  };

  const handleFunctionNameChange = (e) => {
    setFunctionName(e.target.value);
    responseMessageClass === "response-failure" && setResponseMessage("");
  };

  const handleParameterNameChange = (e) => {
    setParameterName(e.target.value);
    responseMessageClass === "response-failure" && setResponseMessage("");
  };

  const handlePostDataChange = (e) => {
    setPostData(e.target.value);
    responseMessageClass === "response-failure" && setResponseMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!apiUrl) {
      setResponseMessage("Cannot send request: missing required settings");
      setResponseMessageClass("response-failure");
      return;
    }
    try {
      setLoading(true);
      const token = await getBCToken();
      let parsedData = JSON.parse(postData);
      if (parameterName && parameterName.trim() !== "") {
        parsedData = { [parameterName]: JSON.stringify(parsedData) };
      }
      const response = await axios.post(apiUrl, parsedData, {
        headers: {
          "Content-Type": contentType,
          Authorization: `Bearer ${token}`,
        },
      });
      setResponseMessage(JSON.stringify(response.data, null, 2));
      setResponseMessageClass("response-success");
    } catch (error) {
      setResponseMessage(`Error: ${error.message}`);
      setResponseMessageClass("response-failure");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-card">
      <h2>Web Service Tester</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Web Service Name"
          value={webService}
          onChange={handleWebServiceChange}
          required
        />
        <input
          type="text"
          placeholder="Enter Function Name"
          value={functionName}
          onChange={handleFunctionNameChange}
          required
        />
        <input
          type="text"
          placeholder="Enter Parameter Name (optional)"
          value={parameterName}
          onChange={handleParameterNameChange}
        />
        <textarea
          placeholder="Enter POST data (JSON format)"
          value={postData}
          onChange={handlePostDataChange}
          ref={textAreaRef}
          required
        />
        <div className="form-buttons">
          <button type="submit" className="action-button">
            Send Request
          </button>
        </div>
        {errorMessage && (
          <div className="response-message response-failure">
            {errorMessage}
          </div>
        )}
        {apiUrl && <div className="api-url">{apiUrl}</div>}
        {loading && <ProgressSpinner />}
        {responseMessage && (
          <div className={`response-message ${responseMessageClass}`}>
            <h3>Response:</h3>
            <pre>{responseMessage}</pre>
          </div>
        )}
      </form>
    </div>
  );
};

export default DynamicWebServiceTester;
