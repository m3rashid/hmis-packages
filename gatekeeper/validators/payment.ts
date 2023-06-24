import { z } from 'zod';
import { baseAuthnCreateSchema, baseAuthnUpdateSchema } from './base';
import { PAYMENT_OPTIONS, PAYMENT_STATUS } from '../models/enums';

export const createPaymentSchema = baseAuthnCreateSchema.extend({
  type: z.enum(PAYMENT_OPTIONS),
  amountINR: z.number(),
  status: z.enum(PAYMENT_STATUS),
  reason: z.string().optional(),
});
export type CreatePaymentSchemaBody = z.infer<typeof createPaymentSchema>;

export const deletePaymentSchema = baseAuthnUpdateSchema.extend({
  _id: z.string(),
});
export type DeletePaymentSchemaBody = z.infer<typeof deletePaymentSchema>;

export const updatePaymentSchema = createPaymentSchema
  .merge(deletePaymentSchema)
  .extend({});
export type UpdatePaymentSchemaBody = z.infer<typeof updatePaymentSchema>;
