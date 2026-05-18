# Prompts

## Prompt 1

Agent: Sonnet 4.6

### Pregunta:

¿puedes leer este proyecto "AI4Devs-lab-ides-2604" y crear un AGENTS.md?

### Respuesta:

Ha generado el fichero AGENTS.md

</br>

## Prompt : meta-prompt

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
