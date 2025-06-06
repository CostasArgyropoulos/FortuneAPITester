import React, { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import GetBCToken from "../service/GetBCToken";
import { ApiContext } from "../context/ApiContext";
import { ProgressSpinner } from "primereact/progressspinner";
import {
  useAutosizeTextArea,
  generateSampleData,
  convertObjectPropertiesToString,
} from "../utils";
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

  const generateSample = async () => {
    setPostData("");
    let url = `${process.env.REACT_APP_DEFAULT_MICROSOFT_ENDPOINT}/${process.env.REACT_APP_TENANT_ID}/${process.env.REACT_APP_ENVIRONMENT}/api/${process.env.REACT_APP_DEFAULT_PUBLISHER}/${group}/v1.0/$metadata#companies(${process.env.REACT_APP_COMPANY_ID})/${entity}`;

    try {
      setLoading(true);
      const token = await GetBCToken();
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const sampleData = generateSampleData(response.data);
      let index = entity;
      if (sampleData.entity !== undefined) index = entity;
      else if (sampleData[`query_${entity}`] !== undefined)
        index = `query_${entity}`;
      else if (sampleData[`query_${entity.slice(0, -1)}`] !== undefined)
        index = `query_${entity.slice(0, -1)}`;
      let filteredData = sampleData[index];
      if (filteredData) {
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
      } else throw Error(`Could not resolve entity name query_${index}`);
    } catch (er) {
      console.log(er);
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
