# Buscador de Usuarios de GitHub 🔍

Proyecto desarrollado en **React + TypeScript + Vite**, siguiendo la arquitectura, patrones y buenas prácticas enseñadas en la clase.

---

## 📌 Requerimientos Implementados

1. **Barra de búsqueda con botón "Buscar"**:
   - Componente `SearchBar` con input controlado y formulario (`form` con `onSubmit` y `preventDefault`).
   - Lógica de formulario desacoplada en el hook personalizado `useSearchBar`.
   - Se ejecuta la búsqueda al dar clic en el botón o al presionar `Enter`.
   - Estado de carga deshabilitado mientras se realiza la consulta.
2. **Listado de resultados**:
   - Búsqueda en la API pública de GitHub: `https://api.github.com/search/users?q={query}`.
   - Manejo asíncrono con `async / await`, `try / catch / finally` en el hook `useSearchUser`.
   - Componentes compuestos:
     - `ResultSetWrapper`: Contenedor principal de la lista.
     - `ResultItem`: Componente de presentación que muestra el **avatar** y el **nombre de usuario (login)**.
3. **Botón de ojo (👁️) para ver detalles**:
   - Cada `ResultItem` incluye un botón con icono de ojo para inspeccionar al usuario.
4. **Detalles del usuario**:
   - Componente `UserInfo` y hook `useUserInfo` consumiendo `https://api.github.com/users/{username}`.
   - Muestra:
     - Avatar ampliado.
     - Nombre completo y login.
     - Biografía y ubicación / empresa / blog (si están disponibles).
     - **Repositorios públicos** (`public_repos`).
     - **Seguidores** (`followers`).
     - **Seguidos** (`following`).
     - **Enlace directo al perfil en GitHub** con `target="_blank"` y `rel="noopener noreferrer"`.
5. **Sincronización con `useEffect`**:
   - El usuario seleccionado se almacena en el estado `selectedUser`.
   - Al cambiar `selectedUser`, un `useEffect` dispara la consulta de detalles del usuario.
   - Si se presiona el mismo usuario varias veces, no se vuelve a disparar la petición innecesariamente.
6. **Estilos modulares (CSS Modules)**:
   - Uso de `*.module.css` para aislar estilos de `SearchBar`, `Results`, `UserInfo` y layout de `App`.
   - Layout responsive en dos columnas (columna izquierda para búsqueda/resultados y columna derecha fija/sticky para los detalles).

---

## 📁 Estructura del Proyecto

```text
actividad/
├── GithubAPI_Bruno/         # Colección de peticiones para Bruno
├── GithubAPI_POSTMAN.json   # Colección de peticiones para Postman
├── GithubAPI_YAML.yml       # Especificación OpenAPI / Bruno YAML
├── src/
│   ├── components/
│   │   ├── Results/
│   │   │   ├── ResultItem.tsx
│   │   │   ├── ResultSetWrapper.tsx
│   │   │   └── results.module.css
│   │   ├── SearchBar/
│   │   │   ├── SearchBar.tsx
│   │   │   └── SearchBar.module.css
│   │   └── UserInfo/
│   │       ├── UserInfo.tsx
│   │       └── UserInfo.module.css
│   ├── hooks/
│   │   ├── useSearchBar.ts
│   │   ├── useSearchUser.ts
│   │   └── useUserInfo.ts
│   ├── types/
│   │   └── github.ts
│   ├── App.module.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.js
```

---

## 🚀 Cómo ejecutar el proyecto

1. En la terminal, sitúate en la carpeta del proyecto e instala dependencias si es necesario:
   ```bash
   npm install
   ```

2. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

3. Abrir en el navegador la URL que indique Vite (por ejemplo: `http://localhost:5173`).

---

## 🛠️ Colecciones API incluidas

En la raíz del proyecto se incluyen los archivos de referencia para probar las APIs directamente:
- **Bruno**: Directorio `GithubAPI_Bruno/`
- **Postman**: `GithubAPI_POSTMAN.json`
- **YAML**: `GithubAPI_YAML.yml`
