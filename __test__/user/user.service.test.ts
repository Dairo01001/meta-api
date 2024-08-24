import { afterAll, beforeAll, describe, it } from '@jest/globals';
import supertest from 'supertest';

import { PrismaService } from '../../src/services';
import createApp from '../../src/app';
import { StatusCodes } from 'http-status-codes';
import { User } from '../../src/user';

const app = createApp();
const prisma = PrismaService.getInstance();

describe('User Controller POST /api/user Service', () => {
  beforeAll(async () => {
    await prisma.user.createMany({
      data: [{ username: 'dairo', password: '123456' }],
    });
  });

  afterAll(async () => {
    const deleteUser = prisma.user.deleteMany();
    await prisma.$transaction([deleteUser]);
    await prisma.$disconnect();
  });

  it('POST /api/user with repeated username', async () => {
    return supertest(app)
      .post('/api/users')
      .send({ username: 'dairo', password: 'Dairo_1234' })
      .expect('content-type', /json/)
      .expect(StatusCodes.CONFLICT)
      .then((res) => {
        expect(res.body).toEqual({
          message: 'Username already exists',
        });
      });
  });

  it('POST /api/user with valid body', () => {
    const newUser: Partial<User> = {
      username: 'dairo.g',
      password: 'Dairo_1234',
    };

    return supertest(app)
      .post('/api/users')
      .send(newUser)
      .expect('content-type', /json/)
      .expect(StatusCodes.CREATED)
      .then((res) => {
        expect(res.body).toEqual({
          id: expect.any(String),
          username: newUser.username,
          password: expect.any(String),
        });

        expect(res.body.password).not.toContain(newUser.password);
      });
  });
});
