// in case mughe objects chaiye to z.objects({}) m sara data likhna hota hai okkh!..
// yha p zada kuch nahi hai isme do chize hai like identifier and password..

// signIn m mughe do chize actauly chaiye like verify code and password ayega okkh!..

import {z} from 'zod';

export const signInSchema = z.object({
    // Ya to email likh ke ya fir identifier okkh!
    // but password ki acctaully need hai..
    identifier: z.string(),
    password: z.string()
})