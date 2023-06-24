import { z } from 'zod';
import { baseAuthnCreateSchema, baseAuthnUpdateSchema } from './base';
import { APPOINTMENT_STATUS } from '../models/enums';

export const createAppointmentSchema = baseAuthnCreateSchema.extend({
  patient: z.string(),
  doctor: z.string(),
  status: z.enum(APPOINTMENT_STATUS),
  chats: z.array(z.string()).optional(),
  referredBy: z.string().optional(),
  prescription: z.string().optional(),
});
export type CreateAppointmentBody = z.infer<typeof createAppointmentSchema>;

export const deleteAppointmentSchema = baseAuthnUpdateSchema.extend({
  _id: z.string(),
});
export type DeleteAppointmentBody = z.infer<typeof deleteAppointmentSchema>;

export const updateAppointmentSchema = createAppointmentSchema
  .merge(deleteAppointmentSchema)
  .extend({});
export type UpdateAppointmentBody = z.infer<typeof updateAppointmentSchema>;
