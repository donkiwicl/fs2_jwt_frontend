import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  if (!user) return null;
  const expira = new Date(user.exp * 1000).toLocaleTimeString();

  return (
    <nav className="navbar">
      <strong>TechStore</strong>
      <Link to="/productos">Productos</Link>
      <Link to="/token">Mi token</Link>
      <span className="spacer" />
      <span className="muted">
        {user.email} {isAdmin && <span className="badge">ADMIN</span>} · expira {expira}
      </span>
      <button onClick={logout}>Salir</button>
    </nav>
  );
}
