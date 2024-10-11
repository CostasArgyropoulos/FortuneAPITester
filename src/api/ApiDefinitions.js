import React, { useContext, useEffect } from 'react';
import { ApiContext } from '../context/ApiContext';
import './ApiDefinitions.css';
import '../styles.css';

const ApiDefinitions = () => {
    const { setApiUrl, webService, setWebService, functionName, setFunctionName } = useContext(ApiContext);

    useEffect(() => {
        let apiUrl_ = `https://api.businesscentral.dynamics.com/v2.0/${process.env.REACT_APP_COMPANY_ID}/${process.env.REACT_APP_ENVIRONMENT}/ODataV4/${webService}_${functionName}?company=${process.env.REACT_APP_COMPANY_NAME}`
        setApiUrl(apiUrl_);
    }, [webService, functionName])

    const onWebServiceChange = (e) => {
        setWebService(e.target.value);
    };

    const onFunctionNameChange = (e) => {
        setFunctionName(e.target.value);
    };

    return (
        <div className="api-definitions">
            <form>
                <input 
                    type="text" 
                    value={webService} 
                    onChange={onWebServiceChange} 
                    placeholder="Input Web Service" 
                    className="input-field" 
                />
                <input 
                    type="text" 
                    value={functionName} 
                    onChange={onFunctionNameChange} 
                    placeholder="Input Function Name" 
                    className="input-field" 
                />
            </form>
        </div>
    );
};

export default ApiDefinitions;
