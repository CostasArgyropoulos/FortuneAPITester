import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ApiContext } from "../context/ApiContext";
import "../styles.css";

const HomePage = () => {
  const {
    group,
    setGroup,
    entity,
    setEntity,
    webService,
    setWebService,
    functionName,
    setFunctionName,
    tenantId,
    setTenantId,
    companyId,
    setCompanyId,
    environment,
    setEnvironment,
    companyName,
    setCompanyName,
    publisher,
    setPublisher,
    clientCredentials,
    setClientCredentials,
    contentType,
    setContentType,
  } = useContext(ApiContext);

  const clearEnvironment = () => {
    setGroup("");
    setEntity("");
    setWebService("");
    setFunctionName("");
  };

  const clearBCSettings = () => {
    setTenantId("");
    setCompanyId("");
    setEnvironment("");
    setCompanyName("");
    setPublisher("");
  };

  const clearOAuthSettings = () => {
    setClientCredentials({ clientId: "", clientSecret: "" });
  };

  return (
    <div className="home-page">
      <div className="choice-buttons-section">
        <div className="choice-buttons-banner">Start Testing</div>
        <div className="choice-buttons">
          <Link to="/web-service" className="choice-button">
            Call a Web Service
          </Link>
          <Link to="/api-page" className="choice-button">
            Call an API Page
          </Link>
        </div>
        <small className="choice-buttons-note">
          <strong>
            Make sure to Configure Business Central and OAuth server settings
            first
          </strong>
        </small>
      </div>

      <div className="forms-container page-card">
        <div className="form-block">
          <h2>Environment Settings</h2>
          <label>
            API Group Name
            <input
              type="text"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            />
          </label>
          <label>
            Entity Set Name
            <input
              type="text"
              value={entity}
              onChange={(e) => setEntity(e.target.value)}
            />
          </label>
          <label>
            Web Service
            <input
              type="text"
              value={webService}
              onChange={(e) => setWebService(e.target.value)}
            />
          </label>
          <label>
            Function Name
            <input
              type="text"
              value={functionName}
              onChange={(e) => setFunctionName(e.target.value)}
            />
          </label>
          <button className="action-button" onClick={clearEnvironment}>
            Clear Environment
          </button>
        </div>

        <div className="form-block">
          <h2>Business Central API Settings</h2>
          <label>
            Tenant ID
            <input
              type="text"
              value={tenantId}
              onChange={(e) => setTenantId(e.target.value)}
            />
          </label>
          <label>
            Company ID
            <input
              type="text"
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
            />
          </label>
          <label>
            Environment
            <input
              type="text"
              value={environment}
              onChange={(e) => setEnvironment(e.target.value)}
            />
          </label>
          <label>
            Company Name
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </label>
          <label>
            Default Publisher
            <input
              type="text"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
            />
          </label>
          <label>
            Auth Type
            <input type="text" value="OAuth 2.0" disabled />
          </label>
          <label>
            Content-Type
            <select
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
            >
              <option value="application/json">application/json</option>
              <option value="application/xml">application/xml</option>
              <option value="text/plain">text/plain</option>
            </select>
          </label>
          <button className="action-button" onClick={clearBCSettings}>
            Clear BC Settings
          </button>
        </div>

        <div className="form-block">
          <h2>Server OAuth Settings</h2>
          <label>
            Client ID
            <input
              type="text"
              value={clientCredentials.clientId}
              onChange={(e) =>
                setClientCredentials((prev) => ({
                  ...prev,
                  clientId: e.target.value,
                }))
              }
            />
          </label>
          <label>
            Client Secret
            <input
              type="password"
              value={clientCredentials.clientSecret}
              onChange={(e) =>
                setClientCredentials((prev) => ({
                  ...prev,
                  clientSecret: e.target.value,
                }))
              }
            />
          </label>
          <button className="action-button" onClick={clearOAuthSettings}>
            Clear OAuth
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
