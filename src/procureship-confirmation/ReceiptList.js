import React, { useState, useContext } from "react";
import axios from "axios";
import { useGetBCToken } from "../hooks/useGetBCToken";
import { ApiContext } from "../context/ApiContext";
import { ProgressSpinner } from "primereact/progressspinner";
import "../styles.css";

const ReceiptList = () => {
  const { apiUrl, contentType } = useContext(ApiContext);
  const getBCToken = useGetBCToken();

  const [receipts, setReceipts] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [postBody, setPostBody] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [responseMessageClass, setResponseMessageClass] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setResponseMessage("");
  };

  const handleAddReceipt = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    const newReceipt = { receipt: inputValue.trim() };
    setReceipts([...receipts, newReceipt]);

    setPostBody(
      JSON.stringify(
        {
          receipts: [...receipts, newReceipt],
          onlineProcurementPlatform: "PROCURESHIP",
        },
        null,
        2
      )
    );

    setInputValue("");
  };

  const handlePostRequest = async () => {
    try {
      const token = await getBCToken();
      const data = {
        receipts: JSON.stringify(receipts),
        onlineProcurementPlatform: "PROCURESHIP",
      };

      const response = await axios.post(apiUrl, data, {
        headers: {
          "Content-Type": contentType,
          Authorization: `Bearer ${token}`,
        },
      });

      setResponseMessage(JSON.stringify(response.data, null, 2));
      setResponseMessageClass("response-success");
      setReceipts([]);
      setPostBody("");
    } catch (error) {
      console.error("There was an error making the POST request:", error);
      setResponseMessage("Error: " + error.message);
      setResponseMessageClass("response-failure");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReceipt = (index) => {
    const updatedReceipts = receipts.filter((_, i) => i !== index);
    setReceipts(updatedReceipts);

    setPostBody(
      JSON.stringify(
        {
          receipts: updatedReceipts.map((receipt) => ({
            receipt: receipt.receipt,
          })),
          onlineProcurementPlatform: "PROCURESHIP",
        },
        null,
        2
      )
    );
  };

  return (
    <div className="card">
      <h2>Receipts List</h2>

      <form onSubmit={handleAddReceipt}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a receipt"
        />
        <button type="submit" className="action-button">
          Add Receipt
        </button>
      </form>

      <table className="styled-table">
        <thead>
          <tr>
            <th>Receipt List</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {receipts.map((receipt, index) => (
            <tr key={index}>
              <td>{receipt.receipt}</td>
              <td>
                <button
                  onClick={() => handleDeleteReceipt(index)}
                  className="action-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handlePostRequest} className="action-button">
        Send POST Request
      </button>

      {apiUrl && <div className="api-url">{apiUrl}</div>}

      {postBody && (
        <div className="post-body">
          <h3>Post Body:</h3>
          <pre>{postBody}</pre>
        </div>
      )}

      {loading && <ProgressSpinner />}
      {responseMessage && (
        <div className={`response-message ${responseMessageClass}`}>
          <h3>Response:</h3>
          <>{responseMessage}</>
        </div>
      )}
    </div>
  );
};

export default ReceiptList;
