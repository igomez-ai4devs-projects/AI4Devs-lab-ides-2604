import { z } from 'zod';

const dateSchema = z.coerce.date();

export const educationSchema = z
  .object({
    institution: z.string().trim().min(1).max(150),
    degree: z.string().trim().min(1).max(150),
    fieldOfStudy: z.string().trim().max(150).optional().nullable(),
    startDate: dateSchema,
    endDate: dateSchema.optional().nullable(),
  })
  .refine((d) => !d.endDate || d.endDate >= d.startDate, {
    message: 'endDate debe ser posterior o igual a startDate',
    path: ['endDate'],
  });

export const workExperienceSchema = z
  .object({
    company: z.string().trim().min(1).max(150),
    position: z.string().trim().min(1).max(150),
    description: z.string().trim().max(2000).optional().nullable(),
    startDate: dateSchema,
    endDate: dateSchema.optional().nullable(),
  })
  .refine((d) => !d.endDate || d.endDate >= d.startDate, {
    message: 'endDate debe ser posterior o igual a startDate',
    path: ['endDate'],
  });

export const candidateInputSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().toLowerCase().email().max(254),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s\-()]{6,30}$/, 'Teléfono no válido'),
  address: z.string().trim().min(1).max(255),
  educations: z.array(educationSchema).min(1, 'Añade al menos una formación'),
  workExperiences: z.array(workExperienceSchema),
});

export type CandidateInput = z.infer<typeof candidateInputSchema>;
export type EducationInput = z.infer<typeof educationSchema>;
export type WorkExperienceInput = z.infer<typeof workExperienceSchema>;
