import axios from "axios";

const GetBCToken = async () => {
  const url = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/get-token`; // proxy server

  try {
    const response = await axios.post(url);
    return response.data.token;
  } catch (error) {
    console.error(
      "Error fetching BC token:",
      error.response ? error.response.data : error.message
    );
    throw new Error(
      `Error: ${
        error.response ? error.response.data.error_description : error.message
      }`
    );
  }
};

export default GetBCToken;
