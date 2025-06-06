import React, { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import GetBCToken from "../service/GetBCToken";
import { ApiContext } from "../context/ApiContext";
import { ProgressSpinner } from "primereact/progressspinner";
import { useAutosizeTextArea, convertObjectPropertiesToString } from "../utils";
import "../styles.css";

const DynamicWebServiceTester = () => {
  const {
    apiUrl,
    setApiUrl,
    webService,
    setWebService,
    functionName,
    setFunctionName,
  } = useContext(ApiContext);
  const [postData, setPostData] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [responseMessageClass, setResponseMessageClass] = useState("");
  const [loading, setLoading] = useState(false);
  const textAreaRef = useRef(null);

  useAutosizeTextArea(textAreaRef.current, postData);

  useEffect(() => {
    let apiUrl_ = `${process.env.REACT_APP_DEFAULT_MICROSOFT_ENDPOINT}/${process.env.REACT_APP_TENANT_ID}/${process.env.REACT_APP_ENVIRONMENT}/ODataV4/${webService}_${functionName}?company=${process.env.REACT_APP_COMPANY_NAME}`;
    setApiUrl(apiUrl_);
  }, [webService, functionName, setApiUrl]);

  const handleWebServiceChange = (e) => {
    setWebService(e.target.value);
    responseMessageClass === "response-failure" && setResponseMessage("");
  };

  const handleFunctionNameChange = (e) => {
    setFunctionName(e.target.value);
    responseMessageClass === "response-failure" && setResponseMessage("");
  };

  const handlePostDataChange = (e) => {
    setPostData(e.target.value);
    responseMessageClass === "response-failure" && setResponseMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = await GetBCToken();
      const url = apiUrl;

      const data = convertObjectPropertiesToString(JSON.parse(postData));

      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setResponseMessage(JSON.stringify(response.data, null, 2));
      setResponseMessageClass("response-success");
    } catch (error) {
      console.error("GET request failed:", error);
      setResponseMessage(`Error: ${error.message}`);
      setResponseMessageClass("response-failure");
    } finally {
      setLoading(false);
    }
  };

  const generateSample = async () => {
    setResponseMessage("Error: Not implemented");
    setResponseMessageClass("response-failure");
    // setPostData("");
    // let url = `${process.env.REACT_APP_DEFAULT_MICROSOFT_ENDPOINT}/${process.env.REACT_APP_TENANT_ID}/${process.env.REACT_APP_ENVIRONMENT}/ODataV4/${webService}_${functionName}?company=${process.env.REACT_APP_COMPANY_NAME}?$expand`;
    // try {
    //   setLoading(true);
    //   const token = await GetBCToken();
    //   const response = await axios.get(url, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });

    //   const sampleData = generateSampleData(response.data);
    //   let index = entity;
    //   if (sampleData.entity !== undefined) index = entity;
    //   else if (sampleData[`query_${entity}`] !== undefined)
    //     index = `query_${entity}`;
    //   else if (sampleData[`query_${entity.slice(0, -1)}`] !== undefined)
    //     index = `query_${entity.slice(0, -1)}`;
    //   let filteredData = sampleData[index];
    //   if (filteredData) {
    //     Object.keys(filteredData).forEach((key) => {
    //       if (
    //         key.startsWith("ignore") ||
    //         key.startsWith("meta") ||
    //         key === "auxiliaryIndex1"
    //       ) {
    //         delete filteredData[key];
    //       }
    //     });
    //     setPostData(JSON.stringify(filteredData, null, 2));
    //   } else throw Error(`Could not resolve entity name query_${index}`);
    // } catch (er) {
    //   console.error(er);
    //   setResponseMessage(`Error: ${er.message}`);
    //   setResponseMessageClass("response-failure");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="page-card">
      <h2>Web Service Tester</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Web Service Name ('Service Name' in 'Web Services' Page of Business Central)"
          value={webService}
          onChange={handleWebServiceChange}
          required
        />

        <input
          type="text"
          placeholder="Enter the Function Name (as defined in the Web Service codeunit)"
          value={functionName}
          onChange={handleFunctionNameChange}
          required
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
          <button
            type="button"
            className="action-button"
            onClick={generateSample}
          >
            Generate Sample
          </button>
        </div>

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
