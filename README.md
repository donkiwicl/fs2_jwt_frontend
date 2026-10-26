# TechStore — Frontend con JWT (Vite + React)

Interfaz web que consume la API [fs2_jwt_backend](https://github.com/donkiwicl/fs2_jwt_backend). Es la parte frontend del caso práctico «JWT con Spring Boot y React».

## Qué muestra

- Login y registro contra `POST /api/auth/login` y `/api/auth/register`
- Token guardado en `localStorage` y leído con `jwt-decode` (solo lectura; la firma la valida el backend)
- Interceptor de axios que agrega `Authorization: Bearer <token>` a cada petición
- Cierre de sesión automático cuando la API responde 401 (token expirado o alterado)
- Rutas privadas con `PrivateRoute` y opciones de ADMIN ocultas para USER
- Página «Mi token» que muestra las tres partes del JWT y su payload decodificado

## Estructura

```
src/
├── api/axiosClient.js          axios con interceptores de request y response
├── context/AuthContext.jsx     sesión global: user, isAdmin, login, register, logout
├── components/
│   ├── PrivateRoute.jsx
│   └── Navbar.jsx
├── pages/
│   ├── Login.jsx
│   ├── Productos.jsx           listar; crear y eliminar si es ADMIN
│   └── MiToken.jsx
├── App.jsx                     rutas
└── index.css
```

## Ejecutar

Requiere Node 20 o superior y el backend corriendo en `http://localhost:8080`.

```bash
npm install
npm run dev
```

Abra `http://localhost:5173`. Usuarios de prueba: `admin@techstore.cl` / `admin123` y `user@techstore.cl` / `user123`.

## Variables de entorno

| Variable | Ejemplo | Uso |
| --- | --- | --- |
| `VITE_API_URL` | `http://localhost:8080` | URL base del backend. Su origen debe estar en `CORS_ALLOWED_ORIGINS` del backend. |

`.env.development` trae el valor local. Para un build de producción defina `VITE_API_URL` antes de `npm run build`: Vite la incrusta en el bundle.

## Scripts

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción en `dist/` |
| `npm run lint` | Lint con oxlint |
| `npm run preview` | Sirve el build localmente |
