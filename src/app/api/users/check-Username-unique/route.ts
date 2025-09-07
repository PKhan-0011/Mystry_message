// Yha userName jo hoga usko unique check karnge okkh!...

import {NextRequest, NextResponse} from 'next/server';
import { userNameValidation } from '@/Schema/SignUpSchema';
import {dbConnect} from '@/dbConnect/connection';
import { userModel } from '@/model/User';
import {z} from 'zod';

const usernameQuerySchema = z.object({
    username: userNameValidation,
});

export async function GET(request: NextRequest){
    await dbConnect();

    if(request.method !== 'GET'){
         return NextResponse.json({
              success: false,
              message: 'Method are not allowed | only GET allowed..',
         });
        }

    try{
          // mughe yha p actaully do chize aur leni hai like  Url 
          
          const {searchParams} = new URL(request.url);
          // searchParams m mughe sara url mil jayega like http://localhost:3000/signup?:id=1&name="parbej",
          
          const querySchema = {
               username: searchParams.get('username'),
          }

           // validate with zod..
           const result = usernameQuerySchema.safeParse(querySchema);
           console.log(result);

           if(!result.success){
                // ye thik nahi hai that mean's yha p kuch error hai okkh!...
                const userNameError = result.error.format().username?.errors || []

                return NextResponse.json({
                     success: false,
                     message: userNameError
                }, {status: 500});
           }

           // agar result tera false nahi hai to wo 

           const {username} = result.data;

          const user = await userModel.findOne({username, isVerified: true});

          if(!user){
              // agar user exist hi nahi karta then mughe kuch chize return karni hongi like 
              // error type ka okkh!..
              return NextResponse.json({
                  success: false,
                  message: "user are there! in dataBase",
              });
          }

          // in case user false nahi hota then mughe 

          return NextResponse.json({
             success: true,
             message: 'User aya hi first time hai and unique bhi hai okkh!..',
          });
    }

    catch(e){
        const err = e as Error;
        console.log(err);

        return NextResponse.json({
            message: "Error catch wala check_username_unique",
            success: false,
        }, {status: 500});
    }
} 


// result.error.format().username?.errorrs || []