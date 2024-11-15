import React, { useState, useContext } from "react";
import axios from "axios";
import GetBCToken from "../service/GetBCToken";
import { ApiContext } from "../context/ApiContext";
import { ProgressSpinner } from "primereact/progressspinner";
import "../styles.css";

const OrderList = () => {
  const { apiUrl } = useContext(ApiContext);

  const [orders, setOrders] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [postBody, setPostBody] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [responseMessageClass, setResponseMessageClass] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setResponseMessage("");
  };

  const handleAddOrder = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    const newOrder = { order: inputValue.trim() };
    setOrders([...orders, newOrder]);

    setPostBody(
      JSON.stringify(
        {
          orders: [...orders, newOrder],
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
      setLoading(true);
      const token = await GetBCToken();
      const data = {
        orders: JSON.stringify(orders),
        onlineProcurementPlatform: "PROCURESHIP",
      };

      const response = await axios.post(apiUrl, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setResponseMessage(JSON.stringify(response.data, null, 2));
      setResponseMessageClass("response-success");
      setOrders([]);
      setPostBody("");
    } catch (error) {
      console.error("There was an error making the POST request:", error);
      setResponseMessage("Error: " + error.message);
      setResponseMessageClass("response-failure");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = (index) => {
    const updatedOrders = orders.filter((_, i) => i !== index);
    setOrders(updatedOrders);

    setPostBody(
      JSON.stringify(
        {
          orders: updatedOrders.map((order) => ({ order: order.order })),
          onlineProcurementPlatform: "PROCURESHIP",
        },
        null,
        2
      )
    );
  };

  return (
    <div className="card">
      <h2>Orders List</h2>

      <form onSubmit={handleAddOrder}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a order"
        />
        <button type="submit" className="action-button">
          Add Order
        </button>
      </form>

      <table className="styled-table">
        <thead>
          <tr>
            <th>Order List</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.order}</td>
              <td>
                <button
                  onClick={() => handleDeleteOrder(index)}
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

      {apiUrl && <div className="api-url">API URL {apiUrl}</div>}

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

export default OrderList;
