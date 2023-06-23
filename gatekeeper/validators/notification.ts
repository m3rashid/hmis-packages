import { z } from 'zod';
import { baseAuthnCreateSchema, baseAuthnUpdateSchema } from './base';

export const createNotification = baseAuthnCreateSchema.extend({
  title: z.string(),
  description: z.string(),
});
export type CreateNotificationBody = z.infer<typeof createNotification>;

export const deleteNotification = baseAuthnUpdateSchema.extend({
  _id: z.string(),
});
export type DeleteNotificationBody = z.infer<typeof deleteNotification>;
