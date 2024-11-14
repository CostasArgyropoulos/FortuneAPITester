import React, { useState } from "react";

const DynamicWebServiceTester = () => {
  const [url, setUrl] = useState("");

  const handleRequest = () => {
    // Logic for hitting a web service
  };

  return (
    <div className="page">
      <h2>Dynamic Web Service Tester</h2>
      <input
        type="text"
        placeholder="Enter Web Service URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleRequest}>Send Request</button>
    </div>
  );
};

export default DynamicWebServiceTester;
