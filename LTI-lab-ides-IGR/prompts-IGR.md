# Prompts

## Prompt 1

Agent: Sonnet 4.6

### Pregunta:

¿puedes leer este proyecto "AI4Devs-lab-ides-2604" y crear un AGENTS.md?

### Respuesta:

Ha generado el fichero AGENTS.md

</br>

## Prompt 2: meta-prompt

Agent: Sonnet 4.6

### Pregunta:

Instrucciones

Eres un experto en prompt engineering. Dado el siguiente prompt, preparalo usando las mejores practicas de estructura (rol, objetivo, ...) y formato para conseguir un resultado preciso y exhaustivo. Ciñete solo al objetivo pedido analizando bien lo que se pide en el prompt original. El agente, debe utilizar AGENTS.md como información base del proyecto.

Prompt original:

Historia de Usuario: Añadir Candidato al Sistema Como reclutador, Quiero tener la capacidad de añadir candidatos al sistema ATS, Para que pueda gestionar sus datos y procesos de selección de manera eficiente.

Criterios de Aceptación:

1.  Accesibilidad de la función: Debe haber un botón o enlace claramente visible para añadir un nuevo candidato desde la página principal del dashboard del reclutador.

2.  Formulario de ingreso de datos: Al seleccionar la opción de añadir candidato, se debe presentar un formulario que incluya los campos necesarios para capturar la información del candidato como nombre, apellido, correo electrónico, teléfono, dirección, educación y experiencia laboral.

3.  Validación de datos: El formulario debe validar los datos ingresados para asegurar que son completos y correctos. Por ejemplo, el correo electrónico debe tener un formato válido y los campos obligatorios no deben estar vacíos.

4.  Carga de documentos: El reclutador debe tener la opción de cargar el CV del candidato en formato PDF o DOCX.

5.  Confirmación de añadido: Una vez completado el formulario y enviada la información, debe aparecer un mensaje de confirmación indicando que el candidato ha sido añadido exitosamente al sistema.

6.  Errores y manejo de excepciones: En caso de error (por ejemplo, fallo en la conexión con el servidor), el sistema debe mostrar un mensaje adecuado al usuario para informarle del problema.

7.  Accesibilidad y compatibilidad: La funcionalidad debe ser accesible y compatible con diferentes dispositivos y navegadores web.

Notas:

- La interfaz debe ser intuitiva y fácil de usar para minimizar el tiempo de entrenamiento necesario para los nuevos reclutadores.
- Considerar la posibilidad de integrar funcionalidades de autocompletado para los campos de educación y experiencia laboral, basados en datos preexistentes en el sistema.

Tareas Técnicas:

- Implementar la interfaz de usuario para el formulario de añadir candidato.
- Desarrollar el backend necesario para procesar la información ingresada en el formulario.
- Asegurar la seguridad y privacidad de los datos del candidato.

Como ves, hay 3 tareas técnicas necesarias: desarrollar el backend, el frontend y la base de datos. Dado que no hay nada aún en el proyecto base, requerirá tareas extra como crear el modelo de datos, lanzar la migración en PostgreSQL, etc.

Define primero los 3 tickets de trabajo a fondo, para usarlos como input para el asistente de código.

### Respuesta:

Prompt: Definición de tickets de trabajo – Historia "Añadir Candidato al Sistema"

1. Rol Actúa como Tech Lead full-stack con experiencia en sistemas ATS, Node.js/Express, React y PostgreSQL. Tu salida será leída por otro asistente de código que implementará los tickets uno a uno, así que la precisión técnica y la falta de ambigüedad son críticas.

2. Contexto del proyecto Antes de empezar, lee y usa como única fuente de verdad sobre el estado del proyecto el archivo AGENTS.md de la raíz del repositorio. De ahí debes extraer: stack, estructura de directorios, comandos, convenciones de código, variables de entorno, estado de tests y notas operativas (Docker, Prisma, Windows/PowerShell, etc.).

Resumen relevante (verifícalo contra AGENTS.md antes de asumir nada):

Monorepo con backend/ (Express + TypeScript + Prisma) y frontend/ (React 18 + TypeScript, CRA). PostgreSQL vía docker-compose.yml. Estado actual: esqueleto. Backend solo expone GET /. Frontend es el template de CRA. Modelo Prisma User con id, email, name — no existe aún el modelo Candidate ni endpoints relacionados. Swagger (swagger-jsdoc, swagger-ui-express) instalado pero no cableado. 3. Objetivo Definir tres (3) tickets de trabajo exhaustivos y autocontenidos que cubran completamente la Historia de Usuario "Añadir Candidato al Sistema" (incluida más abajo). Los tickets deben servir como input directo para un asistente de código: cada uno debe poder ejecutarse sin necesidad de hacer preguntas adicionales al humano.

Los tres tickets son:

TKT-1 — Base de datos: modelo de datos del candidato, migración Prisma sobre PostgreSQL, seed/datos de prueba si aplica. TKT-2 — Backend: endpoint(s) REST para crear candidato, validación, manejo de subida de CV (PDF/DOCX), errores, seguridad y documentación Swagger. TKT-3 — Frontend: botón en dashboard, formulario, validaciones cliente, subida de CV, mensajes de éxito/error, accesibilidad y responsividad. 4. Alcance y restricciones Solo definir tickets, no implementar código. No incluyas código completo; sí pseudocódigo, contratos de API, esquemas, snippets cortos ilustrativos cuando aporten claridad. Respeta las convenciones declaradas en AGENTS.md (Prettier: comillas simples y trailingComma: "all"; TS estricto; tests con Jest/Supertest en backend y Jest en frontend). Los tres tickets deben ser coherentes entre sí: el contrato de API definido en TKT-2 debe coincidir exactamente con el modelo de TKT-1 y con lo que consume TKT-3. Identifica explícitamente las dependencias entre tickets y el orden recomendado de ejecución. No introduzcas dependencias nuevas sin justificarlas (librería de validación, multer para uploads, react-hook-form, etc.). Si añades una, indica versión sugerida y razón. Asume entorno de desarrollo Windows + PowerShell para los comandos. No inventes funcionalidad fuera del alcance de la HU (no auth, no listado, no edición, no borrado — salvo que la HU lo exija). 5. Historia de Usuario (input) Como reclutador, Quiero tener la capacidad de añadir candidatos al sistema ATS, Para que pueda gestionar sus datos y procesos de selección de manera eficiente.

Criterios de aceptación:

Botón/enlace visible para añadir candidato desde el dashboard del reclutador. Formulario con: nombre, apellido, correo, teléfono, dirección, educación y experiencia laboral. Validación de datos (email válido, obligatorios no vacíos, etc.). Subida de CV en PDF o DOCX. Mensaje de confirmación al añadir con éxito. Manejo de errores con mensajes claros al usuario. Accesibilidad y compatibilidad multi-dispositivo/navegador. Notas: interfaz intuitiva; considerar autocompletado en educación/experiencia basado en datos preexistentes.

Tareas técnicas declaradas: UI del formulario, backend para procesar el formulario, seguridad y privacidad de datos.

6. Formato de salida (obligatorio) Devuelve exactamente la siguiente estructura en Markdown, sin texto adicional fuera de ella:

Resumen ejecutivo 3–5 bullets que describan la solución global y las decisiones técnicas clave (p. ej., dónde se guarda el CV, librería de validación elegida, estrategia de manejo de errores). Diagrama ASCII opcional del flujo Frontend → Backend → DB. Tabla de dependencias y orden de ejecución entre tickets. TKT-1 — Base de datos: modelo Candidate y migración ID / Título Tipo: Backend / DB Prioridad y estimación (S/M/L o puntos) Objetivo (1–2 frases) Contexto y dependencias (referencia a archivos de AGENTS.md) Descripción técnica: Modelo Prisma propuesto (esquema completo de Candidate y entidades relacionadas como Education, WorkExperience si aplica), con tipos, restricciones, índices y relaciones. Comandos a ejecutar (prisma migrate dev, nombre de la migración, etc.). Estrategia de almacenamiento del CV (ruta en disco vs. bytea vs. referencia a object storage) — justifica la elección. Criterios de aceptación técnicos (checklist verificable). Pruebas / verificación (cómo comprobar manualmente que la migración aplica). Riesgos y mitigaciones. Notas de seguridad/privacidad (PII, GDPR si aplica). TKT-2 — Backend: endpoint para crear candidato Mismos apartados que TKT-1, más:

Contrato de API (método, ruta, headers, request body, content-type para multipart, response 201, errores 400/409/500 con ejemplos JSON). Validaciones servidor (campo a campo: tipo, longitud, formato, obligatoriedad). Manejo de archivos (límite de tamaño, MIME types aceptados, nombre del campo multipart, ruta destino, naming convention). Estructura de archivos a crear/modificar en backend/src/ (controllers, routes, services, validators, middlewares). Tests Jest + Supertest a incluir (lista de casos: happy path, validaciones, archivo inválido, archivo demasiado grande, conflicto de email). Documentación Swagger (cómo cablearla — recuerda que las deps ya están instaladas pero no usadas). TKT-3 — Frontend: dashboard, formulario y subida de CV Mismos apartados que TKT-1, más:

Componentes React a crear (jerarquía y responsabilidad de cada uno). Estructura de archivos en frontend/src/ (carpetas components/, pages/, services/, hooks/ según convenga). Estrategia de manejo de estado y formulario (useState propio vs. librería — justifica). Validaciones cliente (campo a campo, mensajes de error mostrados al usuario). Llamada a API (servicio HTTP, manejo de FormData para CV, manejo de loading/success/error states). Accesibilidad (labels, aria-\*, navegación por teclado, contraste, foco). Responsividad (breakpoints, comportamiento mobile). Tests Jest/RTL (lista de casos). Decisión sobre autocompletado de educación/experiencia (incluir vs. diferir a futuro — justifica). Anexo: criterios de aceptación de la HU → mapeo a tickets Tabla con una fila por criterio de aceptación (1 a 7) y columnas indicando qué ticket(s) lo cubren y cómo.

7. Criterios de calidad (autoevalúa antes de devolver) ✅ Cada ticket es autocontenido: un desarrollador podría empezar sin pedir aclaraciones. ✅ Los contratos (modelo, API, formulario) son consistentes entre los tres tickets. ✅ Las decisiones técnicas tienen justificación explícita, no son arbitrarias. ✅ Los 7 criterios de aceptación de la HU están cubiertos y trazados en el anexo. ✅ Se respetan las convenciones y restricciones declaradas en AGENTS.md. ✅ No hay código de implementación completo, solo el detalle necesario para guiar al implementador.

</br>

## Prompt 3:

Agent: Sonnet 4.6

### Pregunta:

Cargamos la respuesta del meta-prompt

### Respuesta:

Modelo de datos normalizado: una tabla Candidate (1:N) con Education y WorkExperience en tablas separadas para permitir múltiples entradas y futuras búsquedas/autocompletado. El CV se referencia desde Candidate como ruta relativa + metadata. CV en disco local bajo backend/uploads/cvs/ con nombre aleatorio (UUID + extensión original) — la BD guarda solo cvFileName, cvOriginalName, cvMimeType, cvSize. Justificación: el lab no tiene S3/MinIO; bytea infla la BD y rompe backups; disco local es la opción más simple y reversible para escalar después a object storage. Validación: zod@^3.23.8 en backend (schema + inferencia de tipos TS, alineado con strict: true). Frontend usa useState + hook propio useCandidateForm (formulario único y plano; añadir react-hook-form no se justifica para un solo formulario). Subida multipart con multer@^1.4.5-lts.1 (de-facto en Express) + @types/multer y uuid@^9.0.1 (@types/uuid) para nombres únicos. Es la única familia de dependencias nuevas en backend. Errores estandarizados con un middleware de error: { error: { code, message, details? } }. Swagger se cablea bajo /api/docs reutilizando las deps ya instaladas. Autocompletado de educación/experiencia se difiere (no es criterio de aceptación bloqueante y exige endpoints adicionales fuera del alcance).

+--------------------+ POST /api/candidates +--------------------+ prisma.candidate.create | | (multipart/form-data) | | (con nested writes) | React 18 (CRA) | ───────────────────────────────────▶ | Express + TS | ──────────────────────────────▶ PostgreSQL | AddCandidate page | cv: File (PDF/DOCX, ≤5MB) | multer + zod | Candidate + Education[] | useCandidateForm | ◀─────────────────────────────────── | Prisma 5.13 | + WorkExperience[] | candidatesApi.ts | 201 { id, ... } | 4xx { error } | Swagger /api/docs | +--------------------+ +--------------------+ │ └──▶ disk: backend/uploads/cvs/<uuid>.<ext> Dependencias y orden de ejecución Orden Ticket Depende de Puede paralelizarse con Bloquea a 1 TKT-1 Base de datos — — TKT-2 (necesita modelo + cliente Prisma) 2 TKT-2 Backend TKT-1 (modelo y migración aplicada) Setup inicial de TKT-3 (estructura + stubs) si se mockea el endpoint TKT-3 (consumo real del endpoint) 3 TKT-3 Frontend TKT-2 (contrato API estable) — — TKT-1 — Base de datos: modelo Candidate y migración Prisma ID / Título: TKT-1 — Modelo Candidate + Education + WorkExperience y migración inicial Tipo: Backend / DB Prioridad: Alta — Estimación: S (≈ 0.5 día) Objetivo: Crear el modelo de datos del candidato (con educación y experiencia laboral como entidades relacionadas) y aplicar la migración Prisma sobre la PostgreSQL del docker-compose.yml, dejando la BD lista para que TKT-2 escriba registros. Contexto y dependencias Lee AGENTS.md (secciones Estructura, Comandos clave, Variables de entorno, Notas para agentes). Esquema actual: solo User en backend/prisma/schema.prisma:16-20. No tocar User. BD corre vía docker-compose.yml; credenciales en backend/.env. Antes de migrar: docker-compose up -d desde la raíz. Descripción técnica Esquema Prisma propuesto (añadir al final de backend/prisma/schema.prisma; no modificar User):

model Candidate { id Int @id @default(autoincrement()) firstName String @db.VarChar(80) lastName String @db.VarChar(80) email String @unique @db.VarChar(254) phone String @db.VarChar(30) address String @db.VarChar(255) cvFileName String @db.VarChar(255) // nombre en disco (uuid.ext) cvOriginalName String @db.VarChar(255) // nombre original subido cvMimeType String @db.VarChar(100) cvSize Int // bytes createdAt DateTime @default(now()) updatedAt DateTime @updatedAt educations Education[] workExperiences WorkExperience[]

@@index([lastName, firstName]) }

model Education { id Int @id @default(autoincrement()) candidateId Int institution String @db.VarChar(150) degree String @db.VarChar(150) fieldOfStudy String? @db.VarChar(150) startDate DateTime @db.Date endDate DateTime? @db.Date candidate Candidate @relation(fields: [candidateId], references: [id], onDelete: Cascade)

@@index([candidateId]) }

model WorkExperience { id Int @id @default(autoincrement()) candidateId Int company String @db.VarChar(150) position String @db.VarChar(150) description String? @db.VarChar(2000) startDate DateTime @db.Date endDate DateTime? @db.Date // null = actualmente trabajando candidate Candidate @relation(fields: [candidateId], references: [id], onDelete: Cascade)

@@index([candidateId]) } Decisiones y justificaciones:

email @unique → soporta el 409 Conflict definido en TKT-2. Education/WorkExperience como tablas, no JSON: permite indexado por institution/company, facilita el futuro autocompletado (HU notas) sin migración destructiva. onDelete: Cascade → si en el futuro se borra un candidato, sus hijos se van con él (la HU no exige delete, pero la integridad referencial debe ser correcta desde el inicio). Solo cv\* metadata en BD; el archivo vive en disco (ver decisión en Resumen ejecutivo). Comandos a ejecutar (PowerShell, desde backend/):

# 1. Asegurar Postgres arriba (desde raíz del repo)

docker-compose up -d

# 2. Generar y aplicar migración (desde backend/)

npx prisma migrate dev --name add_candidate_education_workexperience

# 3. Regenerar cliente (idempotente; migrate dev ya lo hace, lo dejamos por contrato AGENTS.md)

npm run prisma:generate Estrategia de almacenamiento del CV: ruta en disco bajo backend/uploads/cvs/<uuid>.<ext>. Comparativa:

Opción Pros Contras Decisión Disco local Simple, rápido, sin deps No portable entre instancias ✅ Elegida bytea en Postgres Transaccional, en backup Infla DB, hace dumps caros, mal patrón en Prisma ❌ S3/MinIO Escalable, recomendado en prod Requiere infra extra fuera del scope del lab ❌ Diferido Añadir a .gitignore la línea backend/uploads/ (se crea como parte de TKT-2; no se versiona contenido).

Criterios de aceptación técnicos schema.prisma contiene los 3 modelos exactos arriba (campos, tipos, índices, relaciones). npx prisma migrate dev --name add_candidate_education_workexperience se ejecuta sin errores y crea las tres tablas. La carpeta backend/prisma/migrations/<timestamp>\_add_candidate_education_workexperience/ existe con migration.sql versionado. User queda intacto (no aparece en el migration.sql salvo como contexto). prisma:generate se ejecuta limpio y el PrismaClient expone prisma.candidate, prisma.education, prisma.workExperience. Pruebas / verificación manual

# Conectarse al contenedor y comprobar tablas

docker exec -it $(docker ps -qf "ancestor=postgres") psql -U LTIdbUser -d LTIdb -c "\dt"

# Debe listar: Candidate, Education, WorkExperience, User, \_prisma_migrations

docker exec -it $(docker ps -qf "ancestor=postgres") psql -U LTIdbUser -d LTIdb -c "\d \"Candidate\""

# Verificar columnas, tipos y el UNIQUE en email

Riesgos y mitigaciones Contenedor no arrancado → migrate dev falla con error de conexión. Mitigación: documentado en comandos (docker-compose up -d previo). Migración en repo compartido → renombrar la migración después rompe el historial. Mitigación: usar el nombre exacto sugerido. Conflicto con migraciones futuras del campo email también en User: ambos @unique independientes, sin colisión. Notas de seguridad/privacidad firstName, lastName, email, phone, address son PII. No deben loggearse en backend (ver TKT-2: middleware de error sanea cuerpos). El CV puede contener datos especiales (foto, fecha de nacimiento). Los archivos en disco deben tener permisos restringidos del usuario que corre Node y la carpeta no se sirve estática (ver TKT-2). GDPR: cuando se implemente delete en el futuro, el onDelete: Cascade y un job de limpieza de backend/uploads/cvs/ permitirán cumplir derecho al olvido. TKT-2 — Backend: endpoint para crear candidato ID / Título: TKT-2 — POST /api/candidates con subida de CV, validación, errores y Swagger Tipo: Backend Prioridad: Alta — Estimación: M (≈ 1–1.5 días) Objetivo: Implementar el endpoint POST /api/candidates que recibe el formulario multipart (datos + CV), valida con zod, persiste con Prisma (incluyendo educación y experiencias) y devuelve 201 con el candidato creado. Cablear Swagger. Contexto y dependencias Depende de TKT-1 aplicado (modelos Candidate, Education, WorkExperience y migración). Punto de entrada actual: backend/src/index.ts — exporta app (necesario para Supertest, ver AGENTS.md Tests). Convenciones: TS estricto, Prettier comillas simples + trailingComma: 'all' (backend/.prettierrc). Tests en backend/src/tests/. Swagger: swagger-jsdoc y swagger-ui-express ya en backend/package.json, no cableados. Dependencias nuevas (justificadas) Paquete Versión Razón multer ^1.4.5-lts.1 Estándar de facto para multipart en Express; LTS estable @types/multer ^1.4.11 Tipos para TS estricto zod ^3.23.8 Validación + inferencia de tipos TS; alternativa a express-validator con mejor DX en TS uuid ^9.0.1 Nombre único de archivo para evitar colisiones y exposición del nombre original @types/uuid ^9.0.8 Tipos Comando (PowerShell, desde backend/):

npm install multer zod uuid npm install -D @types/multer @types/uuid Contrato de API POST /api/candidates

Headers: Content-Type: multipart/form-data Body (multipart fields): firstName (string, requerido, 1–80) lastName (string, requerido, 1–80) email (string, requerido, RFC 5322 simplificado, ≤254) phone (string, requerido, regex ^\+?[0-9\s\-()]{6,30}$) address (string, requerido, 1–255) educations (string JSON, requerido, array, mínimo 1): [{ institution, degree, fieldOfStudy?, startDate (ISO yyyy-mm-dd), endDate? }] workExperiences (string JSON, requerido, array, mínimo 0): [{ company, position, description?, startDate, endDate? }] cv (File, requerido, ver Manejo de archivos) 201 Created:

{ "id": 12, "firstName": "Ana", "lastName": "García", "email": "ana@example.com", "phone": "+34 600 000 000", "address": "Calle Falsa 123, Madrid", "cvOriginalName": "ana_garcia_cv.pdf", "cvMimeType": "application/pdf", "cvSize": 184320, "educations": [{ "id": 21, "institution": "UPM", "degree": "Ing. Informática", "fieldOfStudy": null, "startDate": "2015-09-01", "endDate": "2019-06-30" }], "workExperiences": [{ "id": 31, "company": "Acme", "position": "Backend Dev", "description": null, "startDate": "2019-07-01", "endDate": null }], "createdAt": "2026-05-18T10:00:00.000Z", "updatedAt": "2026-05-18T10:00:00.000Z" } Errores (formato unificado):

{ "error": { "code": "VALIDATION_ERROR", "message": "Datos inválidos", "details": [{ "path": "email", "message": "Email inválido" }] } } Status code Cuándo 400 VALIDATION_ERROR zod falla, JSON malformado en educations/workExperiences, falta CV 400 INVALID_FILE_TYPE MIME ≠ PDF/DOCX 413 FILE_TOO_LARGE CV > 5 MB 409 EMAIL_ALREADY_EXISTS Prisma P2002 sobre email 500 INTERNAL_ERROR Cualquier otro (con stack en logs, mensaje genérico al cliente) Validaciones servidor (zod schema) firstName/lastName: z.string().trim().min(1).max(80) email: z.string().trim().toLowerCase().email().max(254) phone: z.string().trim().regex(/^\+?[0-9\s\-()]{6,30}$/)
address: z.string().trim().min(1).max(255)
educations: z.array(educationSchema).min(1) (al menos una educación, alineado con criterio HU)
workExperiences: z.array(workExperienceSchema) (0 o más)
educationSchema/workExperienceSchema: campos min(1).max(150), fechas z.coerce.date(), endDate >= startDate cuando exista.
Manejo de archivos
Campo multipart: cv (único archivo).
MIME permitidos: application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document.
Validación doble: MIME declarado + extensión (.pdf/.docx). Rechazar si discrepan.
Tamaño máx.: 5 MB (5 * 1024 * 1024 bytes) configurado en multer.limits.fileSize.
Destino: backend/uploads/cvs/ (crear con fs.mkdirSync({ recursive: true }) al boot).
Nombre: ${uuidv4()}${path.extname(originalname)} — nunca usar el originalname del cliente. No exponer estáticamente la carpeta uploads/. El download de CV no está en el alcance de la HU. Rollback: si Prisma falla tras guardar el archivo, borrar el archivo del disco (try/finally en el service). Estructura de archivos a crear/modificar en backend/src/

backend/src/ ├── index.ts (MOD: importar router de candidates + Swagger + error middleware) ├── routes/ │ └── candidates.routes.ts (NUEVO: POST /api/candidates + JSDoc Swagger) ├── controllers/ │ └── candidates.controller.ts (NUEVO: orquesta validación + service + respuesta) ├── services/ │ └── candidates.service.ts (NUEVO: prisma.candidate.create con nested educations/workExperiences; rollback CV) ├── validators/ │ └── candidate.schema.ts (NUEVO: zod schemas + parseo de educations/workExperiences desde string JSON) ├── middlewares/ │ ├── upload.middleware.ts (NUEVO: configura multer con disk storage, limits, fileFilter) │ └── error.middleware.ts (NUEVO: mapea ZodError/MulterError/PrismaClientKnownRequestError → JSON estándar) ├── lib/ │ └── prisma.ts (NUEVO: singleton de PrismaClient; mover desde index.ts) ├── config/ │ └── swagger.ts (NUEVO: setup de swagger-jsdoc + swagger-ui-express en /api/docs) └── tests/ └── candidates.test.ts (NUEVO: Supertest) backend/uploads/cvs/ se crea en runtime y se añade a .gitignore (raíz). Mover PrismaClient a lib/prisma.ts desacopla y facilita los tests.

Pseudocódigo del controller (ilustrativo, no implementación)

// candidates.controller.ts export const createCandidate = async (req: Request, res: Response, next: NextFunction) => { try { if (!req.file) throw new ValidationError('cv es obligatorio'); const parsed = candidateInputSchema.parse({ ...req.body, educations: JSON.parse(req.body.educations ?? '[]'), workExperiences: JSON.parse(req.body.workExperiences ?? '[]'), }); const candidate = await createCandidateService(parsed, req.file); res.status(201).json(candidate); } catch (err) { next(err); } }; Tests Jest + Supertest (en backend/src/tests/candidates.test.ts) Importan app desde index.ts (AGENTS.md Tests). Limpian Candidate/Education/WorkExperience y uploads/cvs/ entre tests.

Happy path: payload completo + PDF válido → 201 con shape exacta y registro en BD. Happy path DOCX: mismo flujo con .docx real → 201. Validación – email inválido → 400 VALIDATION_ERROR con details[0].path === 'email'. Validación – campo obligatorio vacío (firstName) → 400 VALIDATION_ERROR. Validación – educations vacío → 400 VALIDATION_ERROR. Validación – educations JSON malformado → 400 VALIDATION_ERROR. CV ausente → 400 VALIDATION_ERROR con mensaje "cv es obligatorio". Tipo de archivo inválido (.txt) → 400 INVALID_FILE_TYPE. Archivo > 5 MB → 413 FILE_TOO_LARGE. Email duplicado → 409 EMAIL_ALREADY_EXISTS. Rollback de archivo cuando Prisma falla (mock que lanza tras escritura): archivo no queda huérfano en uploads/cvs/. Swagger disponible: GET /api/docs → 200 con text/html. Documentación Swagger (cómo cablear) Crear config/swagger.ts con swaggerJsdoc({ definition: { openapi: '3.0.0', info: { title: 'LTI ATS API', version: '1.0.0' } }, apis: ['./src/routes/*.ts'] }). En index.ts: app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)). En candidates.routes.ts, documentar el endpoint con JSDoc @openapi describiendo request multipart, los 5 códigos de estado y el schema de error. Criterios de aceptación técnicos POST /api/candidates responde 201 con el contrato definido para payload válido. GET /api/docs muestra el endpoint y los códigos de error. Los 12 tests pasan (npm test desde backend/). Lint/Prettier limpios (comillas simples, trailingComma: 'all'). No se loggean campos PII (email, phone, address) ni el contenido del CV. app sigue exportándose desde index.ts para Supertest. Pruebas / verificación manual

# Desde backend/, con docker-compose up y npm run dev corriendo:

curl.exe -X POST http://localhost:3010/api/candidates `  -F "firstName=Ana" -F "lastName=García" -F "email=ana@example.com"` -F "phone=+34600000000" -F "address=Calle Falsa 123" `  -F 'educations=[{"institution":"UPM","degree":"Ing","startDate":"2015-09-01","endDate":"2019-06-30"}]'` -F 'workExperiences=[]' ` -F "cv=@./sample.pdf"

# Esperado: 201 + JSON con id. Repetir → 409.

Riesgos y mitigaciones Race condition en email duplicado (dos requests simultáneos) → confiar en @unique de Prisma y mapear P2002 a 409. Archivo huérfano si crash entre multer y prisma.create → service usa try/catch y borra req.file.path en error. Inyección por nombre de archivo (path traversal) → ignoramos originalname para el disco; persiste solo como metadata. DoS por uploads grandes → multer.limits aborta antes de leer el archivo entero. Notas de seguridad/privacidad Error middleware sanea details para no incluir valores del usuario (solo path y message). uploads/ no es estático: no hay endpoint público para descargar CVs en este ticket. Logs: usar console.error solo con err.stack, nunca con req.body ni req.file.buffer. En el futuro: cifrado en reposo del filesystem y/o move a object storage con KMS. TKT-3 — Frontend: dashboard, formulario y subida de CV ID / Título: TKT-3 — Página "Añadir Candidato" + acceso desde dashboard Tipo: Frontend Prioridad: Alta — Estimación: M (≈ 1–1.5 días) Objetivo: Sustituir el template de CRA por un dashboard mínimo con un botón "Añadir candidato" que abre el formulario, valida en cliente, envía multipart/form-data al endpoint de TKT-2 y muestra confirmación o errores claros. Contexto y dependencias Depende de TKT-2 (contrato del endpoint estable). Estado actual: frontend/src/App.tsx es el template CRA. Jest configurado manualmente en frontend/jest.config.js, tests en frontend/src/tests/. Backend en http://localhost:3010. No hay proxy CRA configurado: la app debe usar URL absoluta vía variable REACT_APP_API_BASE_URL con fallback http://localhost:3010. Dependencias nuevas (justificadas) Ninguna nueva en runtime: el formulario es plano y único; añadir react-hook-form/formik no se justifica para 5 campos + 2 listas dinámicas. Usaremos useState + un hook propio useCandidateForm. fetch nativo (no añadir axios). Para tests: ya están instalados @testing-library/react, @testing-library/jest-dom, @testing-library/user-event. Estructura de archivos en frontend/src/

frontend/src/ ├── App.tsx (MOD: render del DashboardPage; quita el template CRA) ├── pages/ │ ├── DashboardPage.tsx (NUEVO: header + botón "Añadir candidato" → navega a /candidates/new) │ └── AddCandidatePage.tsx (NUEVO: orquesta CandidateForm + estados loading/success/error) ├── components/ │ ├── CandidateForm/ │ │ ├── CandidateForm.tsx (NUEVO: formulario principal) │ │ ├── EducationList.tsx (NUEVO: array dinámico, add/remove) │ │ ├── WorkExperienceList.tsx (NUEVO: array dinámico, add/remove) │ │ ├── CvUpload.tsx (NUEVO: <input type="file"> + preview nombre/tamaño) │ │ └── FormField.tsx (NUEVO: label + input + mensaje de error; aria-\* correcto) │ └── ui/ │ ├── Button.tsx (NUEVO: variantes primary/secondary) │ └── Alert.tsx (NUEVO: success/error con role="status"/"alert") ├── hooks/ │ └── useCandidateForm.ts (NUEVO: state + validaciones + handler de submit) ├── services/ │ └── candidatesApi.ts (NUEVO: createCandidate(formData) → fetch al backend) ├── types/ │ └── candidate.ts (NUEVO: tipos espejo del contrato API) └── tests/ ├── CandidateForm.test.tsx (NUEVO) ├── AddCandidatePage.test.tsx (NUEVO) └── candidatesApi.test.ts (NUEVO) No se introduce router para no añadir react-router-dom: DashboardPage y AddCandidatePage se conmutan con un useState<'dashboard' | 'add'> en App.tsx. Es proporcionado al alcance HU (una única pantalla extra) y reversible cuando se añada routing real.

Componentes — jerarquía y responsabilidad

App └── DashboardPage → muestra "Bienvenido reclutador" + <Button>Añadir candidato</Button> └── AddCandidatePage → contiene <CandidateForm />, estados ui (idle/loading/success/error), <Alert> └── CandidateForm → renderiza FormField × N, EducationList, WorkExperienceList, CvUpload ├── FormField → input controlado, mensaje de error, aria-describedby ├── EducationList → array de Education; "+ Añadir educación" / "Eliminar" (mín. 1) ├── WorkExperienceList → array de WorkExperience (mín. 0) └── CvUpload → input file, valida extensión y tamaño en cliente, muestra nombre Estrategia de manejo de estado y formulario useState + useCandidateForm: useCandidateForm expone { values, errors, touched, setField, addEducation, removeEducation, addExperience, removeExperience, validate, reset }. Validación campo a campo se ejecuta onBlur y onChange tras primer blur. Submit revalida todo, devuelve booleano. Justificación: una única pantalla, pocos campos, sin necesidad de re-render performance avanzado ni schemas reutilizables → coste/beneficio de react-hook-form no se justifica. Validaciones cliente (espejo del backend, mensajes UX-friendly) Campo Regla Mensaje firstName, lastName requerido, 1–80 "Introduce el nombre" / "Introduce el apellido" email requerido, regex ^[^\s@]+@[^\s@]+\.[^\s@]+$, ≤254	"Introduce un email válido"
phone	requerido, regex ^\+?[0-9\s\-()]{6,30}$ "Teléfono no válido (6–30 dígitos)" address requerido, 1–255 "Introduce la dirección" educations ≥ 1; cada item: institution, degree, startDate requeridos; endDate >= startDate si existe "Añade al menos una formación" / "Fecha fin anterior a inicio" workExperiences 0+; misma regla de fechas si endDate existe "Fecha fin anterior a inicio" cv requerido; extensión .pdf o .docx; tamaño ≤ 5 MB "Adjunta el CV (PDF o DOCX, máx. 5 MB)" / "Formato no permitido" / "El archivo supera 5 MB" Llamada a API (services/candidatesApi.ts)

export async function createCandidate(input: CandidateInput, cv: File): Promise<CandidateResponse> { const fd = new FormData(); fd.append('firstName', input.firstName); // ... resto de campos planos fd.append('educations', JSON.stringify(input.educations)); fd.append('workExperiences', JSON.stringify(input.workExperiences)); fd.append('cv', cv); const res = await fetch(`${API_BASE_URL}/api/candidates`, { method: 'POST', body: fd }); if (!res.ok) { const body = await res.json().catch(() => ({})); throw new ApiError(res.status, body?.error?.code ?? 'UNKNOWN', body?.error?.message ?? 'Error', body?.error?.details); } return res.json(); } Estados UI en AddCandidatePage: idle | submitting | success | error. Botón deshabilitado en submitting. success muestra <Alert role="status">Candidato añadido correctamente</Alert> y ofrece "Añadir otro" o "Volver al dashboard". error muestra <Alert role="alert"> con mensaje del backend mapeado: EMAIL_ALREADY_EXISTS → "Ya existe un candidato con este email" INVALID_FILE_TYPE → "Formato de CV no permitido (PDF o DOCX)" FILE_TOO_LARGE → "El CV supera el tamaño permitido (5 MB)" VALIDATION_ERROR → resaltar campos con details[].path y mostrar mensaje genérico otro / network → "No se pudo añadir el candidato. Inténtalo de nuevo." Accesibilidad Cada <input> con <label htmlFor> asociado (vía FormField). aria-required="true" en campos obligatorios. Mensajes de error vinculados con aria-describedby="<id>-error" y aria-invalid="true" cuando aplique. <Alert> de éxito con role="status" y aria-live="polite"; el de error con role="alert" y aria-live="assertive". Navegación por teclado: orden lógico de tabulación; botón submit accesible por Enter; "Eliminar educación/experiencia" alcanzable por Tab con aria-label="Eliminar formación 2". Contraste WCAG AA: paleta con ratios ≥ 4.5:1 (texto) y ≥ 3:1 (UI). Foco visible (no outline: none). <CvUpload> con aria-describedby al texto de ayuda ("PDF o DOCX, máx. 5 MB"). Responsividad Mobile-first, CSS modules o CSS plano (sin nuevas deps de styling). Breakpoints: ≤480px (mobile), 481–1024px (tablet), ≥1025px (desktop). Mobile: 1 columna, listas de educación/experiencia colapsables con <details>/<summary> semántico. Desktop: 2 columnas para campos cortos (nombre/apellido, teléfono/email). Botones full-width en mobile, ancho intrínseco en desktop. Tests Jest/RTL (en frontend/src/tests/) Mock fetch global. No dependencias nuevas.

AddCandidatePage.test.tsx:

Renderiza el formulario con todos los campos. Submit con campos vacíos → muestra mensajes de error y no llama a fetch. Email inválido → mensaje "Introduce un email válido"; corregir lo limpia. CV con extensión .txt → error en cliente, no se envía. CV > 5 MB (mock File con size) → error en cliente. Happy path: rellena, sube PDF mock, submit → fetch recibe FormData con todos los campos y cv; mensaje de éxito visible. Backend devuelve 409 → muestra "Ya existe un candidato con este email". Backend devuelve 500 o red caída (fetch.mockRejectedValue) → muestra mensaje genérico de error. Durante submitting el botón está disabled (test por toBeDisabled). CandidateForm.test.tsx: 10. "+ Añadir educación" añade fila; "Eliminar" la quita; no se permite quedarse en 0 (botón eliminar deshabilitado si solo hay 1). 11. Validación de fechas: endDate < startDate muestra error.

candidatesApi.test.ts: 12. createCandidate arma FormData correcto y serializa educations/workExperiences como JSON strings. 13. Mapea respuesta de error a ApiError con code, status y details.

Decisión sobre autocompletado de educación/experiencia Diferido. Razones:

La HU lo lista como nota, no como criterio de aceptación. Requiere endpoints adicionales (GET /api/institutions, GET /api/companies) y datos preexistentes que el sistema aún no tiene. El modelo de TKT-1 ya está normalizado en tablas separadas, así que añadirlo después es no-breaking. Marcador // TODO: autocomplete en EducationList.tsx/WorkExperienceList.tsx y nota en el README para el siguiente sprint.

Pseudocódigo de configuración base URL

// frontend/src/services/candidatesApi.ts export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL ?? 'http://localhost:3010'; Documentar en README cómo cambiarlo vía frontend/.env con REACT_APP_API_BASE_URL=....

Criterios de aceptación técnicos App.tsx ya no muestra el template CRA; muestra DashboardPage. Desde el dashboard, un botón visible "Añadir candidato" lleva al formulario. El formulario valida los 7 campos (incluyendo educación, experiencia y CV) con mensajes claros. CV: solo permite .pdf/.docx, máx. 5 MB; valida en cliente antes de enviar. Submit exitoso muestra confirmación accesible (role="status") y permite añadir otro. Errores del backend se mapean a mensajes legibles; los de red muestran fallback genérico. Todos los tests de RTL pasan (npm test desde frontend/). Lighthouse accessibility ≥ 90 en la página del formulario. Navegación completa por teclado funciona y se ve el foco. Pruebas / verificación manual

# Asumiendo TKT-1 + TKT-2 aplicados y backend corriendo en :3010

cd frontend npm install npm start

# Abrir http://localhost:3000 → click "Añadir candidato" → rellenar → submit

# Probar también desde DevTools mobile emulation (375px) y con Tab para validar foco

Riesgos y mitigaciones CORS entre :3000 y :3010 → TKT-2 debe habilitar CORS o documentarlo. Acción: anotar en Notas operativas y, si TKT-2 no lo cubrió, añadir cors@^2.8.5 con app.use(cors({ origin: 'http://localhost:3000' })) (dependencia mínima, justificada por separación de orígenes). Diferencia de validación cliente/servidor → mantener tabla de reglas como única fuente de verdad; futuro: extraer schema compartido. CRA + TS 4.9 y compatibilidad de tipos al consumir tipos del backend → no se comparten tipos; se duplican en types/candidate.ts (alcance pequeño, aceptable). Notas de seguridad/privacidad No persistir el FormData ni los valores en localStorage/sessionStorage. No loggear en consola los valores del formulario en producción. El CV se sube directo al backend; el navegador no lo conserva. Indicar al usuario en el éxito que el archivo ha sido recibido y limpiar el <input type="file">. Anexo: criterios de aceptación de la HU → mapeo a tickets

# Criterio de aceptación TKT-1 (DB) TKT-2 (Backend) TKT-3 (Frontend) Cómo se cubre

1 Botón/enlace visible para añadir candidato desde el dashboard del reclutador — — ✅ DashboardPage con <Button>Añadir candidato</Button> que conmuta a AddCandidatePage 2 Formulario con nombre, apellido, email, teléfono, dirección, educación y experiencia laboral ✅ (modelo) ✅ (contrato) ✅ (UI) Candidate + Education[] + WorkExperience[] ↔ campos multipart ↔ CandidateForm con sub-listas 3 Validación de datos (email válido, obligatorios, etc.) ✅ (constraints @unique, VARCHAR limits) ✅ (zod schemas, 400 VALIDATION_ERROR) ✅ (validación campo a campo en useCandidateForm) Defensa en profundidad: cliente → servidor → BD 4 Subida de CV en PDF o DOCX ✅ (cvFileName/cvMimeType/cvSize) ✅ (multer + fileFilter + límites + storage en disco) ✅ (CvUpload con validación de extensión y tamaño) MIME y tamaño validados en cliente y servidor; archivo en backend/uploads/cvs/<uuid>.<ext> 5 Mensaje de confirmación al añadir con éxito — ✅ (201 Created con shape definido) ✅ (<Alert role="status"> y opción "Añadir otro") El frontend interpreta el 201 y renderiza el alert accesible 6 Manejo de errores con mensajes claros — ✅ (error middleware → 400/409/413/500 con code/message/details) ✅ (mapeo de code a mensajes UX + fallback de red) Cada code del backend tiene un mensaje localizado y mapeado en el frontend 7 Accesibilidad y compatibilidad multi-dispositivo/navegador — — ✅ (labels, aria-\*, foco, contraste, breakpoints mobile/tablet/desktop) Tests de RTL + Lighthouse a11y ≥ 90 + CSS responsive mobile-first

</br>

## Prompt 4:

Agent: Sonnet 4.6

### Pregunta:

¿Puedes crear un plan de implementación a partir de este análisis?

### Respuesta:

Plan de implementación — HU "Añadir Candidato al Sistema" Plan secuencial y verificable derivado de TKT-1 → TKT-2 → TKT-3. Cada fase termina en un checkpoint verificable antes de pasar a la siguiente, para permitir aplicar rollback con bajo coste si algo falla.

Fase 0 — Pre-flight (≈15 min) Crear rama de trabajo: git checkout -b feat/add-candidate. Levantar Postgres: docker-compose up -d (desde raíz). Verificar backend arranca: cd backend; npm install; npm run dev → GET http://localhost:3010/ devuelve "Hola LTI!". Parar. Verificar frontend arranca: cd frontend; npm install; npm start → carga template CRA. Parar. Añadir a .gitignore raíz: backend/uploads/. Checkpoint: ambos servicios arrancan, Postgres responde, working tree limpio salvo .gitignore.

Fase 1 — TKT-1: modelo y migración (≈30 min) Editar backend/prisma/schema.prisma: añadir modelos Candidate, Education, WorkExperience (esquema exacto del ticket). No tocar User. Desde backend/: npx prisma migrate dev --name add_candidate_education_workexperience. npm run prisma:generate (idempotente). Verificar con docker exec ... psql -c "\dt" que aparecen las 3 tablas nuevas. Checkpoint: migración versionada en backend/prisma/migrations/, prisma.candidate disponible en el cliente, BD con tablas. Commit: feat(db): add Candidate, Education, WorkExperience models.

Fase 2 — TKT-2: backend, endpoint y Swagger (≈1 día) 2.1 — Andamiaje (sin lógica de negocio aún) Instalar deps: npm install multer zod uuid + npm install -D @types/multer @types/uuid. Crear backend/src/lib/prisma.ts (singleton) y refactorizar index.ts para importarlo desde ahí. Crear estructura vacía de carpetas: routes/, controllers/, services/, validators/, middlewares/, config/. mkdir backend/uploads/cvs al boot vía fs.mkdirSync({ recursive: true }). Checkpoint: npm run dev sigue funcionando, GET / responde.

2.2 — Validación, upload y error handling validators/candidate.schema.ts: zod schemas (candidateInputSchema, educationSchema, workExperienceSchema). middlewares/upload.middleware.ts: multer con diskStorage, limits.fileSize = 5 _ 1024 _ 1024, fileFilter por MIME (application/pdf, application/vnd.openxmlformats-...wordprocessingml.document). middlewares/error.middleware.ts: mapea ZodError → 400, MulterError (LIMIT_FILE_SIZE) → 413, PrismaClientKnownRequestError (P2002) → 409, otros → 500. Formato { error: { code, message, details? } }. 2.3 — Service, controller, route services/candidates.service.ts: createCandidateService(input, file) con prisma.candidate.create y nested writes para educations y workExperiences. En catch: borra file.path y re-lanza. controllers/candidates.controller.ts: parsea educations/workExperiences desde string JSON, llama a candidateInputSchema.parse, invoca service, responde 201 con shape definida. routes/candidates.routes.ts: router.post('/candidates', uploadMiddleware.single('cv'), createCandidate) + JSDoc @openapi. Editar index.ts: registrar app.use(express.json()), app.use('/api', candidatesRouter), reemplazar el error middleware genérico por el nuevo. 2.4 — Swagger config/swagger.ts: swaggerJsdoc apuntando a ./src/routes/\*.ts. index.ts: app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(spec)). 2.5 — Tests Crear backend/src/tests/candidates.test.ts con los 12 casos del ticket. Usar fixtures pequeñas (PDF/DOCX) en backend/src/tests/fixtures/. npm test → 12 verdes. Revisar que el cleanup borra registros y archivos entre tests. 2.6 — Verificación manual Smoke con curl (comando del ticket): 201 → 409 al repetir → GET /api/docs muestra el endpoint. Checkpoint: tests verdes, Swagger en /api/docs, smoke manual OK. Commit(s) sugeridos: uno por sub-fase (2.1 a 2.5) o uno bundle si se prefiere atómico para revisión.

Fase 3 — TKT-3: frontend (≈1 día) 3.1 — Andamiaje y limpieza Reemplazar contenido de frontend/src/App.tsx por un switch useState<'dashboard' | 'add'>. Crear estructura de carpetas: pages/, components/CandidateForm/, components/ui/, hooks/, services/, types/. types/candidate.ts: tipos CandidateInput, EducationInput, WorkExperienceInput, CandidateResponse, ApiError. services/candidatesApi.ts con API_BASE_URL y createCandidate(input, cv). 3.2 — Dashboard mínimo pages/DashboardPage.tsx: header simple + <Button onClick={onAdd}>Añadir candidato</Button>. Checkpoint: npm start → dashboard renderiza, botón conmuta a una página vacía.

3.3 — Formulario components/ui/Button.tsx, components/ui/Alert.tsx (accesibles, role correctos). components/CandidateForm/FormField.tsx (label + input + error + aria-\*). components/CandidateForm/EducationList.tsx y WorkExperienceList.tsx con add/remove (mínimo 1 educación). components/CandidateForm/CvUpload.tsx con validación de extensión y tamaño en cliente. hooks/useCandidateForm.ts con values, errors, touched, validate, handlers. components/CandidateForm/CandidateForm.tsx ensambla todo. 3.4 — Página orquestadora pages/AddCandidatePage.tsx: estados idle | submitting | success | error, mapea code → mensajes UX, botón disabled durante submitting, alert de éxito con role="status" y opción "Añadir otro" / "Volver". 3.5 — Estilos y accesibilidad CSS module o plano por componente, mobile-first, breakpoints 480/1024. Focus visible, contraste WCAG AA, navegación por teclado. 3.6 — Tests Crear los 13 tests RTL listados en el ticket (CandidateForm.test.tsx, AddCandidatePage.test.tsx, candidatesApi.test.ts) con fetch mockeado. npm test → verdes. 3.7 — Verificación manual end-to-end Con Postgres + backend + frontend corriendo: rellenar formulario, subir PDF real → ver alert de éxito + registro en BD (verificar con psql). Repetir con mismo email → ver mensaje "Ya existe un candidato con este email". Probar mobile emulation (375px), navegación por teclado completa, Lighthouse a11y ≥ 90. Checkpoint: flujo completo Frontend → Backend → DB funciona, todos los tests verdes. Commit(s): sub-fases 3.1–3.6.

Fase 4 — Integración y cierre (≈30 min) Revisar CORS: si el frontend recibe error de CORS en :3000, decidir entre añadir cors al backend (recomendado) o documentar el workaround. Si se añade: npm install cors @types/cors en backend + app.use(cors({ origin: 'http://localhost:3000' })). Justificar en el commit. Documentar en README (sección bilingüe EN/ES si tocas el README, ver AGENTS.md): Cómo arrancar todo el stack. Endpoint POST /api/candidates con link a /api/docs. Variable REACT_APP_API_BASE_URL para el frontend. git log --oneline para revisar la cadena de commits. Crear PR contra main con resumen de los 3 tickets, checklist de los 7 criterios de aceptación de la HU y screenshots del flujo. Matriz de paralelización (si hay 2 personas) Tarea Persona A Persona B Fase 0 A — Fase 1 (TKT-1) A — Fase 2 (TKT-2) A (lógica, tests) B (Swagger + andamiaje frontend 3.1) Fase 3 (TKT-3) B A (revisión + integración) Fase 4 A + B — Con una sola persona, ejecutar estrictamente secuencial: las fases comparten archivos críticos (rutas API, contratos) y paralelizar genera retrabajo.

Plan de rollback por fase Fase Rollback 1 npx prisma migrate reset + revert del commit del schema 2 revert de los commits 2.1–2.5, rm -r backend/uploads/cvs/\*, mantener la migración 3 revert de commits 3.x, frontend vuelve al template CRA. Backend queda funcional 4 revert del commit de CORS/README; no afecta a lógica Resumen de artefactos producidos al final del plan 1 migración Prisma versionada + 3 modelos nuevos. 1 endpoint REST POST /api/candidates + Swagger en /api/docs. 12 tests backend + 13 tests frontend, todos verdes. 1 página dashboard + 1 página formulario accesibles y responsive. Documentación de uso en README. Carpeta backend/uploads/cvs/ ignorada por git.

</br>

## Prompt 5:

Agent: Sonnet 4.6

### Input:

Comienza con la Fase 0 + Fase 1 (TKT-1)

### Output:

Fase 0 + Fase 1 completas. Estado:

- Rama feat/add-candidate creada.
- .gitignore ignora backend/uploads/.
- Postgres corriendo en :5432 (contenedor ai4devs-lab-ides-2604-db-1).
- Schema Prisma con Candidate (con @unique en email + índice compuesto), Education, WorkExperience (FKs ON DELETE CASCADE).
- Migración 20260518194156_add_candidate_education_workexperience/migration.sql versionada y aplicada.
- Prisma Client regenerado.
- Verificado en BD: 5 tablas (Candidate, Education, WorkExperience, User, \_prisma_migrations); índices y FKs correctos.

Cambios pendientes de commit: .gitignore, backend/prisma/schema.prisma, backend/prisma/migrations/. También está modificado LTI-lab-ides-IGR/prompts-IGR.md (lab notes, no relacionado con TKT-1).

</br>

## Prompt 6:

Agent: Sonnet 4.6

### Input:

Ya puedes seguir con la Fase 2 (TKT-2 - Backend)

### Output:

Cambios:

backend/package.json + package-lock.json — añadidas multer, zod, uuid (runtime) + @types/multer, @types/uuid, @types/swagger-jsdoc, @types/swagger-ui-express (dev). backend/src/index.ts — refactor: importa prisma desde lib/, registra express.json(), monta candidatesRouter en /api, cablea Swagger en /api/docs, registra errorHandler global, hace mkdirSync(uploadsDir, { recursive: true }) al boot, y guarda app.listen tras NODE_ENV !== 'test'. backend/src/tests/app.test.ts — corregido ('Hello World!' → 'Hola LTI!') + afterAll con prisma.$disconnect(). Nuevos archivos:

backend/src/lib/prisma.ts — singleton PrismaClient. backend/src/utils/http-error.ts — HttpError con setPrototypeOf (ES5 target arrastra el bug clásico de extends Error). backend/src/validators/candidate.schema.ts — schemas zod para candidateInput, education, workExperience. backend/src/middlewares/upload.middleware.ts — multer con diskStorage, 5MB limit, MIME + extension filter, nombre uuid.ext. backend/src/middlewares/error.middleware.ts — mapea ZodError/MulterError/PrismaClientKnownRequestError P2002/HttpError → JSON { error: { code, message, details? } }; limpia archivo huérfano. backend/src/services/candidates.service.ts — create con nested writes para educations/workExperiences; rollback síncrono del CV ante fallo. backend/src/controllers/candidates.controller.ts — parsea JSON de educations/workExperiences, valida con zod, llama al service, devuelve 201. backend/src/routes/candidates.routes.ts — POST /candidates con uploadCv.single('cv') + JSDoc @openapi (request multipart, 201/400/409/413/500). backend/src/config/swagger.ts — setupSwagger(app) sirve UI en /api/docs. backend/src/tests/candidates.test.ts — 12 casos Supertest. Verificación:

npm run build limpio (tsc strict). npm test: 13/13 verdes (12 candidates + 1 app). Hay un warning de "worker force exited" del Rust engine de Prisma — benigno, no afecta exit code. Smoke con curl.exe: POST /api/candidates → 201 con candidato completo (id, educations, workExperiences, metadata del CV). POST con mismo email → 409 EMAIL_ALREADY_EXISTS. GET /api/docs/ → 200 con HTML de Swagger UI. Limpieza: DB restaurada (COUNT = 0), CV huérfano borrado, dev server parado.

</br>

## Prompt 7:

Agent: Sonnet 4.6

### Input:

Sigue con la Fase 3 (TKT-3 — Frontend)

### Output:

Frontend — 21 archivos nuevos:

src/types/candidate.ts — tipos espejo del contrato API. src/services/candidatesApi.ts — createCandidate(input, cv) con FormData, ApiError con setPrototypeOf, manejo de network errors. src/hooks/useCandidateForm.ts — hook propio (sin librería), validación campo a campo + nested arrays + cv (extensión/tamaño). src/components/ui/ — Button, Alert (role=status/role=alert, aria-live). src/components/CandidateForm/ — FormField (label + aria-required/invalid/describedby), EducationList, WorkExperienceList (eliminar deshabilitado si solo queda 1), CvUpload (accept PDF/DOCX, aria-describedby con help+error), CandidateForm (ensambla todo). src/pages/ — DashboardPage, AddCandidatePage (estados idle/submitting/success/error, mapea códigos del backend a mensajes UX, "Añadir otro"). src/App.tsx — switch useState<'dashboard' | 'add'>. CSS modules mobile-first con focus-visible, contraste WCAG AA. Tests frontend — 16/16 verdes:

App.test.tsx (2), CandidateForm.test.tsx (2), AddCandidatePage.test.tsx (9), candidatesApi.test.ts (3). Setup de Jest (correcciones que tuve que hacer):

jest.config.js: testEnvironment: 'jsdom', setupFilesAfterEnv (no setupFilesAfterEach), moduleNameMapper para CSS modules → identity-obj-proxy, testRegex restrictivo a \*.test.tsx?. Deps nuevas (dev): ts-jest@^29, jest@^29, jest-environment-jsdom@^29 (para alinear con ts-jest 29), identity-obj-proxy, @testing-library/user-event@^14 (necesita setup()). Smoke E2E:

Frontend en :3000 (HTTP 200, <title>React App</title>). CORS preflight OPTIONS /api/candidates desde Origin: http://localhost:3000 → 204 con Access-Control-Allow-Origin: http://localhost:3000. POST cross-origin con multipart real → 201 con candidato completo, CORS headers OK. DB y uploads/cvs/ limpios.

</br>

## Prompt 8:

Agent: Sonnet 4.6

### Input:

Sigue con Fase 4 (Integración y cierre)

### Output:

Cambios en esta fase:

README.md — 3 secciones nuevas, espejadas EN/ES: Database migrations / Migraciones de base de datos — npx prisma migrate dev + npm run prisma:generate. Add Candidate feature / Funcionalidad: Añadir candidato — endpoint, campos, códigos de error, link a /api/docs, almacenamiento del CV, CORS, y la variable REACT_APP_API_BASE_URL. Tests — cómo correr backend (DB real) y frontend (fetch mockeado). Estado global de la HU "Añadir Candidato al Sistema":

Criterio HU Cubierto en Estado

1. Botón visible en dashboard TKT-3 ✅
2. Formulario con 7 campos TKT-1 + TKT-2 + TKT-3 ✅
3. Validación de datos TKT-2 (zod) + TKT-3 (useCandidateForm) ✅
4. Subida CV PDF/DOCX TKT-1 (metadata) + TKT-2 (multer 5MB) + TKT-3 (CvUpload) ✅
5. Mensaje de confirmación TKT-2 (201) + TKT-3 (<Alert role="status">) ✅
6. Manejo de errores TKT-2 (error middleware) + TKT-3 (mapeo code → mensaje) ✅
7. Accesibilidad y compat. multi-dispositivo TKT-3 (aria-\*, focus-visible, breakpoints 480/1024) ✅ Métricas:

29/29 tests verdes (13 backend + 16 frontend). 1 migración Prisma versionada, 3 modelos nuevos. 1 endpoint REST + Swagger en /api/docs. Smoke E2E manual verificado (CORS preflight 204, POST 201, frontend renderiza).
