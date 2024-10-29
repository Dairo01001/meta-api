import { boolean, number, object, string, TypeOf } from 'zod'

export const UpdateRoleSchema = object({
  params: object({
    id: string(),
  }),
  body: object({
    status: boolean(),
  }),
})

export type UpdateRoleInput = TypeOf<typeof UpdateRoleSchema>

export const IdRoleSchema = object({
  params: object({
    id: number(),
  }),
})

export type IdRoleInput = TypeOf<typeof IdRoleSchema>

export const CreateRoleSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }).min(4, 'Name must be at least 4 characters'),
    status: boolean().optional(),
  }),
})

export type CreateRoleInput = TypeOf<typeof CreateRoleSchema>
