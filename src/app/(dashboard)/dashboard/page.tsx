// abb dashboard k andar hamne
// layout and page's dono hamne nahi rakhe okkh isko ek bar rakh k try krna okh!..
'use client'

import React, { useCallback, useEffect } from 'react'
import {useState} from 'react'
import { Message } from '@/model/User'
import { toast } from 'sonner'
import {useSession} from 'next-auth/react';
import { useForm } from 'react-hook-form'
import { acceptingMessagesSchema } from '@/Schema/AcceptingMessagesSchema';
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import ApiResponse from '@/types/ApiResponse'
import axios from 'axios';
import {useRouter} from 'next/navigation'
import { Button } from '@/components/ui/button'
import { User } from 'next-auth'
import { Switch } from '@/components/ui/switch'
import  {Separator} from '@/components/ui/seperator';
import { Loader2, RefreshCcw } from 'lucide-react';
import CardMessages from '@/components02/CardMessages';


const Dashboard = () => {
   
  const [messages, setMessages] = useState<Message[]>([]);

  const [isLoading, setisLoading] = useState(false);
  
  const [isSwitchLoading, setisSwitchLoading] = useState(false);

  const router = useRouter();

  const handleDeleteMessage = (messageId: string) => {
       setMessages(messages.filter((message) => message._id !== messageId))
  }

  console.log(handleDeleteMessage);
  
  // yha p logic ye hai ki messageId kahi s aya hai okkh usko match karnge message._id == MessageId k 
  // barabar hua to new message hai okkh!..

   const {data: session} = useSession(); // iska mughe data jo hai wo lena hi padega bcz ye dashboard p hai okkh!..

    const form = useForm<z.infer<typeof acceptingMessagesSchema>>({
          resolver: zodResolver(acceptingMessagesSchema),
    });

    console.log(form);

    const {register, watch, setValue} = form;

    const acceptMessages = watch<any>('acceptMessages');



    const fetchAcceptMessage = useCallback(async () => {
          setisLoading(true);

          try{
                
                  const response = await axios.get<ApiResponse>('/api/users/accept-messages');
                  console.log(response);
                  setValue("message", response.data?.isAcceptingMessages ?? false);    
                  // above wale setVlaue ka matlb ye hai ki in case response.data?.isAcceptingMessages 
                  // agar true hai to true and agar false hai to fasle koi undefined ka kuch nahi hai okkh!...

          }
          catch(e){
             const AxiosError = e as AxiosError<ApiResponse>
             console.log(AxiosError);
             toast(AxiosError?.response?.data.message);
          }

          finally{
               setisLoading(false);
          }

    }, [setValue]);

    const fetchMessages = useCallback(async (refresh: boolean = false) => {
         
      setisLoading(true);
      setisSwitchLoading(false);

      try{
           
            const response = await axios.get('/api/users/get_mesasge');

            setMessages(response.data.messasge || []);

            if(refresh){
                // by default to false hai but in case true ho gya hai to wo toast mesasge send lardo uspe okkh!...
                toast('Showing latest message');

            }
      }

      catch(e){
         const error = e as AxiosError<ApiResponse>
         console.log(error);
         toast(error.response?.data.message);
      }
      finally {
         setisSwitchLoading(false);
         setisLoading(false);
      }
    }, [setMessages, setisLoading]);


   useEffect(() => {
         
    if(!session || !session.user){
             return;
    }

    // agar session true hai and 

    fetchMessages();
    fetchAcceptMessage();
        

   }, [setMessages, fetchAcceptMessage, fetchMessages, session, setValue]);

   
   // Handel submit ayega yha s 
   
   const handleSubmit = async () => {

      try{
            const response = await axios.post<ApiResponse>('/api/accept-message', {
                 acceptMessages: !acceptMessages,
            });

            setValue('message', !acceptMessages);

            toast(response.data.message);
      }
      catch(e){
               const axiosError = e as AxiosError<ApiResponse>
               console.log(axiosError);

               toast(axiosError.response?.data.message);
      }
   }
   
   console.log(handleSubmit());


   if(!session || !session.user){
        return (
             <>
                 <div>
                       Please Login...
                       <Button onClick={() => {router.push('/sign-in')}}>Login</Button>
                 </div>
             </>

        )
   }

     // copy wala code okkh!...

    const {username} = session?.user as User;
    
     const baseurl = `${window.location.protocol}//${window.location.host}`
     const publicUrl = `${baseurl}//${username}`;


     const copyToClipboard = () => {
           navigator.clipboard.writeText(publicUrl);
           toast('Profile URL has been copied to clipboard.');
     }


    // to ye dhyan rakhio like ki kabhi bhi api call karni padegi to mughe 
    // ya to useCallback lagana padega ya useEffect lagana padega okkh!....
    // taki rerendering wali bat chit na ho okkh!...


  return (
    <div className='my-8 mx-4 md:mx-8 lg:mx-auto p-6 relative z-30 bg-white rounded w-full max-w-6xl'>
           <h1 className='text-4xl font-bold mb-4'>User Dashboard</h1>

           <div className='mb-4'>
                 <h2 className='text-lg font-sembold mb-2'>Copy Your unique Link</h2>

                    <div className='flex items-center'>
                          <input type="text"
                            value={publicUrl}
                            disabled
                            className='input input-bordered w-full p-2 mr-2'
                          />

                          <Button onClick={copyToClipboard}>Copy</Button>
                    </div>
           </div>

           <div className='mb-4 flex items-center'>
                <Switch 
                  {...register('message')}
                  checked={acceptMessages}
                  // onCheckedChange={handleSwitchChange}
                  disabled = {isSwitchLoading}
                />

                <span className='ml-2'>
                  Accept Message: {acceptMessages? 'on': 'off'}
                </span>
           </div>

           <Separator />


           <button
              
              className="mt-4"
              onClick={(e) => {
              e.preventDefault();
              fetchMessages(true);
        }}

           >
                     {isLoading ? (
                          
                          <Loader2 className='h-4 w-4 animate-spin'/>

                     ) : (
                       <RefreshCcw className='h-4 w-4'/>
                     )}

           </button>

            <div>
                  {messages.length > 0 ? (
                        
                     // ye ek array hai isme bhut sare data hai isko fetch karo and arrange arrange accordingly!...

                     messages.map((message, index) => (
                        <CardMessages 
                           key = {index}
                           message={message}
                           onMessageDelete={handleDeleteMessage}
                        />
                     ))

                  ) : (
                       
                    <p>No message to display!..</p>
              
                  ) }
            </div>
    </div>
  )
}

export default Dashboard

// copy karne wala command like navigator.clipboard.writeText(text);

// 👉 useEffect = "kuch effect dalna hai render ke baad"
// 👉 useCallback = "function bar-bar naya na bane, ek hi reuse ho" aur jab funcation ko prop k through child ko send karna padega tab bhi useful okkh!..

// ek aur chiz ka dhyan rakhio like ki hame axios.get s chize milti hai from backend amd axios.post s chize send karte hai on backend okkh!..

// user input box k andar type na kar is liye hamm isko disable kar dete hai okkh!./