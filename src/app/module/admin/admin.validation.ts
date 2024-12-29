import { z } from 'zod';

export const blockUserValidation = z.object({
  params: z.object({
    userId: z.string().nonempty('User ID is required'),
  }),
});

export const deleteBlogValidation = z.object({
  params: z.object({
    id: z.string().nonempty('Blog ID is required'),
  }),
});
