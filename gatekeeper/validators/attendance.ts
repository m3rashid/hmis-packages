import { z } from 'zod';
import { baseAuthnCreateSchema, baseAuthnUpdateSchema } from './base';

export const addAttendanceSchema = baseAuthnCreateSchema.extend({
  userId: z.string(),
  date: z.date(),
  slots: z.array(
    z.object({
      from: z.date(),
      to: z.date(),
    })
  ),
});
export type AddAttendanceSchemaBody = z.infer<typeof addAttendanceSchema>;

export const deleteAttendanceSchema = baseAuthnUpdateSchema.extend({
  _id: z.string(),
});
export type DeleteAttendanceSchemaBody = z.infer<typeof deleteAttendanceSchema>;

export const updateAttendanceSchema = addAttendanceSchema
  .merge(deleteAttendanceSchema)
  .extend({});
export type UpdateAttendanceSchemaBody = z.infer<typeof updateAttendanceSchema>;
