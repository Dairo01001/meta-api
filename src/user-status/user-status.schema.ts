import { boolean, object, string, TypeOf } from 'zod'

export const CreateUserStatusSchema = object({
  body: object({
    name: string({
      required_error: 'name is required',
    }).min(4, 'name must be at least 4 characters'),
    status: boolean().optional(),
  }),
})

export type CreateUserStatusInput = TypeOf<typeof CreateUserStatusSchema>

export const UpdateUserStatusSchema = object({
  body: object({
    status: boolean(),
  }),
  params: object({
    id: string(),
  }),
})

export type UpdateUserStatusInput = TypeOf<typeof UpdateUserStatusSchema>
