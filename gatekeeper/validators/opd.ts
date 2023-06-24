import { z } from 'zod';
import { baseAuthnCreateSchema, baseAuthnUpdateSchema } from './base';
import { OPD_STATUS } from '../models/enums';

export const addOpdSchema = baseAuthnCreateSchema.extend({
  appointment: z.string(),
  prescription: z.string(),
  status: z.enum(OPD_STATUS),
  payment: z.string().optional(),
  date: z.date(),
  nextDate: z.date().optional(),
});
export type AddOpdSchemaBody = z.infer<typeof addOpdSchema>;

export const deleteOpdSchema = baseAuthnUpdateSchema.extend({
  _id: z.string(),
});
export type DeleteOpdSchemaBody = z.infer<typeof deleteOpdSchema>;

export const updateOpdSchema = addOpdSchema.merge(deleteOpdSchema).extend({});
export type UpdateOpdSchemaBody = z.infer<typeof updateOpdSchema>;
