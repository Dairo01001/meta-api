import { afterAll, beforeAll, describe, it } from '@jest/globals';
import supertest from 'supertest';

import { PrismaService } from '../../src/services';
import createApp from '../../src/app';
import { StatusCodes } from 'http-status-codes';
import { CreateUser } from '../../src/user';

const app = createApp();
const prisma = PrismaService.getInstance();

describe('User Controller POST /api/users Service', () => {
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
      data: [{ username: 'dairo', password: '123456', roleId: 1, statusId: 1 }],
    });
  });

  afterAll(async () => {
    const deleteUser = prisma.user.deleteMany();
    const deleteRole = prisma.role.deleteMany();
    const deleteStatus = prisma.userStatus.deleteMany();

    await prisma.$transaction([deleteUser, deleteRole, deleteStatus]);
    await prisma.$disconnect();
  });

  it('POST /api/users with repeated username', async () => {
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

  it('POST /api/users with valid body', () => {
    const newUser: Partial<CreateUser> = {
      username: 'dairo.g',
      password: 'Dairo_1234',
      role: 'ADMIN',
      status: 'ACTIVE',
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
          role: 'ADMIN',
          status: 'ACTIVE',
        });

        expect(res.body.password).not.toContain(newUser.password);
      });
  });
});
