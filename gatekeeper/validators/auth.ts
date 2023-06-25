import { z } from 'zod';

import {
  BLOOD_GROUPS,
  MARITAL_STATUS,
  SEX,
  USER_ORIGIN,
} from '../models/enums';
import { baseAuthnCreateSchema, baseAuthnUpdateSchema } from './base';

export const loginSchema = z.object({
  email: z.string().email('Not a valid Email'),
  password: z.string(),
});
export type LoginBody = z.infer<typeof loginSchema>;

export const userSignupSchema = baseAuthnCreateSchema
  .merge(loginSchema)
  .extend({
    emailVerified: z.boolean(),
    name: z.string().min(3).max(30),
    role: z.string().optional(),
    origin: z.enum(USER_ORIGIN).optional(),
    isDoctor: z.boolean().optional(),
    profile: z.string().optional(),
  });
export type UserSignupBody = z.infer<typeof userSignupSchema>;

export const patientSignupInitSchema = z.object({});
export type PatientSignupInitBody = z.infer<typeof patientSignupInitSchema>;

export const patientSignupTwoSchema = z.object({});
export type PatientSignupTwoBody = z.infer<typeof patientSignupTwoSchema>;

export const patientSignupFinalSchema = z.object({});
export type PatientSignupFinalBody = z.infer<typeof patientSignupFinalSchema>;

export const createProfileSchema = baseAuthnCreateSchema.extend({
  bio: z.string().optional(),
  roomNumber: z.string().optional(),
  age: z.number().optional(),
  sex: z.enum(SEX),
  phone: z.string().optional(),
  phoneVerified: z.boolean(),
  maritalStatus: z.enum(MARITAL_STATUS).optional(),
  profilePicture: z.string().optional(),
  addresses: z.array(z.string()),
  bloodGroup: z.enum(BLOOD_GROUPS).optional(),
  origin: z.string().optional(),
  lastVisit: z.string().optional(),
  designation: z.string().optional(),
  department: z.string().optional(),
  userHealthId: z.string().optional(),
  user: z.string(),
  leaves: z.array(z.string()).optional(),
  availabilities: z.array(z.string()).optional(),
  appointmentsAsDoctor: z.array(z.string()).optional(),
  appointmentsAsPatient: z.array(z.string()).optional(),
  appointmentsAsReferredBy: z.array(z.string()).optional(),
});
export type CreateProfileBody = z.infer<typeof createProfileSchema>;

export const updateProfileSchema = baseAuthnUpdateSchema
  .merge(createProfileSchema)
  .extend({
    _id: z.string(),
  });
export type UpdateProfileBody = z.infer<typeof updateProfileSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email('Not a valid Email'),
});
export type ForgotPasswordBody = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  password: z.string(),
  confirmPassword: z.string(),
  email: z.string().email('Not a valid Email'),
  otp: z.string(),
});
export type ResetPasswordBody = z.infer<typeof resetPasswordSchema>;
