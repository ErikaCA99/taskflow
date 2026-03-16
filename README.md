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

## Librerias utilizadas

---

### Base de Datos y ORM

| Librería             | Versión | Descripción                                                   |
| -------------------- | ------- | ------------------------------------------------------------- |
| `prisma`             | 7.5.0   | ORM para modelado de datos, migraciones y generación de tipos |
| `@prisma/client`     | 7.5.0   | Cliente generado por Prisma para consultas a la BD            |
| `@prisma/adapter-pg` | 7.5.0   | Adapter de Prisma 6 para conectarse a PostgreSQL via `pg`     |
| `pg`                 | 8.20.0  | Driver de PostgreSQL para Node.js                             |

---

### Autenticación

| Librería                | Versión | Descripción                                                          |
| ----------------------- | ------- | -------------------------------------------------------------------- |
| `@supabase/supabase-js` | 2.99.1  | Cliente oficial de Supabase para auth y consultas                    |
| `@supabase/ssr`         | 0.9.0   | Integración de Supabase Auth con Next.js App Router (SSR/middleware) |

---

### Formularios y Validación

| Librería              | Versión | Descripción                                                  |
| --------------------- | ------- | ------------------------------------------------------------ |
| `react-hook-form`     | 7.71.2  | Manejo de formularios con mínimo re-render y buena UX        |
| `@hookform/resolvers` | 5.2.2   | Conecta react-hook-form con librerías de validación como Zod |
| `zod`                 | 4.3.6   | Validación de esquemas con inferencia de tipos TypeScript    |

---

### UI y Utilidades

| Librería          | Versión | Descripción                                     |
| ----------------- | ------- | ----------------------------------------------- |
| `lucide-react`    | 0.577.0 | Librería de iconos SVG como componentes React   |
| `react-hot-toast` | 2.6.0   | Notificaciones toast ligeras y personalizables  |
| `clsx`            | 2.1.1   | Utilidad para construir className condicionales |
| `tailwind-merge`  | 3.5.0   | Combina clases de Tailwind sin conflictos       |

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

- **Auth** 1. Ve a **Project Settings → API** y copia: - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL` - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

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

  ```

  ```

## Base de Datos

## Estructura del proyecto

```
taskflow-prueba-tecnica/
├── docker/
│   ├── development/
│   │   ├── Dockerfile
│   │   ├── compose.yml
│   │   └── README.md
│   ├── production/
│   │   ├── Dockerfile
│   │   ├── compose.yml
│   │   └── README.md
│   └── README.md
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
├── public/
│   ├── carpeta.png
│   ├── tasks.png
│   └── panel.png
├── src/
│   ├── actions/
│   │   ├── auth.ts
│   │   ├── projects.ts
│   │   └── tasks.ts
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── confirm/
│   │   │   │   └── route.ts
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (main)/
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── projects/
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── loading.tsx
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── projects/
│   │   │   ├── CreateButton.tsx
│   │   │   ├── DeleteButton.tsx
│   │   │   ├── EdithButton.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   └── ProjectForm.tsx
│   │   ├── tasks/
│   │   │   ├── TaskCard.tsx
│   │   │   ├── TaskForm.tsx
│   │   │   └── TaskList.tsx
│   │   └── navBar.tsx
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   ├── prisma.ts
│   │   │   ├── proxy.ts
│   │   │   └── server.ts
│   │   └── validations/
│   │       └── auth_validations.ts
│   └── types/
│       └── index.ts
├── .dockerignore
├── .env.example
├── middleware.ts
├── next.config.ts
├── package.json
├── prisma.config.ts
├── tailwind.config.js
└── tsconfig.json

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

# TaskFlow

## Home

![Home](./public/Home.png)

## Login

![Login](./public/Login.png)

## Register

![Register](./public/register.png)

## Dashboard

![Dashboard](./public/dashboard.png)

## Gestión de tareas

![Tareas](./public/task.png)

## Proyectos

![Proyectos](./public/projects.png)

## Autor

Desarrollado por **Erika Chino** como parte de una prueba técnica.

---
