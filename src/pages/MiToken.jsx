import { jwtDecode } from "jwt-decode";

// Página didáctica: muestra las tres partes del JWT guardado y su payload decodificado
export default function MiToken() {
  const token = localStorage.getItem("token") ?? "";
  const [header, payload, firma] = token.split(".");

  return (
    <main className="card">
      <h1>Mi token</h1>
      <p className="muted">El payload se puede leer sin la clave; solo la firma impide modificarlo.</p>
      <pre className="jwt">
        <span className="jwt-header">{header}</span>.
        <span className="jwt-payload">{payload}</span>.
        <span className="jwt-firma">{firma}</span>
      </pre>
      <h2>Header</h2>
      <pre>{JSON.stringify(jwtDecode(token, { header: true }), null, 2)}</pre>
      <h2>Payload</h2>
      <pre>{JSON.stringify(jwtDecode(token), null, 2)}</pre>
    </main>
  );
}
