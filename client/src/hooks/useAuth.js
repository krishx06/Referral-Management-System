import { useState } from "react";
import { login as loginAPI } from "../api/auth.api";
import { setToken, getToken, removeToken } from "../utils/auth";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());

  const login = async (credentials) => {
    const res = await loginAPI(credentials);
    setToken(res.token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
};
