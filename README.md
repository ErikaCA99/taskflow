# TaskFlow – Prueba Técnica

Aplicación web para la gestión de proyectos y tareas desarrollada como parte de una prueba técnica.
El objetivo del proyecto es demostrar buenas prácticas de desarrollo moderno utilizando tecnologías actuales del ecosistema JavaScript.

---

## Tecnologías utilizadas

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Supabase** (Base de datos y API)
- **Docker** (entorno de desarrollo y producción)

---

## Estructura del proyecto

```
taskflow-prueba-tecnica
│
├─ docker
│   ├─ development
│   │   ├─ Dockerfile.dev
│   │   └─ docker-compose.dev.yml
│   │
│   └─ production
│       ├─ Dockerfile.prod
│       └─ docker-compose.prod.yml
│
├─ src
│   └─ app
|   └─ supabase
│
├─ public
│
├─ .env.example
├─ .dockerignore
├─ package.json
└─ README.md
```

## Variables de entorno

Antes de ejecutar el proyecto debes crear un archivo `.env` basado en `.env.example`.

Ejemplo:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_APP_NAME=TaskFlow
NODE_ENV=development
PORT=3000
```

## Autor

Desarrollado por **Erika Chino** como parte de una prueba técnica.

---
