import { z } from 'zod';
import { baseAuthnCreateSchema, baseAuthnUpdateSchema } from './base';

export const addLeaveSchema = baseAuthnCreateSchema.extend({
  startDate: z.string(),
  endDate: z.string(),
  reason: z.string(),
  user: z.string(),
});
export type AddLeaveBody = z.infer<typeof addLeaveSchema>;

export const deleteLeaveSchema = baseAuthnUpdateSchema.extend({
  _id: z.string(),
});
export type DeleteLeaveBody = z.infer<typeof deleteLeaveSchema>;

export const updateLeaveSchema = baseAuthnUpdateSchema
  .merge(addLeaveSchema)
  .extend({});
export type UpdateLeaveBody = z.infer<typeof updateLeaveSchema>;
