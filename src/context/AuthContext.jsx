import React, { createContext, useState, useEffect } from "react";
import { getToken, setToken, removeToken } from "../utils/storage";
import api from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      api
        .get("/auth/me/")
        .then((res) => setUser(res.data))
        .catch(() => {
          removeToken();
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    const res = await api.post("/auth/login/", credentials);
    setToken(res.data.access || res.data.token);
    const me = await api.get("/auth/me/");
    setUser(me.data);
    return res;
  };

  const logout = () => {
    removeToken();
    setUser(null);
    window.location.href = "/login";
  };

  const register = async (payload) => {
    const res = await api.post("/auth/register/", payload);
    return res;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};


