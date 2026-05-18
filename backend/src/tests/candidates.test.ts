import fs from 'fs';
import path from 'path';
import request from 'supertest';
import { app } from '../index';
import prisma from '../lib/prisma';
import { uploadsDir } from '../middlewares/upload.middleware';

type Fields = Record<string, string>;
type FileSpec = { buffer: Buffer; filename: string; contentType: string };

const validFields: Fields = {
  firstName: 'Ana',
  lastName: 'García',
  email: 'ana@example.com',
  phone: '+34 600 000 000',
  address: 'Calle Falsa 123, Madrid',
  educations: JSON.stringify([
    {
      institution: 'UPM',
      degree: 'Ing. Informática',
      startDate: '2015-09-01',
      endDate: '2019-06-30',
    },
  ]),
  workExperiences: JSON.stringify([
    { company: 'Acme', position: 'Backend Dev', startDate: '2019-07-01' },
  ]),
};

const PDF_FILE: FileSpec = {
  buffer: Buffer.from('%PDF-1.4\n%fake pdf content for testing\n'),
  filename: 'cv.pdf',
  contentType: 'application/pdf',
};

const DOCX_FILE: FileSpec = {
  buffer: Buffer.from('PK\x03\x04fake docx zip header'),
  filename: 'cv.docx',
  contentType:
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

const postCandidate = (
  overrides: Partial<Fields> = {},
  file: FileSpec | null = PDF_FILE,
): request.Test => {
  const req = request(app).post('/api/candidates');
  const data = { ...validFields, ...overrides };
  for (const [k, v] of Object.entries(data)) {
    if (typeof v === 'string') req.field(k, v);
  }
  if (file) {
    req.attach('cv', file.buffer, { filename: file.filename, contentType: file.contentType });
  }
  return req;
};

const cleanUploads = (): void => {
  if (!fs.existsSync(uploadsDir)) return;
  for (const f of fs.readdirSync(uploadsDir)) {
    fs.unlinkSync(path.join(uploadsDir, f));
  }
};

beforeEach(async () => {
  await prisma.candidate.deleteMany();
  cleanUploads();
});

afterAll(async () => {
  await prisma.candidate.deleteMany();
  cleanUploads();
  await prisma.$disconnect();
});

describe('POST /api/candidates', () => {
  it('1) creates a candidate with PDF (happy path)', async () => {
    const res = await postCandidate();
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      firstName: 'Ana',
      lastName: 'García',
      email: 'ana@example.com',
      phone: '+34 600 000 000',
      cvMimeType: 'application/pdf',
      cvOriginalName: 'cv.pdf',
    });
    expect(res.body.educations).toHaveLength(1);
    expect(res.body.workExperiences).toHaveLength(1);
    expect(await prisma.candidate.count()).toBe(1);
    expect(fs.readdirSync(uploadsDir)).toHaveLength(1);
  });

  it('2) creates a candidate with DOCX', async () => {
    const res = await postCandidate({}, DOCX_FILE);
    expect(res.status).toBe(201);
    expect(res.body.cvMimeType).toBe(DOCX_FILE.contentType);
    expect(res.body.cvOriginalName).toBe('cv.docx');
  });

  it('3) returns 400 VALIDATION_ERROR for invalid email', async () => {
    const res = await postCandidate({ email: 'not-an-email' });
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
    expect(res.body.error.details[0].path).toBe('email');
  });

  it('4) returns 400 VALIDATION_ERROR when firstName is empty', async () => {
    const res = await postCandidate({ firstName: '' });
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
    const paths = res.body.error.details.map((d: { path: string }) => d.path);
    expect(paths).toContain('firstName');
  });

  it('5) returns 400 VALIDATION_ERROR when educations is empty', async () => {
    const res = await postCandidate({ educations: '[]' });
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
    const paths = res.body.error.details.map((d: { path: string }) => d.path);
    expect(paths).toContain('educations');
  });

  it('6) returns 400 VALIDATION_ERROR when educations JSON is malformed', async () => {
    const res = await postCandidate({ educations: '{not valid json' });
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('7) returns 400 VALIDATION_ERROR when CV is missing', async () => {
    const res = await postCandidate({}, null);
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
    expect(res.body.error.details[0].path).toBe('cv');
  });

  it('8) returns 400 INVALID_FILE_TYPE for .txt upload', async () => {
    const res = await postCandidate({}, {
      buffer: Buffer.from('not a pdf'),
      filename: 'cv.txt',
      contentType: 'text/plain',
    });
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('INVALID_FILE_TYPE');
  });

  it('9) returns 413 FILE_TOO_LARGE when CV exceeds 5MB', async () => {
    const big = Buffer.alloc(6 * 1024 * 1024, 0x41);
    const res = await postCandidate({}, {
      buffer: big,
      filename: 'cv.pdf',
      contentType: 'application/pdf',
    });
    expect(res.status).toBe(413);
    expect(res.body.error.code).toBe('FILE_TOO_LARGE');
  });

  it('10) returns 409 EMAIL_ALREADY_EXISTS for duplicate email', async () => {
    const first = await postCandidate();
    expect(first.status).toBe(201);
    const res = await postCandidate();
    expect(res.status).toBe(409);
    expect(res.body.error.code).toBe('EMAIL_ALREADY_EXISTS');
  });

  it('11) does not leave an orphan CV file when Prisma create fails', async () => {
    const spy = jest
      .spyOn(prisma.candidate, 'create')
      .mockRejectedValueOnce(new Error('simulated DB failure'));
    const filesBefore = fs.readdirSync(uploadsDir).length;
    const res = await postCandidate();
    expect(res.status).toBe(500);
    expect(res.body.error.code).toBe('INTERNAL_ERROR');
    expect(fs.readdirSync(uploadsDir).length).toBe(filesBefore);
    spy.mockRestore();
  });
});

describe('GET /api/docs', () => {
  it('12) serves the Swagger UI HTML', async () => {
    const res = await request(app).get('/api/docs/').redirects(1);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/html/);
  });
});
