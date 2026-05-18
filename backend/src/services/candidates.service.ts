import fs from 'fs';
import prisma from '../lib/prisma';
import type { CandidateInput } from '../validators/candidate.schema';

export const createCandidate = async (input: CandidateInput, cv: Express.Multer.File) => {
  try {
    const candidate = await prisma.candidate.create({
      data: {
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        phone: input.phone,
        address: input.address,
        cvFileName: cv.filename,
        cvOriginalName: cv.originalname,
        cvMimeType: cv.mimetype,
        cvSize: cv.size,
        educations: {
          create: input.educations.map((e) => ({
            institution: e.institution,
            degree: e.degree,
            fieldOfStudy: e.fieldOfStudy ?? null,
            startDate: e.startDate,
            endDate: e.endDate ?? null,
          })),
        },
        workExperiences: {
          create: input.workExperiences.map((w) => ({
            company: w.company,
            position: w.position,
            description: w.description ?? null,
            startDate: w.startDate,
            endDate: w.endDate ?? null,
          })),
        },
      },
      include: {
        educations: true,
        workExperiences: true,
      },
    });
    return candidate;
  } catch (err) {
    try {
      fs.unlinkSync(cv.path);
    } catch {
      /* swallow: file may already be gone */
    }
    throw err;
  }
};
