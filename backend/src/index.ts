import fs from 'fs';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import candidatesRouter from './routes/candidates.routes';
import { errorHandler } from './middlewares/error.middleware';
import { setupSwagger } from './config/swagger';
import { uploadsDir } from './middlewares/upload.middleware';

dotenv.config();

fs.mkdirSync(uploadsDir, { recursive: true });

export const app = express();

const port = 3010;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola LTI!');
});

app.use('/api', candidatesRouter);

setupSwagger(app);

app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}
