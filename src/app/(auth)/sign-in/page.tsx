'use client'

import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import { AxiosError } from 'axios';
import Link from 'next/link';
import {useState} from 'react';
import {toast} from 'sonner';
import {useRouter} from 'next/navigation';
import ApiResponse from '@/types/ApiResponse';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Loader2} from 'lucide-react';

import React from 'react'
import { signInSchema } from '@/Schema/signInSchema';
import { signIn } from 'next-auth/react';
//import Image from 'next/image';

const SignIn = () => {
   
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof signInSchema>>({
       resolver: zodResolver(signInSchema),
       defaultValues:{
          identifier: '',
          password: ''
       }
  });
  
  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
         setIsSubmitting(true);

         // bcz isse hamm submittig true kar denge okkh!..

         try{
                const result = await signIn('credentials', {
                     identifier: data.identifier,
                     password: data.password
                });

                console.log(result);

                // Abb iss result s bhut sari chize ayengi like result.erroro and url aur status bhut sari chize okkh!...

                if(result?.error){
                    if(result.error === 'CredentialsSignin'){
                        toast('Invalid email and password')
                    }
                    else{
                            // kya pta wo credentailsSignIn wala na ho to uske baad kya karna hai okkh!..
                            toast(result.error);
                    }
                }
                 
                if(result?.url){
                   // agar ye true ata hai iska matlb ye hai ki like ki url aa rahe hai okkh!
                   toast(result.url);

                   router.replace('/dashboard');
                }
                setIsSubmitting(false);
         }

         catch(err){
             const error = err as AxiosError<ApiResponse>;
              console.log(error);
              toast(error?.message);
         }
  }

  return (

        <>

        <div className='flex justify-center items-center min-h-screen bg-indigoDark'>
              <div className='w-full max-w-md p-8 space-y-8 bg-purple rounded-lg shadow-md'>
                     <div className='text-center'>
                           <h1 className='text-3xl font-extrabold tracking-tight lg:text-4xl mb-6'> Welcome Back to True Feedback</h1>
                           <p className='mb-4 text-2xl '>Sign in to continue your secret conversations</p>
                            
                            <Form {...form}>
                                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <FormField
                                      control={form.control}
                                      name="identifier"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel> Email/Username</FormLabel>
                                          <FormControl>
                                            <Input placeholder="Email/Username" {...field} />
                                          </FormControl>
                                         <FormMessage />
                                        </FormItem>
                                      )}
                                    />

                                      <FormField
                                      control={form.control}
                                      name="password"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel> Password</FormLabel>
                                          <FormControl>
                                            <Input placeholder="Password" {...field} />
                                          </FormControl>
                                         <FormMessage />
                                        </FormItem>
                                      )}
                                    />

                                    <div className='flex gap-2 items-center justify-between'>
                                        
                                        <Button type="submit" className='text-1xl p-auto border-2xl rounded-md bg-black text-purple pb-2'>
                                       
                                       {

                                        isSubmitting ? (
                                            <>
                                              <Loader2 className='mx-4 h-4 animate-spin'/>
                                                please wait...
                                            </>
                                        ) : ('Sign-In')
                                       }

                                    </Button>

                                    <div className='text-center mt-4"'>
                                        <p  className='text-[1.2rem]'>
                                         Not a membet yet: 
                                         <Link href={'/sign-up'} className='text-blue-600 hover:text-blue-800'>  SignUp</Link>
                                        </p>
                                    </div>

                                    </div>
                                  </form>
                           </Form>
                            
                      </div>
              </div>
        </div>                 
                </>
  )
}

export default SignIn;



// Ek aur myth google button hame banana hi padega okkh!..
// ye kahi s fetch nahi hota jaisa tu soch rha ha ki ye button apne app aa jayenge aisa nahi hota okkh!...

     // <div className=''>
     //     <Button type='button' onClick={() => signIn('google', {callbackUrl: '/dashboard'})} 
     //     className="flex items-center justify-evenly gap-3 border border-gray-300 rounded-md bg-white text-black p-6 hover:bg-gray-100">
     //         <Image src="/Google.png" alt="google" height={40} width={40}/>
     //           SignIn With GOOGLE
     //     </Button>
     //   </div>


     // ye tera butoon banana padega for login by google etc and other bhi aisa hi kuch ayega okkh!..
     // Bass ye dhyan rakhio like ki hame ye button's khud hi create karenge okkh ye kahi s fetch nai hote
     // but on click pe oAuth kam karta hai and sara data check karta hai okkh!.. like ye user chal bhi rha hai ya nhai okkh!..