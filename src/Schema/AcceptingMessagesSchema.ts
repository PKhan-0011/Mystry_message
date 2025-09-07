// Schema m 4-5 chize hai like signIn Schama signUp schema verifySchem messagesSchema and acceptingMessagesSchema.

// Accepting message's...

import {z} from 'zod';

export const acceptingMessagesSchema = z.object({
    message: z.boolean(),
})