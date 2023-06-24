import { z } from 'zod';
import { baseAuthnCreateSchema, baseAuthnUpdateSchema } from './base';

export const createAnnouncementSchema = baseAuthnCreateSchema.extend({
  title: z.string(),
  description: z.string(),
});
export type CreateAnnouncementBody = z.infer<typeof createAnnouncementSchema>;

export const deleteAnnouncementSchema = baseAuthnUpdateSchema.extend({
  _id: z.string(),
});
export type DeleteAnnouncementBody = z.infer<typeof deleteAnnouncementSchema>;

export const updateAnnouncementSchema = createAnnouncementSchema
  .merge(deleteAnnouncementSchema)
  .extend({});
export type UpdateAnnouncementBody = z.infer<typeof updateAnnouncementSchema>;
