// VerifySchema ki in case bat karenge to yha p actaully code ayega okkh!..

import {z} from 'zod';

export const verifySchema = z.object({
    code : z.string()
});

