'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import {useState, useEffect } from 'react';
import {useDebounceCallback} from 'usehooks-ts';
import {toast} from 'sonner';
import {useRouter} from 'next/navigation';
import { signUpSchema } from '@/Schema/SignUpSchema';
import ApiResponse from '@/types/ApiResponse';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Loader2} from 'lucide-react';

export const SignUp = () => {
      const [username, setUsername] = useState('');
      const [backendMessage, setBackendMessage] = useState('');
      const [isCheckingUsername, setisCheckingUserName] = useState(false); 
      // ye above wala userName check karega okkh! ki ye userName thik hai ya nahi okkh..
      const [submitting, setIsSubmitting] = useState(false); // ye submiting k during ka hai okkh!,, ki submit hoga then hame kuch loader show karna hai okkh!..
      const debounceUsername = useDebounceCallback(setUsername, 300);
      const router = useRouter();


      // Zod implementation... 
        const form = useForm<z.infer<typeof signUpSchema>>({
           resolver: zodResolver(signUpSchema),
           defaultValues: {
               username: '',
               email: '',
               password: ''
           }
        });

        useEffect(() => {
              
          const checkDebounceValueUnique = async () => {
                if(debounceUsername){
                  // agar ye true hota hai jo ki hogi hi..
                   setisCheckingUserName(true); // ye todha loader wagahrh dikayega okkh!..
                   setBackendMessage(''); // yha s kuch message nahi jayega okkh!..

                  try{

                        const response =  await axios.get<ApiResponse>(`api/user/check-userName-unique?username=${debounceUsername}`);
                        console.log(response);
                        setBackendMessage(response.data.message); // ye backend p data chla jayega okkh!..

                  }

                  catch(e){

                      const error = e as AxiosError<ApiResponse>;
                      console.log(error);
                      setBackendMessage(error.response?.data.message ?? "Error checking username");
                      
                  }finally{
                    setisCheckingUserName(false);
                }
                }
          };
             checkDebounceValueUnique();

        }, [debounceUsername]);


        const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
              setIsSubmitting(true);

              try{
                  console.log(data);
                  const response = await axios.post<ApiResponse>('/api/users/signUp', 
                       data
                   );

                   console.log(response.data.message);
                   
                   toast( response.data.message );

                   router.replace(`/verify/${username}`);

                   // replace s code is url p chla jayega and wapa ayega nhai okkh!...

                    // yha s mughe ek page banana padega verify ka usme userName ayega isse username le lenge..
                    // and verifyCode bhi lena hi padega jisse hame userName and verifyCode dono mil jaye verify Page p okkh!..

                    setIsSubmitting(false); // ye submit ho jayega uske baad ye karna hai okkh!..
              }
              catch(e){
                  console.error("Error in signup of user", e);
                  const errorMessage = e as AxiosError<ApiResponse>;
                   const errorMessage02 = errorMessage.response?.data.message;

                   toast(errorMessage02);

                   setIsSubmitting(false);
              }
        }
        
        // onSubmit ke andar ek data ayega dhyan s dekhio okkh!..
       
        // isme teen chize ati hai like form useEffect and onSubmit..,

     return (
       <div className='flex justify-center items-center min-h-screen bg-gray-100'>
             <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md mb-8'>

                    <div className='text-center'>

                         <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl mb-6'>Join True FeedBack </h1>
                         <p className='mb-4'>Sign Up to start your anonymous adventure</p>

                    </div>

                     <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                            <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel> Username </FormLabel>
                                        <FormControl>
                                          <Input placeholder="username" type="text" {...field} onChange={(e) => {
                                             field.onChange(e)
                                             setUsername(e.target.value)
                                          }}/>                                            
                                        </FormControl>

                                         { isCheckingUsername && <Loader2 className='animate-spin' /> }

                                          { !isCheckingUsername && backendMessage && (
                                            <p

                                              className={`text-sm ${backendMessage === 'username is unique' ? 'text-green-600' : 'text-red-600'}`}
                                            >{backendMessage}
                                            
                                            </p>

                                          )}
                                        <FormMessage />
                                      </FormItem>
                                    )}
                               />     

                               <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Email</FormLabel>

                                        <FormControl>
                                          <Input type="text" placeholder="email" {...field} />                                     
                                        </FormControl>
                                            <p className=' text-gray-400 text-sm'>We will send you a verification code</p> 
                                        <FormMessage />
                                      </FormItem>
                                    )}
                               />  

                               <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                          <Input type="password" placeholder="Enter your password" {...field} />                                            
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                               />       

                               <div className='flex gap-5 justify-between mx-auto items-center'>

                                <div>
                                   
                                    <Button type="submit" disabled={submitting}>
                            
                            {
                              submitting ? (
                                  <>
                                   <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
                                   Please wait...
                                  </>
                              ) : ('sign-Up')
                            }

                                     </Button> 
                                </div>

                                <div> 
                                  <p className='text-1xl font-bold'>
                                    Already have an account?{' '}
                                    <Link href={"/sign-in"} className='text-blue-600 hover:text:-blue-800'>
                                      Sign-In
                                    </Link>
                                  </p> 
                                </div>
                    
                                </div>               
                           
                        </form>      
                     </Form>
             </div>
       </div>
     )
}

export default SignUp; 

// ye jo ho rahe hai like session jo hamne next-auth m diya tha like session based wahi hai ye okkh!..
// bass itna samjh le ladle like ki useSession hamne isliye lagaya hai bcz isse hame session mil jayega okkh!.. jo next-auth me present hai okkh... 

// /api/auth/[...nextauth] ye routes hai  

// useSession jo hai wo frontend k liye hota hai simple and getServerSession jo hai wo backend k liye hota hai okkh!..


// router.replace and router.push m do chizo ka diffrence hai like 
// router.replace m hamm agar kisi data p gaye to wapas nahi ja sakte like purane wale route p..
// but in case hamm router.push karte hai to hamm back aa sakte hai okkh??..





