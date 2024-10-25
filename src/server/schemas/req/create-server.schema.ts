import { number, object, string, TypeOf } from 'zod';

export const CreateServerSchema = object({
  body: object({
    port: number(),
    urlHost: string(),
    gridName: string({
      required_error: 'Server name is required',
    }),
    dataSource: string({
      required_error: 'Data source is required',
    }),
    dataBaseName: string({
      required_error: 'Database name is required',
    }),
    dataBaseUser: string({
      required_error: 'Database user is required',
    }),
    dataBasePassword: string({
      required_error: 'Database password is required',
    }),
    statusId: number(),
  }),
});

export type CreateServerInput = TypeOf<typeof CreateServerSchema>;
