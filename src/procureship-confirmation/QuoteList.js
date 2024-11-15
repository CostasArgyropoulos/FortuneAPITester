import React, { useState, useContext } from "react";
import axios from "axios";
import GetBCToken from "../service/GetBCToken";
import { ApiContext } from "../context/ApiContext";
import { ProgressSpinner } from "primereact/progressspinner";
import "../styles.css";

const QuoteList = () => {
  const { apiUrl } = useContext(ApiContext);

  const [quotes, setQuotes] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [postBody, setPostBody] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [responseMessageClass, setResponseMessageClass] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setResponseMessage("");
  };

  const handleAddQuote = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    const newQuote = { quote: inputValue.trim() };
    setQuotes([...quotes, newQuote]);

    setPostBody(
      JSON.stringify(
        {
          quotes: [...quotes, newQuote],
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
        quotes: JSON.stringify(quotes),
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
      setQuotes([]);
      setPostBody("");
    } catch (error) {
      console.error("There was an error making the POST request:", error);
      setResponseMessage("Error: " + error.message);
      setResponseMessageClass("response-failure");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuote = (index) => {
    const updatedQuotes = quotes.filter((_, i) => i !== index);
    setQuotes(updatedQuotes);

    setPostBody(
      JSON.stringify(
        {
          quotes: updatedQuotes.map((quote) => ({ quote: quote.quote })),
          onlineProcurementPlatform: "PROCURESHIP",
        },
        null,
        2
      )
    );
  };

  return (
    <div className="card">
      <h2>Quotes List</h2>

      <form onSubmit={handleAddQuote}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a quote"
        />
        <button type="submit" className="action-button">
          Add Quote
        </button>
      </form>

      <table className="styled-table">
        <thead>
          <tr>
            <th>Quote List</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((quote, index) => (
            <tr key={index}>
              <td>{quote.quote}</td>
              <td>
                <button
                  onClick={() => handleDeleteQuote(index)}
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

export default QuoteList;
