# AGENTS.md

Guía para agentes de IA (Claude Code, Codex, Cursor, etc.) que trabajen en este repositorio.

## Resumen del proyecto

**LTI – Talent Tracking System**: aplicación full-stack para seguimiento de talento.

- **Frontend**: React 18 + TypeScript (Create React App), puerto `3000`.
- **Backend**: Express + TypeScript, puerto `3010`.
- **ORM**: Prisma sobre PostgreSQL.
- **Base de datos**: PostgreSQL en contenedor Docker, puerto `5432`.

Estado actual: esqueleto inicial. El backend solo expone `GET /` ([backend/src/index.ts:14](backend/src/index.ts#L14)) y el frontend es el template por defecto de CRA ([frontend/src/App.tsx](frontend/src/App.tsx)). El modelo `User` en Prisma tiene `id`, `email`, `name` ([backend/prisma/schema.prisma:16-20](backend/prisma/schema.prisma#L16-L20)).

## Estructura

```
.
├── backend/              Express + TS + Prisma
│   ├── src/index.ts      Entry point del servidor
│   ├── src/tests/        Tests con Jest + Supertest
│   ├── prisma/schema.prisma
│   └── .env              DATABASE_URL y credenciales DB
├── frontend/             React + TS (CRA)
│   └── src/
├── LTI-lab-ides-IGR/     Prompts y notas del lab
├── docker-compose.yml    Servicio PostgreSQL
└── README.md             Instrucciones bilingües (EN/ES)
```

## Comandos clave

Ejecútalos desde el directorio indicado.

### Base de datos (raíz del repo)
```sh
docker-compose up -d     # Levanta PostgreSQL en :5432
docker-compose down      # Detiene el contenedor
```

### Backend (`backend/`)
```sh
npm install
npm run dev              # ts-node-dev, recarga en cambios → :3010
npm run build            # tsc → dist/
npm start                # node dist/index.js
npm test                 # Jest
npm run prisma:generate  # Regenera Prisma Client tras editar schema.prisma
```

### Frontend (`frontend/`)
```sh
npm install
npm start                # CRA dev server → :3000
npm run build            # build de producción
npm test                 # Jest (config en jest.config.js, no react-scripts)
```

## Convenciones de código

- **TypeScript estricto** en backend (`"strict": true` en [backend/tsconfig.json](backend/tsconfig.json)).
- **Prettier**: comillas simples y `trailingComma: "all"` ([backend/.prettierrc](backend/.prettierrc)). Respétalo al editar el backend.
- **ESLint** con `plugin:prettier/recommended` en el backend.
- Mantén el README **bilingüe (EN/ES)** si lo modificas: hay secciones espejadas.

## Variables de entorno

[backend/.env](backend/.env) define `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT` y `DATABASE_URL` (Postgres). Las credenciales actuales coinciden con las de [docker-compose.yml](docker-compose.yml) — si cambias unas, cambia también las otras o la conexión fallará.

Nota: `.env` **sí** está versionado en este repo (el `.gitignore` tiene `#**/.env` comentado). Trata las credenciales como de desarrollo, no de producción.

## Tests

- Backend: Jest + Supertest. Tests en [backend/src/tests/](backend/src/tests/). Exporta `app` desde [backend/src/index.ts:9](backend/src/index.ts#L9) para poder importarlo en los tests sin levantar el servidor.
- Frontend: Jest configurado manualmente vía [frontend/jest.config.js](frontend/jest.config.js) (no `react-scripts test`). Tests en [frontend/src/tests/](frontend/src/tests/).

## Notas para agentes

- **No uses `npm install` global** — instala dependencias dentro de `backend/` o `frontend/` según corresponda.
- Tras tocar [backend/prisma/schema.prisma](backend/prisma/schema.prisma), ejecuta `npm run prisma:generate` en `backend/` para regenerar el cliente.
- Antes de probar cambios del backend, asegúrate de que el contenedor de Postgres está corriendo (`docker-compose up -d`).
- Plataforma de desarrollo: **Windows + PowerShell**. Usa sintaxis PowerShell (`$env:VAR`, no `export VAR=`) cuando propongas comandos en terminal nativo; los scripts npm funcionan igual en ambos shells.
- `LTI-lab-ides-IGR/` es el espacio del lab para prompts/notas. No pongas ahí código de producción.
- Cuando añadas endpoints, registra la documentación en Swagger (las deps `swagger-jsdoc` y `swagger-ui-express` ya están instaladas pero aún no cableadas).
