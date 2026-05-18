# LTI - Talent Tracking System  | EN

This project is a full-stack application with a React frontend and an Express backend using Prisma as an ORM. The frontend is initiated with Create React App, and the backend is written in TypeScript.

## Directory and File Explanation

- `backend/`: Contains the server-side code written in Node.js.
  - `src/`: Contains the source code for the backend.
    - `index.ts`:  The entry point for the backend server.
  - `prisma/`: Contains the Prisma schema file for ORM.
  - `tsconfig.json`: TypeScript configuration file.
  - `.env`: Contains the environment variables.
- `frontend/`: Contains the client-side code written in React.
  - `src/`: Contains the source code for the frontend.
  - `public/`: Contains static files such as the HTML file and images.
  - `build/`: Contains the production-ready build of the frontend.
- `docker-compose.yml`: Contains the Docker Compose configuration to manage your application's services.
- `README.md`: This file contains information about the project and instructions on how to run it.

## Project Structure

The project is divided into two main directories: `frontend` and `backend`.

### Frontend

The frontend is a React application, and its main files are located in the `src` directory. The `public` directory contains static assets, and the build directory contains the production `build` of the application.

### Backend

El backend es una aplicación Express escrita en TypeScript.
- The `src` directory contains the source code
- The `prisma` directory contains the Prisma schema.

## First steps

To get started with this project, follow these steps:

1. Clone the repo
2. install the dependencias for frontend and backend
```sh
cd frontend
npm install

cd ../backend
npm install
```
3. Build the backend server
```
cd backend
npm run build
````
4. Run the backend server
```
cd backend
npm run dev 
```

5. In a new terminal window, build the frontend server:
```
cd frontend
npm run build
```
6. Start the frontend server
```
cd frontend
npm start
```

The backend server will be running at http://localhost:3010, and the frontend will be available at http://localhost:3000.

## Docker y PostgreSQL

This project uses Docker to run a PostgreSQL database. Here's how to get it up and running:

Install Docker on your machine if you haven't done so already. You can download it here.
Navigate to the root directory of the project in your terminal.
Run the following command to start the Docker container:
```
docker-compose up -d
```
This will start a PostgreSQL database in a Docker container. The -d flag runs the container in detached mode, meaning it runs in the background.

To access the PostgreSQL database, you can use any PostgreSQL client with the following connection details:
 - Host: localhost
 - Port: 5432
 - User: postgres
 - Password: password
 - Database: mydatabase

Please replace User, Password, and Database with the actual user, password, and database name specified in your .env file.

To stop the Docker container, run the following command:
```
docker-compose down
```

## Database migrations

The project uses Prisma to manage the PostgreSQL schema. After cloning and starting Docker, apply the migrations from the `backend/` directory:

```sh
cd backend
npx prisma migrate dev
npm run prisma:generate
```

This creates the `Candidate`, `Education`, `WorkExperience` and `User` tables and regenerates the Prisma Client.

## Add Candidate feature

The first user story implemented is **Add Candidate to the system**.

- Endpoint: `POST /api/candidates` (`multipart/form-data`).
- Fields: `firstName`, `lastName`, `email`, `phone`, `address`, `educations` (JSON-encoded array, at least one item), `workExperiences` (JSON-encoded array, optional), `cv` (PDF or DOCX, max 5 MB).
- Responses: `201 Created`, `400 VALIDATION_ERROR`, `400 INVALID_FILE_TYPE`, `409 EMAIL_ALREADY_EXISTS`, `413 FILE_TOO_LARGE`, `500 INTERNAL_ERROR`. Error body shape: `{ "error": { "code", "message", "details?" } }`.
- Interactive API docs: http://localhost:3010/api/docs (Swagger UI).
- Uploaded CVs are stored under `backend/uploads/cvs/` (gitignored) with a random UUID filename; the database only keeps metadata.
- CORS is enabled for `http://localhost:3000` so the dev frontend can call the backend.

The frontend exposes a dashboard with an "Añadir candidato" button that opens the candidate form, validates the data on the client, sends it to the backend and shows a success or error alert.

### Frontend environment variable

The frontend reads the backend base URL from `REACT_APP_API_BASE_URL`, defaulting to `http://localhost:3010`. To point it elsewhere, create a `frontend/.env` file:

```sh
REACT_APP_API_BASE_URL=http://my-backend.example.com
```

## Tests

Backend (requires the Postgres container to be running, since tests hit the real database):

```sh
cd backend
npm test
```

Frontend (no backend required — `fetch` is mocked):

```sh
cd frontend
npm test
```

# LTI - Sistema de Seguimiento de Talento  | ES

Este proyecto es una aplicación full-stack con un frontend en React y un backend en Express usando Prisma como ORM. El frontend se inicia con Create React App y el backend está escrito en TypeScript.

## Explicación de Directorios y Archivos

- `backend/`: Contiene el código del lado del servidor escrito en Node.js.
  - `src/`: Contiene el código fuente para el backend.
    - `index.ts`: El punto de entrada para el servidor backend.
  - `prisma/`: Contiene el archivo de esquema de Prisma para ORM.
  - `tsconfig.json`: Archivo de configuración de TypeScript.
  - `.env`: Contiene las variables de entorno.
- `frontend/`: Contiene el código del lado del cliente escrito en React.
  - `src/`: Contiene el código fuente para el frontend.
  - `public/`: Contiene archivos estáticos como el archivo HTML e imágenes.
  - `build/`: Contiene la construcción lista para producción del frontend.
- `docker-compose.yml`: Contiene la configuración de Docker Compose para gestionar los servicios de tu aplicación.
- `README.md`: Este archivo contiene información sobre el proyecto e instrucciones sobre cómo ejecutarlo.

## Estructura del Proyecto

El proyecto está dividido en dos directorios principales: `frontend` y `backend`.

### Frontend

El frontend es una aplicación React y sus archivos principales están ubicados en el directorio `src`. El directorio `public` contiene activos estáticos y el directorio `build` contiene la construcción de producción de la aplicación.

### Backend

El backend es una aplicación Express escrita en TypeScript.
- El directorio `src` contiene el código fuente
- El directorio `prisma` contiene el esquema de Prisma.

## Primeros Pasos

Para comenzar con este proyecto, sigue estos pasos:

1. Clona el repositorio.
2. Instala las dependencias para el frontend y el backend:
```sh
cd frontend
npm install

cd ../backend
npm install
```
3. Construye el servidor backend:
```
cd backend
npm run build
````
4. Inicia el servidor backend:
```
cd backend
npm run dev 
```

5. En una nueva ventana de terminal, construye el servidor frontend:
```
cd frontend
npm run build
```
6. Inicia el servidor frontend:
```
cd frontend
npm start
```

El servidor backend estará corriendo en http://localhost:3010 y el frontend estará disponible en http://localhost:3000.

## Docker y PostgreSQL

Este proyecto usa Docker para ejecutar una base de datos PostgreSQL. Así es cómo ponerlo en marcha:

Instala Docker en tu máquina si aún no lo has hecho. Puedes descargarlo desde aquí.
Navega al directorio raíz del proyecto en tu terminal.
Ejecuta el siguiente comando para iniciar el contenedor Docker:
```
docker-compose up -d
```
Esto iniciará una base de datos PostgreSQL en un contenedor Docker. La bandera -d corre el contenedor en modo separado, lo que significa que se ejecuta en segundo plano.

Para acceder a la base de datos PostgreSQL, puedes usar cualquier cliente PostgreSQL con los siguientes detalles de conexión:
 - Host: localhost
 - Port: 5432
 - User: postgres
 - Password: password
 - Database: mydatabase

Por favor, reemplaza User, Password y Database con el usuario, la contraseña y el nombre de la base de datos reales especificados en tu archivo .env.

Para detener el contenedor Docker, ejecuta el siguiente comando:
```
docker-compose down
```

## Migraciones de base de datos

El proyecto usa Prisma para gestionar el esquema de PostgreSQL. Tras clonar el repositorio y arrancar Docker, aplica las migraciones desde el directorio `backend/`:

```sh
cd backend
npx prisma migrate dev
npm run prisma:generate
```

Esto crea las tablas `Candidate`, `Education`, `WorkExperience` y `User`, y regenera el Prisma Client.

## Funcionalidad: Añadir candidato

La primera historia de usuario implementada es **Añadir candidato al sistema**.

- Endpoint: `POST /api/candidates` (`multipart/form-data`).
- Campos: `firstName`, `lastName`, `email`, `phone`, `address`, `educations` (array JSON-encoded, al menos un elemento), `workExperiences` (array JSON-encoded, opcional), `cv` (PDF o DOCX, máx. 5 MB).
- Respuestas: `201 Created`, `400 VALIDATION_ERROR`, `400 INVALID_FILE_TYPE`, `409 EMAIL_ALREADY_EXISTS`, `413 FILE_TOO_LARGE`, `500 INTERNAL_ERROR`. Formato del cuerpo de error: `{ "error": { "code", "message", "details?" } }`.
- Documentación interactiva de la API: http://localhost:3010/api/docs (Swagger UI).
- Los CVs subidos se almacenan en `backend/uploads/cvs/` (ignorado por git) con un nombre aleatorio basado en UUID; la base de datos solo guarda metadatos.
- CORS está habilitado para `http://localhost:3000`, de modo que el frontend de desarrollo puede llamar al backend.

El frontend ofrece un dashboard con un botón "Añadir candidato" que abre el formulario, valida los datos en el cliente, los envía al backend y muestra un alert de éxito o error.

### Variable de entorno del frontend

El frontend lee la URL base del backend de `REACT_APP_API_BASE_URL`, con valor por defecto `http://localhost:3010`. Para apuntar a otra URL, crea un fichero `frontend/.env`:

```sh
REACT_APP_API_BASE_URL=http://mi-backend.example.com
```

## Tests

Backend (requiere el contenedor de Postgres arrancado, los tests usan la base de datos real):

```sh
cd backend
npm test
```

Frontend (no necesita el backend — `fetch` está mockeado):

```sh
cd frontend
npm test
```
