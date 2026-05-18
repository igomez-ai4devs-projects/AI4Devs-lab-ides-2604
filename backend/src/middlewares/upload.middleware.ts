import path from 'path';
import multer from 'multer';
import { v4 as uuid } from 'uuid';
import { HttpError } from '../utils/http-error';

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const ALLOWED_EXTENSIONS = ['.pdf', '.docx'];

export const uploadsDir = path.resolve(__dirname, '..', '..', 'uploads', 'cvs');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${uuid()}${ext}`);
  },
});

export const uploadCv = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype) || !ALLOWED_EXTENSIONS.includes(ext)) {
      cb(new HttpError(400, 'INVALID_FILE_TYPE', 'El CV debe ser PDF o DOCX'));
      return;
    }
    cb(null, true);
  },
});
