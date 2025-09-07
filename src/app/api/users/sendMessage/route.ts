// send Message ka route ayega yha okkh!...

import { dbConnect } from "@/dbConnect/connection";
import { userModel } from "@/model/User";
import { Message } from "@/model/User";
import {NextRequest, NextResponse} from 'next/server';


export async function POST(request: NextRequest){
      await dbConnect();

      const {username, content} = await request.json();

      try{
             const user = await userModel.findOne({username});

             if(!user){
                 return NextResponse.json({
                    success: false,
                    message: "User Not found."
                 }, {status: 500});
             }

             // is User accepting the message's..
             if(!user.isAcceptingMessages){
                return NextResponse.json({
                    success: false,
                    messages: 'user accept nahi kar rah messages okkh!..',
                }, {status: 401});
             }

             // iska mtlb ye hai ki user Accept karega messages okkh!.. and user true aa rha hai okkh!..
             const newMessages = {content, createdAt: new Date()};
              user.messages.push(newMessages as Message);
               await user.save();

               return NextResponse.json({
                    messages: 'Message sent successfully', 
                    success: true,
               }, {status: 200});
      }

      catch(e){
             const err = e as Error;
             console.log(err);

             return NextResponse.json({
                  message: 'Error adding message:',
                  success: false,
             }, {status: 500});
      }
}

// isko sahi s dekhio ek bar then aage ka okkh!..