import { afterAll, beforeAll, describe, it } from '@jest/globals';
import supertest from 'supertest';
import createApp from '../../src/app';
import { PrismaService } from '../../src/services';
import { StatusCodes } from 'http-status-codes';

const app = createApp();
const prisma = PrismaService.getInstance();

describe('Auth Controller POST /api/auth Service', () => {
  beforeAll(async () => {
    await prisma.user.createMany({
      data: [{ username: 'dairo', password: '$2a$10$2SB7.EAz2OvF9qfQWGyT8e63WH0Pk7/0RGhNRp6k1c/SnMuLoxHAi' }],
    });
  });

  afterAll(async () => {
    const deleteUser = prisma.user.deleteMany();
    await prisma.$transaction([deleteUser]);
    await prisma.$disconnect();
  });

  it('POST /api/auth/signin ', () => {
    return supertest(app)
      .post('/api/auth/signin')
      .send({ username: 'dairo', password: 'Dairo_1234' })
      .expect('content-type', /json/)
      .expect(StatusCodes.OK)
      .then((res) => {
        expect(res.body).toEqual({
          id: expect.any(String),
          username: 'dairo',
          accessToken: expect.any(String),
          refreshToken: expect.any(String),
        });
      });
  });
});
