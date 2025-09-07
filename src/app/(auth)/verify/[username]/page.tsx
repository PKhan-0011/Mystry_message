'use client'

import React from 'react'
import { useState } from 'react';
import {useRouter} from 'next/navigation';
import { useParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { verifySchema } from '@/Schema/verifySchema';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import { toast } from 'sonner';
import axios, {AxiosError} from 'axios';
import ApiResponse from '@/types/ApiResponse';
import {Form, FormField, FormDescription, FormItem, FormControl, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';

const VerifyCode = () => {
   
  // yha p do chize ayengi dhyan s isko kario like first one is form 
  // and another one is onSubmit okkh!..
  const router = useRouter();
  const params = useParams();
  const [value, setValue] = useState('');


  const form = useForm<z.infer<typeof verifySchema>>({
       resolver: zodResolver(
            verifySchema,)
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        
      console.log(data);

      try{
           const response = await axios.post('/api/user/verify-code', {
               username: params.username,
               code: data.code
           });

           toast(response.data?.message);

           router.replace('/sign-in'); // ye is frontend k apge p bhej dega okkh!...
      }

      catch(e){
        
         const AxiosError = e as AxiosError<ApiResponse>;
           console.log(AxiosError);
           toast(AxiosError.response?.data.message ?? 'An error occurred. Please try again.',);
      }
      
  }


  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100"'>
          <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg border-2">
                <div className='text-center'>
                      <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl mb-6'>Verify Your Account</h1>
                      <p className="mb-4">Enter the verification code sent to your email</p>
                </div>

                 <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                          control={form.control}
                          name="code"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Enter Code</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your Verification Code" {...field}  className='py-7 mx-auto '/>
                              </FormControl>
                              <FormDescription>
                                This verification code.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                            <Button type='submit' >Verify</Button>

                          </form>
                </Form>
                
          </div>
    </div>
  )
}

export default VerifyCode;





