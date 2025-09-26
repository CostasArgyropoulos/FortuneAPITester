import { useContext } from "react";
import axios from "axios";
import { ApiContext } from "../context/ApiContext";

const TOKEN_KEY = "bc_token";
const EXPIRY_KEY = "bc_token_expiry";

export const useGetBCToken = () => {
  const { clientCredentials, tenantId } = useContext(ApiContext);

  const getToken = async () => {
    const now = Date.now();

    const cachedToken = localStorage.getItem(TOKEN_KEY);
    const cachedExpiry = localStorage.getItem(EXPIRY_KEY);

    if (cachedToken && cachedExpiry && parseInt(cachedExpiry) > now + 60000) {
      return cachedToken;
    }

    if (
      !clientCredentials?.clientId ||
      !clientCredentials?.clientSecret ||
      !tenantId
    ) {
      throw new Error("Missing required OAuth fields");
    }

    const response = await axios.post("/get-token", {
      clientCredentials,
      tenantId,
    });

    const { token, expires_in } = response.data;

    const expiry = now + expires_in * 1000;
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(EXPIRY_KEY, expiry.toString());

    return token;
  };

  return getToken;
};
