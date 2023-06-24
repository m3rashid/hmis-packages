import { z } from 'zod';
import { baseAuthnCreateSchema, baseAuthnUpdateSchema } from './base';
import { IPD_STATUS, TIME_UNITS } from '../models/enums';

export const addIpdSchema = baseAuthnCreateSchema.extend({
  patient: z.string(),
  status: z.enum(IPD_STATUS),
  payments: z.array(z.string()),
  history: z.array(
    z.object({
      prescriptions: z.string(),
      doctor: z.string(),
    })
  ),
  resources: z.array(
    z.object({
      nonConsumable: z.string().optional(),
      consumables: z.string().optional(),
      time: z.number().optional(),
      timeUnit: z.enum(TIME_UNITS).optional(),
    })
  ),
  tests: z.array(
    z.object({
      test: z.string(),
      remarks: z.string().optional(),
      suggestedBy: z.string(),
      payment: z.string().optional(),
    })
  ),
  referredBy: z.string().optional(),
  chats: z.array(
    z.object({
      time: z.date(),
      remarks: z.string().optional(),
      from: z.string(),
    })
  ),
  fromDate: z.date(),
  toDate: z.date().optional(),
});
export type AddIpdSchemaBody = z.infer<typeof addIpdSchema>;

export const deleteIpdSchema = baseAuthnUpdateSchema.extend({
  _id: z.string(),
});
export type DeleteIpdSchemaBody = z.infer<typeof deleteIpdSchema>;

export const updateIpdSchema = addIpdSchema.merge(deleteIpdSchema).extend({});
export type UpdateIpdSchemaBody = z.infer<typeof updateIpdSchema>;
