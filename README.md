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
- **Prisma** (ORM)

---

## Configuración de Supabase

- **Base de Datos**
  1. Ve a [https://supabase.com](https://supabase.com) y crea una cuenta gratuita
  2. Clic en **New Project** → elige nombre, contraseña y región **South America (São Paulo)**
  3. Espera 2 minutos a que el proyecto se inicialice
  4. Ve a **Project Settings → Database → Connection string** y copia:
  - **Transaction pooler** (puerto `6543`) → `DATABASE_URL`
  - **Direct connection** (puerto `5432`) → `DIRECT_URL`

```env
    `DATABASE_URL`
    DATABASE_URL=postgresql://postgres.xxx:password@aws-0-xx.pooler.supabase.com:6543/postgres?pgbouncer=true
    `DIRECT_URL`
    DIRECT_URL=postgresql://postgres.xxx:password@aws-0-xx.pooler.supabase.com:5432/postgres
```

    5. Crea las tablas ejecutando:

    ```bash
    npx prisma migrate dev --name init
    npx prisma generate
    ```

    6. Ve al **SQL Editor** de Supabase y ejecuta el archivo `supabase_trigger.sql` del proyecto para sincronizar usuarios automáticamente

---

- **Auth**
  1. Ve a **Project Settings → API** y copia:
  - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
  - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

  ```env
  NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui
  ```

  2. Ve a **Authentication → Providers** y verifica que **Email** esté habilitado
  3. Opcional: desactiva **Confirm email** en **Authentication → Email Templates → Confirm signup** para desarrollo

  ***

  ### Usuario de prueba y Seed
  1. Ve a **Authentication → Users → Add user**
  2. Crea un usuario con email y contraseña
  3. Copia el **UUID** del usuario
  4. Abre `prisma/seed.ts` y reemplaza el valor de `USER_ID` con ese UUID
  5. Ejecuta:

  ```bash
  npx ts-node prisma/seed.ts
  ```

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
# App
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Supabase client
DATABASE_URL="postgresql://USER:PASSWORD@HOST:6543/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:5432/postgres"

# Environment
NODE_ENV=development
PORT=3000
```

## Autor

Desarrollado por **Erika Chino** como parte de una prueba técnica.

---
