import { z } from 'zod';

// Mentor Form Validation Schema
export const mentorSchema = z.object({
  mentorId: z.string(),

  firstName: z
    .string()
    .min(3, 'First name must be at least 3 characters long')
    .max(50, 'First name must not exceed 50 characters'),

  lastName: z
    .string()
    .min(3, 'Last name must be at least 3 characters long')
    .max(50, 'Last name must not exceed 50 characters'),

  email: z.string().email('Email should be valid'),

  phoneNumber: z
    .string()
    .min(7, 'Phone number must be at least 7 characters')
    .max(15, 'Phone number must not exceed 15 characters'),

  title: z
    .string()
    .min(3, 'Title must be at least 3 characters long')
    .max(100, 'Title must not exceed 100 characters'),

  profession: z
    .string()
    .min(3, 'Profession must be at least 3 characters long')
    .max(100, 'Profession must not exceed 100 characters'),

  company: z
    .string()
    .min(3, 'Company must be at least 3 characters long')
    .max(100, 'Company must not exceed 100 characters'),

  experienceYears: z.number().int().nonnegative(),

  bio: z
    .string()
    .min(10, 'Bio must be at least 10 characters long')
    .max(500, 'Bio must not exceed 500 characters'),

  profileImageUrl: z
    .string()
    .url('Must be a valid URL')
    .optional()
    .or(z.literal('')),

  positiveReviews: z.number().int().nonnegative().optional(),

  totalEnrollments: z.number().int().nonnegative().optional(),

  isCertified: z.boolean(),

  startYear: z
    .number()
    .int()
    .min(1900, 'Year must be 1900 or later')
    .max(new Date().getFullYear(), `Year cannot be in the future`),
});

export type MentorFormValues = z.infer<typeof mentorSchema>;
