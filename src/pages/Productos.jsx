import { useEffect, useState } from "react";
import api from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";

const clp = new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" });

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [error, setError] = useState("");
  const { isAdmin } = useAuth();

  // El componente no menciona el token: el interceptor de axios lo agrega solo.
  useEffect(() => {
    api.get("/productos")
      .then((res) => setProductos(res.data))
      .catch(() => setError("No se pudieron cargar los productos"));
  }, []);

  const crear = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/productos", { nombre, precio: Number(precio) });
      setProductos([...productos, data]);
      setNombre("");
      setPrecio("");
    } catch (err) {
      setError(err.response?.status === 403 ? "No tiene permisos (403)" : "No se pudo crear el producto");
    }
  };

  const eliminar = async (id) => {
    setError("");
    try {
      await api.delete(`/productos/${id}`);
      setProductos(productos.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.response?.status === 403 ? "No tiene permisos (403)" : "No se pudo eliminar");
    }
  };

  return (
    <main className="card">
      <h1>Productos</h1>
      <table>
        <thead>
          <tr><th>Nombre</th><th>Precio</th>{isAdmin && <th />}</tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>{clp.format(p.precio)}</td>
              {isAdmin && <td><button className="danger" onClick={() => eliminar(p.id)}>Eliminar</button></td>}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Ocultar el formulario es solo usabilidad: el backend igual responde 403 a quien no es ADMIN */}
      {isAdmin && (
        <form className="inline" onSubmit={crear}>
          <input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          <input placeholder="Precio" type="number" min="0" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
          <button type="submit">Agregar</button>
        </form>
      )}
      {error && <p className="error">{error}</p>}
    </main>
  );
}
