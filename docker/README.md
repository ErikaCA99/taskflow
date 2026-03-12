# Docker — TaskFlow

## Entorno DEV (hot-reload)

```bash
# Levantar
docker compose -f docker/development/compose.yml up --build

# Detener
docker compose -f docker/development/compose.yml down

# Correr migraciones dentro del contenedor
docker exec -it taskflow-dev npx prisma migrate dev

# Correr seed dentro del contenedor
docker exec -it taskflow-dev npx prisma db seed
```

## Entorno PROD (multi-stage)

```bash
# Construir imagen
docker compose -f docker/production/compose.yml build

# Ejecutar
docker compose -f docker/production/compose.yml up

# Detener
docker compose -f docker/production/ompose.yml down
```
