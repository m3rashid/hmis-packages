import { z } from 'zod';
import { baseAuthnCreateSchema, baseAuthnUpdateSchema } from './base';

export const createNotificationSchema = baseAuthnCreateSchema.extend({
  title: z.string(),
  description: z.string(),
});
export type CreateNotificationBody = z.infer<typeof createNotificationSchema>;

export const deleteNotificationSchema = baseAuthnUpdateSchema.extend({
  _id: z.string(),
});
export type DeleteNotificationBody = z.infer<typeof deleteNotificationSchema>;

export const updateNotificationSchema = createNotificationSchema.merge(deleteNotificationSchema).extend({})
export type UpdateNotificationBody = z.infer<typeof updateNotificationSchema>