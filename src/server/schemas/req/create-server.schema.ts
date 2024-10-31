import { number, object, string, TypeOf } from 'zod'

export const CreateServerSchema = object({
  body: object({
    processId: string({
      required_error: 'Process id is required',
    }),
    port: number({
      required_error: 'Port is required',
    }),
    urlHost: string({
      required_error: 'Url host is required',
    }),
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
    statusId: number({
      required_error: 'Status id is required',
    }),
  }),
})

export type CreateServerInput = TypeOf<typeof CreateServerSchema>
