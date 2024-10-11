import React, { createContext, useState } from 'react';

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    const [apiUrl, setApiUrl] = useState('');
    const [webService, setWebService] = useState(process.env.REACT_APP_DEFAULT_WEBSERVICE);
    const [functionName, setFunctionName] = useState(process.env.REACT_APP_DEFAULT_FUNCTION);

    const value = {
        apiUrl,
        setApiUrl,
        webService,
        setWebService,
        functionName,
        setFunctionName,
    };

    return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};
