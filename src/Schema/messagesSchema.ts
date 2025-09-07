import {z} from 'zod';

export const messagesSchema = z.object({
    content: z.string().min(200).max(3000)
});