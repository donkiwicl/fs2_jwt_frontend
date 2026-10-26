import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [modo, setModo] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const { user, login, register } = useAuth();
  const navigate = useNavigate();

  if (user) return <Navigate to="/productos" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);
    try {
      if (modo === "registro") {
        await register(email, password);
        setModo("login");
        setMensaje({ ok: true, texto: "Cuenta creada. Ahora inicie sesión." });
        return;
      }
      await login(email, password);
      navigate("/productos");
    } catch (err) {
      const status = err.response?.status;
      const texto =
        status === 401 ? "Credenciales inválidas"
        : status === 409 ? "El email ya está registrado"
        : status === 400 ? "Revise el email y que la clave tenga al menos 6 caracteres"
        : "No se pudo conectar con el servidor";
      setMensaje({ ok: false, texto });
    }
  };

  return (
    <main className="card login">
      <h1>{modo === "login" ? "Iniciar sesión" : "Crear cuenta"}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Contraseña
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit">{modo === "login" ? "Entrar" : "Registrarme"}</button>
      </form>
      {mensaje && <p className={mensaje.ok ? "ok" : "error"}>{mensaje.texto}</p>}
      <button className="link" onClick={() => { setModo(modo === "login" ? "registro" : "login"); setMensaje(null); }}>
        {modo === "login" ? "¿No tiene cuenta? Regístrese" : "¿Ya tiene cuenta? Inicie sesión"}
      </button>
      <p className="muted small">Usuarios de prueba: admin@techstore.cl / admin123 · user@techstore.cl / user123</p>
    </main>
  );
}
