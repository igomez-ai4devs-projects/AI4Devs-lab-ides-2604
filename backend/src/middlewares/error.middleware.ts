import fs from 'fs';
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import multer from 'multer';
import { Prisma } from '@prisma/client';
import { HttpError } from '../utils/http-error';

interface ErrorBody {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

const cleanupUploadedFile = (req: Request): void => {
  const file = req.file;
  if (!file?.path) return;
  try {
    fs.unlinkSync(file.path);
  } catch {
    /* swallow: file may already be gone */
  }
};

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  cleanupUploadedFile(req);

  if (err instanceof ZodError) {
    const body: ErrorBody = {
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Datos inválidos',
        details: err.issues.map((i) => ({
          path: i.path.join('.'),
          message: i.message,
        })),
      },
    };
    res.status(400).json(body);
    return;
  }

  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      const body: ErrorBody = {
        error: { code: 'FILE_TOO_LARGE', message: 'El CV supera el tamaño permitido (5MB)' },
      };
      res.status(413).json(body);
      return;
    }
    const body: ErrorBody = {
      error: { code: 'VALIDATION_ERROR', message: err.message },
    };
    res.status(400).json(body);
    return;
  }

  if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === 'P2002' &&
    Array.isArray(err.meta?.target) &&
    (err.meta?.target as string[]).includes('email')
  ) {
    const body: ErrorBody = {
      error: {
        code: 'EMAIL_ALREADY_EXISTS',
        message: 'Ya existe un candidato con este email',
      },
    };
    res.status(409).json(body);
    return;
  }

  if (err instanceof HttpError) {
    const body: ErrorBody = {
      error: { code: err.code, message: err.message },
    };
    if (err.details !== undefined) {
      body.error.details = err.details;
    }
    res.status(err.status).json(body);
    return;
  }

  console.error(err instanceof Error ? err.stack : err);
  const body: ErrorBody = {
    error: { code: 'INTERNAL_ERROR', message: 'Error interno del servidor' },
  };
  res.status(500).json(body);
};
