import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api/axiosClient";

const AuthContext = createContext(null);

// jwt-decode solo LEE el payload; la firma la valida el backend.
function leerToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = jwtDecode(token);
    if (payload.exp * 1000 < Date.now()) { // exp viene en segundos
      localStorage.removeItem("token");
      return null;
    }
    return { email: payload.sub, roles: payload.roles ?? [], exp: payload.exp };
  } catch {
    localStorage.removeItem("token");
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(leerToken);

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    setUser(leerToken());
  };

  const register = (email, password) => api.post("/auth/register", { email, password });

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const isAdmin = user?.roles.includes("ROLE_ADMIN") ?? false;

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react/only-export-components
export const useAuth = () => useContext(AuthContext);
