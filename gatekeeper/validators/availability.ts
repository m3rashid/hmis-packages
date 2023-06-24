import { z } from 'zod';
import { baseAuthnCreateSchema, baseAuthnUpdateSchema } from './base';
import { DAYS } from '../models/enums';

export const createAvailabilitySchema = baseAuthnCreateSchema.extend({
  day: z.enum(DAYS),
  startTime: z.string(),
  endTime: z.string(),
  profile: z.string(),
});
export type CreateAvailabilityBody = z.infer<typeof createAvailabilitySchema>

export const deleteAvailabilitySchema = baseAuthnUpdateSchema.extend({
  _id: z.string(),
});
export type DeleteAvailabilityBody = z.infer<typeof deleteAvailabilitySchema>;

export const updateAvailabilitySchema = createAvailabilitySchema
  .merge(deleteAvailabilitySchema)
  .extend({});
export type UpdateAvailabilityBody = z.infer<typeof updateAvailabilitySchema>;
