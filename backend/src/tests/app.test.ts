import request from 'supertest';
import { app } from '../index';
import prisma from '../lib/prisma';

afterAll(async () => {
  await prisma.$disconnect();
});

describe('GET /', () => {
  it('responds with Hola LTI!', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Hola LTI!');
  });
});
