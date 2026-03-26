import keycloak from "@/keycloak-config";
import axios from "axios";

 const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(async (config) => {
  await keycloak.updateToken(30);

  config.headers.Authorization = `Bearer ${keycloak.token}`;

  return config;
});

export {api};
