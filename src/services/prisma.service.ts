import { PrismaClient } from '@prisma/client';

export class PrismaService {
  private static instance: PrismaClient;

  private constructor() {
    PrismaService.instance = new PrismaClient({ log: ['query'], errorFormat: 'pretty' });
  }

  public static getInstance(): PrismaClient {
    if (!PrismaService.instance) {
      new PrismaService();
    }

    return PrismaService.instance;
  }
}
