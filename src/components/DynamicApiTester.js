import React, { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import { ApiContext } from "../context/ApiContext";
import { ProgressSpinner } from "primereact/progressspinner";
import { useGetBCToken } from "../hooks/useGetBCToken";
import {
  useAutosizeTextArea,
  generateSampleData,
  convertObjectPropertiesToString,
} from "../utils";
import "../styles.css";

const DynamicApiTester = () => {
  const {
    apiUrl,
    setApiUrl,
    tenantId,
    environment,
    publisher,
    group,
    setGroup,
    entity,
    setEntity,
    companyId,
  } = useContext(ApiContext);
  const getBCToken = useGetBCToken();

  const [filter, setFilter] = useState("");
  const [requestType, setRequestType] = useState("GET");
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
      !publisher ||
      !group ||
      !companyId ||
      !entity
    ) {
      setErrorMessage("Missing required settings to build API URL");
      setApiUrl("");
      return;
    }
    setErrorMessage("");
    let apiUrl_ = `https://api.businesscentral.dynamics.com/v2.0/${tenantId}/${environment}/api/${publisher}/${group}/v1.0/companies(${companyId})/${entity}`;
    if (filter && filter.trim() !== "") {
      apiUrl_ += `?$filter=${encodeURIComponent(filter.trim())}`;
    }
    setApiUrl(apiUrl_);
  }, [
    tenantId,
    environment,
    publisher,
    group,
    companyId,
    entity,
    filter,
    setApiUrl,
  ]);

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
    if (!apiUrl) {
      setResponseMessage("Cannot send GET request: missing required settings");
      setResponseMessageClass("response-failure");
      return;
    }
    try {
      setLoading(true);
      const token = await getBCToken();
      const response = await axios.get(apiUrl, {
        headers: { Authorization: `Bearer ${token}` },
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

  const handlePostRequest = async () => {
    if (!apiUrl) {
      setResponseMessage("Cannot send POST request: missing required settings");
      setResponseMessageClass("response-failure");
      return;
    }
    try {
      setLoading(true);
      const token = await getBCToken();
      const data = convertObjectPropertiesToString(JSON.parse(postData));
      const response = await axios.post(apiUrl, data, {
        headers: {
          "Content-Type": "application/json",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (requestType === "GET") {
      handleGetRequest();
    } else if (requestType === "POST") {
      handlePostRequest();
    }
  };

  const generateSample = async () => {
    if (
      !tenantId ||
      !environment ||
      !publisher ||
      !group ||
      !companyId ||
      !entity
    ) {
      setResponseMessage("Cannot generate sample: missing required settings");
      setResponseMessageClass("response-failure");
      return;
    }
    let url = `https://api.businesscentral.dynamics.com/v2.0/${tenantId}/${environment}/api/${publisher}/${group}/v1.0/$metadata#companies(${companyId})/${entity}`;
    try {
      setLoading(true);
      const token = await getBCToken();
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const sampleData = generateSampleData(response.data);
      let indexKey = Object.keys(sampleData).find(
        (k) => k.toLowerCase() === entity.toLowerCase()
      );
      if (!indexKey) {
        const singular = entity.endsWith("s") ? entity.slice(0, -1) : entity;
        indexKey = Object.keys(sampleData).find(
          (k) => k.toLowerCase() === singular.toLowerCase()
        );
      }
      if (!indexKey && Object.keys(sampleData).length > 0) {
        indexKey = Object.keys(sampleData)[0];
      }
      if (!indexKey)
        throw new Error(
          `Could not resolve entity name. Available keys: ${Object.keys(
            sampleData
          )}`
        );
      let filteredData = { ...sampleData[indexKey] };
      Object.keys(filteredData).forEach((key) => {
        if (
          key.startsWith("ignore") ||
          key.startsWith("meta") ||
          key === "auxiliaryIndex1"
        ) {
          delete filteredData[key];
        }
      });
      setPostData(JSON.stringify(filteredData, null, 2));
      setResponseMessage("");
    } catch (er) {
      setResponseMessage(`Error: ${er.message}`);
      setResponseMessageClass("response-failure");
    } finally {
      setLoading(false);
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
          placeholder="Enter API Group Name"
          value={group}
          onChange={handleGroupChange}
          required
        />
        <input
          type="text"
          placeholder="Enter Entity Set Name"
          value={entity}
          onChange={handleEntitySetChange}
          required
        />

        {requestType === "GET" && (
          <input
            type="text"
            placeholder="Enter filter (optional)"
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

        <div className="form-buttons">
          <button type="submit" className="action-button">
            Send {requestType} Request
          </button>
          {requestType === "POST" && (
            <button
              type="button"
              className="action-button"
              onClick={generateSample}
            >
              Generate Sample
            </button>
          )}
        </div>
      </form>

      {errorMessage && (
        <div className="response-message response-failure">{errorMessage}</div>
      )}
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
