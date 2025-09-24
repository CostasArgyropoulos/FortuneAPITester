import { useContext } from "react";
import axios from "axios";
import { ApiContext } from "../context/ApiContext";

export const useGetBCToken = () => {
  const { clientId, clientSecret, tenantId } = useContext(ApiContext);

  const getToken = async () => {
    const response = await axios.post("/get-token", {
      clientId,
      clientSecret,
      tenantId,
    });
    return response.data.token;
  };

  return getToken;
};
