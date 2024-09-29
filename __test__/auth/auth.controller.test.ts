import { afterAll, beforeAll, describe, it } from '@jest/globals';
import supertest from 'supertest';
import createApp from '../../src/app';
import { PrismaService } from '../../src/services';
import { StatusCodes } from 'http-status-codes';

const app = createApp();
const prisma = PrismaService.getInstance();

describe('Auth Controller POST /api/auth Service', () => {
  beforeAll(async () => {
    await prisma.role.createMany({
      data: [
        { id: 1, name: 'ADMIN' },
        { id: 2, name: 'USER' },
      ],
    });

    await prisma.userStatus.createMany({
      data: [
        { id: 1, name: 'ACTIVE' },
        { id: 2, name: 'INACTIVE' },
      ],
    });

    await prisma.user.createMany({
      data: [
        {
          username: 'dairo',
          password: '$2a$10$2SB7.EAz2OvF9qfQWGyT8e63WH0Pk7/0RGhNRp6k1c/SnMuLoxHAi',
          roleId: 1,
          statusId: 1,
        },
      ],
    });
  });

  afterAll(async () => {
    const deleteUser = prisma.user.deleteMany();
    const deleteRole = prisma.role.deleteMany();
    const deleteStatus = prisma.userStatus.deleteMany();

    await prisma.$transaction([deleteUser, deleteRole, deleteStatus]);
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
