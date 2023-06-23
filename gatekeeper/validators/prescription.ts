import { z } from 'zod';
import { baseAuthnCreateSchema, baseAuthnUpdateSchema } from './base';

export const createPrescriptionSchema = baseAuthnCreateSchema.extend({
  remarks: z.string().optional(),
  appointment: z.string(),
  medicines: z.array(
    z.object({
      medicine: z.string(),
      dosage: z.object({
        perDay: z.number(),
        timeOfDay: z.string().optional(),
        durationInDays: z.number().optional(),
        perWeek: z.number(),
      }),
    })
  ),
});
export type CreatePrescriptionBody = z.infer<typeof createPrescriptionSchema>;

export const deletePrescriptionSchema = baseAuthnUpdateSchema.extend({
  _id: z.string(),
});
export type DeletePrescriptionBody = z.infer<typeof deletePrescriptionSchema>;

export const updatePrescriptionSchema = baseAuthnUpdateSchema
  .merge(createPrescriptionSchema)
  .extend({});
export type UpdatePrescriptionBody = z.infer<typeof updatePrescriptionSchema>;
