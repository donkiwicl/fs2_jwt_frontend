import axios from "axios";

const api = axios.create({ baseURL: `${import.meta.env.VITE_API_URL}/api` });

// Agrega el token a cada petición
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Si la API responde 401 (token expirado o inválido) se cierra la sesión.
// El login se excluye: ahí un 401 significa credenciales incorrectas.
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const esLogin = error.config?.url?.includes("/auth/login");
    if (error.response?.status === 401 && !esLogin) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
