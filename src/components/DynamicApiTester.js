import React, { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import GetBCToken from "../service/GetBCToken";
import { ApiContext } from "../context/ApiContext";
import { ProgressSpinner } from "primereact/progressspinner";
import { useAutosizeTextArea } from "../utils";
import "../styles.css";

const DynamicApiTester = () => {
  const { apiUrl, setApiUrl, group, setGroup, entity, setEntity } =
    useContext(ApiContext);

  const [filter, setFilter] = useState("");
  const [requestType, setRequestType] = useState("GET");
  const [postData, setPostData] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [responseMessageClass, setResponseMessageClass] = useState("");
  const [loading, setLoading] = useState(false);
  const textAreaRef = useRef(null);

  useAutosizeTextArea(textAreaRef.current, postData);

  useEffect(() => {
    let apiUrl_ = `${process.env.REACT_APP_DEFAULT_MICROSOFT_ENDPOINT}/${process.env.REACT_APP_TENANT_ID}/${process.env.REACT_APP_ENVIRONMENT}/api/${process.env.REACT_APP_DEFAULT_PUBLISHER}/${group}/v1.0/companies(${process.env.REACT_APP_COMPANY_ID})/${entity}`;

    if (filter && filter.trim() !== "") {
      apiUrl_ += `?$filter=${filter}`;
    }
    setApiUrl(apiUrl_);
  }, [group, entity, filter, setApiUrl]);

  const handleRequestTypeChange = (e) => {
    setRequestType(e.target.value);
    responseMessageClass === "response-failure" && setResponseMessage("");
  };

  const handleGroupChange = (e) => {
    setGroup(e.target.value);
    responseMessageClass === "response-failure" && setResponseMessage("");
  };

  const handleEntitySetChange = (e) => {
    setEntity(e.target.value);
    responseMessageClass === "response-failure" && setResponseMessage("");
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    responseMessageClass === "response-failure" && setResponseMessage("");
  };

  const handlePostDataChange = (e) => {
    setPostData(e.target.value);
    responseMessageClass === "response-failure" && setResponseMessage("");
  };

  const handleGetRequest = async () => {
    try {
      setLoading(true);
      const token = await GetBCToken();
      const url = apiUrl;

      const response = await axios.get(url, {
        headers: {
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

  const handlePostRequest = async () => {
    try {
      setLoading(true);
      const token = await GetBCToken();
      const url = apiUrl;

      const response = await axios.post(url, JSON.parse(postData), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setResponseMessage(JSON.stringify(response.data, null, 2));
      setResponseMessageClass("response-success");
    } catch (error) {
      console.error("POST request failed:", error);
      setResponseMessage(`Error: ${error.message}`);
      setResponseMessageClass("response-failure");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (requestType === "GET") {
      handleGetRequest();
    } else if (requestType === "POST") {
      handlePostRequest();
    }
  };

  return (
    <div className="page-card">
      <h2>API Tester</h2>

      <div className="request-type-toggle">
        <label>
          <input
            type="radio"
            value="GET"
            checked={requestType === "GET"}
            onChange={handleRequestTypeChange}
          />
          GET
        </label>
        <label>
          <input
            type="radio"
            value="POST"
            checked={requestType === "POST"}
            onChange={handleRequestTypeChange}
          />
          POST
        </label>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter API Group Name (e.g., sync/InspectorOffline)"
          value={group}
          onChange={handleGroupChange}
          required
        />

        <input
          type="text"
          placeholder="Enter Entity Set Name (e.g., findings/inspections)"
          value={entity}
          onChange={handleEntitySetChange}
          required
        />

        {requestType === "GET" && (
          <input
            type="text"
            placeholder="Enter filter (optional) E.g. code eq 'Code-1'"
            value={filter}
            onChange={handleFilterChange}
          />
        )}

        {requestType === "POST" && (
          <textarea
            placeholder="Enter POST data (JSON format)"
            value={postData}
            onChange={handlePostDataChange}
            required={requestType === "POST"}
            ref={textAreaRef}
          />
        )}

        <button type="submit" className="action-button">
          Send {requestType} Request
        </button>
      </form>

      {apiUrl && <div className="api-url">{apiUrl}</div>}
      {loading && <ProgressSpinner />}

      {responseMessage && (
        <div className={`response-message ${responseMessageClass}`}>
          <h3>Response:</h3>
          <pre>{responseMessage}</pre>
        </div>
      )}
    </div>
  );
};

export default DynamicApiTester;
