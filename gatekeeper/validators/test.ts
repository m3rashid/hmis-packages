import { z } from 'zod';
import { baseAuthnCreateSchema, baseAuthnUpdateSchema } from './base';

export const addTestSchema = baseAuthnCreateSchema.extend({
  name: z.string(),
  description: z.string().optional(),
  costINR: z.number(),
});
export type AddTestSchemaBody = z.infer<typeof addTestSchema>;

export const deleteTestSchema = baseAuthnUpdateSchema.extend({
  _id: z.string(),
});
export type DeleteTestSchemaBody = z.infer<typeof deleteTestSchema>;

export const updateTestSchema = addTestSchema
  .merge(deleteTestSchema)
  .extend({});
export type UpdateTestSchemaBody = z.infer<typeof updateTestSchema>;
