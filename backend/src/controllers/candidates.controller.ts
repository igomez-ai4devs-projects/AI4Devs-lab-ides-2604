import { Request, Response, NextFunction } from 'express';
import { candidateInputSchema } from '../validators/candidate.schema';
import * as candidatesService from '../services/candidates.service';
import { HttpError } from '../utils/http-error';

const parseJsonField = (raw: unknown, fieldName: string): unknown => {
  if (typeof raw !== 'string') {
    throw new HttpError(400, 'VALIDATION_ERROR', `${fieldName} es obligatorio`, [
      { path: fieldName, message: `${fieldName} debe ser un JSON string` },
    ]);
  }
  try {
    return JSON.parse(raw);
  } catch {
    throw new HttpError(400, 'VALIDATION_ERROR', `${fieldName} JSON malformado`, [
      { path: fieldName, message: 'JSON inválido' },
    ]);
  }
};

export const createCandidate = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.file) {
      throw new HttpError(400, 'VALIDATION_ERROR', 'cv es obligatorio', [
        { path: 'cv', message: 'cv es obligatorio' },
      ]);
    }

    const parsed = candidateInputSchema.parse({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      educations: parseJsonField(req.body.educations, 'educations'),
      workExperiences: parseJsonField(req.body.workExperiences, 'workExperiences'),
    });

    const candidate = await candidatesService.createCandidate(parsed, req.file);
    res.status(201).json(candidate);
  } catch (err) {
    next(err);
  }
};
