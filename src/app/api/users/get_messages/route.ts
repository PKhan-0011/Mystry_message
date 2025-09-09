// Yha p sare message's ayegnge okkh!..

import { getServerSession } from "next-auth";
import {authOption} from '../auth/[...nextauth]/option';
import { dbConnect } from "@/dbConnect/connection";
import { userModel } from "@/model/User";
import {NextRequest, NextResponse} from 'next/server';
import {User} from 'next-auth';
import mongoose from 'mongoose';

export async function GET(request: NextRequest){
         
      await dbConnect();

      const data = await request.json();

      console.log(data);


      const session = await getServerSession(authOption);

      const user: User = await session?.user;

      if(!session || !user){
           return NextResponse.json({
              message: 'session are not in the dataBase..',
              success: false,

           }, {status: 500});
      }
          
      const userId = new mongoose.Types.ObjectId(user._id); // mongoose ki id type ka hoga ye okkh! 

      try{
            const user02 = await userModel.aggregate([
                   {$match: {id: userId}},
                   {$unwind: '$messages'},
                   {$sort: {'messages.createdAt': -1}},
                   {$group: {_id: '$_id', messages: {$push: '$messages'}}}
            ]);

            // isko todha s sahi s smjhne k koshish kario okkh!.. aggregration pipeline okkh!...

            console.log(user02);

            if(!user02 || user02.length === 0){
                return NextResponse.json({
                     message: 'User not found',
                      success: false,
                }, {status: 500})
            }

            return NextResponse.json({
                sucess: true,
                message: user02[0].messages
            }, {status: 200})
             
      }
      catch(e){
         const err = e as Error;
         console.log(err);

         return NextResponse.json({
             message: 'error hai yha p tera catch wala okkh!..',
             success: false,
         });
      }
}

// session for frontend and getServerSession for Backend isse hamm generally 
// karte ye hai ki kon sa user login hai ye pta kar lete hai okkh!.. 

