import { z } from 'zod';

export const blogCommentSchema = z.object({
  authorName: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(80, 'Name must be 80 characters or less'),
  text: z
    .string()
    .trim()
    .min(1, 'Comment is required')
    .max(2000, 'Comment must be 2000 characters or less'),
});

export type BlogCommentFormValues = z.infer<typeof blogCommentSchema>;
