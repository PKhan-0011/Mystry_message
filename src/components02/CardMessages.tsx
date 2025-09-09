import React from 'react';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {Button} from '@/components/ui/button';
import { X } from 'lucide-react';
import { Message } from '@/model/User';
import axios from 'axios';
import ApiResponse from '@/types/ApiResponse';
import {toast} from 'sonner';


type Messages = {
    message: Message;
    onMessageDelete: (messageId: string) => void;
}

const CardMessages = ({message, onMessageDelete}: Messages) => {

   // yha p ek function call like handleDeleteConfirm ka ookkh!..
     
   async function handleDeleteConfirm(){
         const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`);
         
          toast(response.data.message);
          onMessageDelete(message.id);

   }

  return (
    <>
        <Card>
                 <CardHeader>
                   <CardTitle>Card Title</CardTitle>
                       <AlertDialog>

                <AlertDialogTrigger asChild>
                    <Button variant="destructive"><X className='w-5 h-5'/></Button>
                        </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                       <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                          <AlertDialogDescription>
                                          This action cannot be undone. This will permanently delete your
                                          account and remove your data from our servers.
                                        </AlertDialogDescription>
                                       </AlertDialogHeader>
                                     <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                   <AlertDialogAction onClick = {() => handleDeleteConfirm()}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                    </ AlertDialog>

                     <CardAction>Card Action</CardAction>
                     <CardDescription>Card Description</CardDescription>
                   </CardHeader>
                   <CardContent>
                  
                 </CardContent>
                 <CardFooter>
                   
                 </CardFooter>
        </Card>
    </>
  )
}

export default CardMessages;



