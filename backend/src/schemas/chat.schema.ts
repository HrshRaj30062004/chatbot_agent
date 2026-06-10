import { z } from 'zod';

export const postMessageSchema = z.object({
  body: z.object({
    message: z
      .string({ error: "Message must be a valid text payload." }) 
      .trim()
      .min(1, "Empty messages or empty whitespaces are rejected.")
      .max(2000, "Message length exceeds safety constraints (Max 2000 characters)."),
    
    sessionId: z
      .string()
      .uuid("Provided session identifier must be a valid UUID.")
      .optional(),
  }),
});

export type PostMessageInput = z.infer<typeof postMessageSchema>;