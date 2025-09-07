import {z} from 'zod';

export const userNameValidation = z.string().min(8).max(10);

export const signUpSchema = z.object({
    username: userNameValidation,
    email: z.string().email({message: "Invalid email address!"}),
    password: z.string().min(6, {message: "Password must be atleast 6 charcter"})
});



