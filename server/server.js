const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "../build")));

app.post("/get-token", async (req, res) => {
  const { clientId, clientSecret, tenantId } = req.body;

  if (!clientId || !clientSecret || !tenantId) {
    return res.status(400).json({ error: "Missing required OAuth fields" });
  }

  const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", clientId);
  params.append("client_secret", clientSecret);
  params.append("scope", "https://api.businesscentral.dynamics.com/.default");

  try {
    const response = await axios.post(tokenUrl, params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      timeout: 10000,
    });
    res.json({
      token: response.data.access_token,
      expires_in: response.data.expires_in,
    });
  } catch (error) {
    console.error(
      "Error fetching token:",
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({ error: error.response ? error.response.data : error.message });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
