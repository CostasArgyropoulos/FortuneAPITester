import React, { createContext, useState, useEffect } from "react";

export const ApiContext = createContext();

const LOCAL_STORAGE_KEYS = {
  group: "bc_group",
  entity: "bc_entity",
  webService: "bc_webService",
  functionName: "bc_functionName",
  tenantId: "bc_tenantId",
  companyId: "bc_companyId",
  environment: "bc_environment",
  companyName: "bc_companyName",
  publisher: "bc_publisher",
  clientId: "server_clientId",
  clientSecret: "server_clientSecret",
};

const getInitialValue = (key) => {
  const value = localStorage.getItem(key);
  return value || "";
};

export const ApiProvider = ({ children }) => {
  const [apiUrl, setApiUrl] = useState("");
  const [group, setGroup] = useState(getInitialValue(LOCAL_STORAGE_KEYS.group));
  const [entity, setEntity] = useState(
    getInitialValue(LOCAL_STORAGE_KEYS.entity)
  );
  const [webService, setWebService] = useState(
    getInitialValue(LOCAL_STORAGE_KEYS.webService)
  );
  const [functionName, setFunctionName] = useState(
    getInitialValue(LOCAL_STORAGE_KEYS.functionName)
  );
  const [tenantId, setTenantId] = useState(
    getInitialValue(LOCAL_STORAGE_KEYS.tenantId)
  );
  const [companyId, setCompanyId] = useState(
    getInitialValue(LOCAL_STORAGE_KEYS.companyId)
  );
  const [environment, setEnvironment] = useState(
    getInitialValue(LOCAL_STORAGE_KEYS.environment)
  );
  const [companyName, setCompanyName] = useState(
    getInitialValue(LOCAL_STORAGE_KEYS.companyName)
  );
  const [publisher, setPublisher] = useState(
    getInitialValue(LOCAL_STORAGE_KEYS.publisher)
  );
  const [clientId, setClientId] = useState(
    getInitialValue(LOCAL_STORAGE_KEYS.clientId)
  );
  const [clientSecret, setClientSecret] = useState(
    getInitialValue(LOCAL_STORAGE_KEYS.clientSecret)
  );

  useEffect(
    () => localStorage.setItem(LOCAL_STORAGE_KEYS.group, group),
    [group]
  );
  useEffect(
    () => localStorage.setItem(LOCAL_STORAGE_KEYS.entity, entity),
    [entity]
  );
  useEffect(
    () => localStorage.setItem(LOCAL_STORAGE_KEYS.webService, webService),
    [webService]
  );
  useEffect(
    () => localStorage.setItem(LOCAL_STORAGE_KEYS.functionName, functionName),
    [functionName]
  );
  useEffect(
    () => localStorage.setItem(LOCAL_STORAGE_KEYS.tenantId, tenantId),
    [tenantId]
  );
  useEffect(
    () => localStorage.setItem(LOCAL_STORAGE_KEYS.companyId, companyId),
    [companyId]
  );
  useEffect(
    () => localStorage.setItem(LOCAL_STORAGE_KEYS.environment, environment),
    [environment]
  );
  useEffect(
    () => localStorage.setItem(LOCAL_STORAGE_KEYS.companyName, companyName),
    [companyName]
  );
  useEffect(
    () => localStorage.setItem(LOCAL_STORAGE_KEYS.publisher, publisher),
    [publisher]
  );
  useEffect(
    () => localStorage.setItem(LOCAL_STORAGE_KEYS.clientId, clientId),
    [clientId]
  );
  useEffect(
    () => localStorage.setItem(LOCAL_STORAGE_KEYS.clientSecret, clientSecret),
    [clientSecret]
  );

  const resetDefaults = () => {
    setGroup("");
    setEntity("");
    setWebService("");
    setFunctionName("");
    setTenantId("");
    setCompanyId("");
    setEnvironment("");
    setCompanyName("");
    setPublisher("");
    setClientId("");
    setClientSecret("");
    localStorage.clear();
  };

  return (
    <ApiContext.Provider
      value={{
        apiUrl,
        setApiUrl,
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
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
