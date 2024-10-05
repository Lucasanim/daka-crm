import axios from "axios";
import AuthDetails from "../model/user/AuthDetail";
import Token from "../model/user/Token";

const instance = axios.create({
  baseURL: import.meta.env.VITE_GATEWAY_BASE_URL + "/authentication",
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

const PLAIN_TEXT_CONF = {
  headers: {
    "Content-Type": "text/plain",
  },
};

export const loginRequest = (credentials: AuthDetails) => {
  return instance.post("/login", credentials);
};

export const registerRequest = (userData: AuthDetails) => {
  return instance.post("/signup", userData);
};

export const refreshTokenRequest = (tokenData: Token) => {
  return instance.post("/refresh", tokenData);
};

export const sendRecoveryEmail = (email: string) => {
  return instance.post("/recover-account", email, PLAIN_TEXT_CONF);
};

export const confirmAccountRecover = (passowrd: string, token: string) => {
  return instance.post(`/recover-account/${token}`, passowrd, PLAIN_TEXT_CONF);
};
