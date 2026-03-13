import { z } from 'zod';

export const subjectSchema = z.object({
  subjectName: z
    .string()
    .min(5, 'Subject must be at least 5 characters long')
    .max(100, 'Subject must not exceed 100 characters'),

  description: z
    .string()
    .min(10, 'Description must be at least 10 characters long')
    .max(500, 'Description must not exceed 500 characters')
    .optional()
    .or(z.literal('')),

  courseImageUrl: z
    .string()
    .url('Must be a valid URL')
    .optional()
    .or(z.literal('')),

  mentorId: z.coerce.number().min(1, 'Mentor must be selected'),
});

export type SubjectFormValues = z.infer<typeof subjectSchema>;
