import { boolean, number, object, string, TypeOf } from 'zod'

export const ServerStatusSchema = object({
  body: object({
    name: string({
      required_error: 'name is required',
    }).min(4, 'name must be at least 4 characters'),
    status: boolean().optional(),
  }),
})

export type CreateServerStatusInput = TypeOf<typeof ServerStatusSchema>

export const UpdateServerStatusSchema = object({
  body: object({
    status: boolean(),
  }),
  params: object({
    id: number(),
  }),
})

export type UpdateServerStatusInput = TypeOf<typeof UpdateServerStatusSchema>
