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
    clientId,
    setClientId,
    clientSecret,
    setClientSecret,
    resetDefaults,
  } = useContext(ApiContext);

  return (
    <div className="home-page">
      <div className="forms-container page-card">
        <div className="form-block">
          <h2>Environment Settings</h2>
          <input
            type="text"
            placeholder="API Group Name"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          />
          <input
            type="text"
            placeholder="Entity Set Name"
            value={entity}
            onChange={(e) => setEntity(e.target.value)}
          />
          <input
            type="text"
            placeholder="Web Service"
            value={webService}
            onChange={(e) => setWebService(e.target.value)}
          />
          <input
            type="text"
            placeholder="Function Name"
            value={functionName}
            onChange={(e) => setFunctionName(e.target.value)}
          />
        </div>

        <div className="form-block">
          <h2>Business Central API Settings</h2>
          <input
            type="text"
            placeholder="Tenant ID"
            value={tenantId}
            onChange={(e) => setTenantId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Company ID"
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Environment"
            value={environment}
            onChange={(e) => setEnvironment(e.target.value)}
          />
          <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Default Publisher"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
          />
        </div>

        <div className="form-block">
          <h2>Server OAuth Settings</h2>
          <input
            type="text"
            placeholder="Client ID"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
          />
          <input
            type="password"
            placeholder="Client Secret"
            value={clientSecret}
            onChange={(e) => setClientSecret(e.target.value)}
          />
        </div>
      </div>

      <div className="choice-buttons">
        <Link to="/web-service" className="choice-button">
          Call a Web Service
        </Link>
        <Link to="/api-page" className="choice-button">
          Call an API Page
        </Link>
        <button className="action-button" onClick={resetDefaults}>
          Reset All
        </button>
      </div>
    </div>
  );
};

export default HomePage;
