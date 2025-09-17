// yha p bhi hamm generally getServer session s hi kuch lenge okkh!.. 
// like ye pta karnege ki login hai bhi ya nhai okkh!..

// yha p pehle login hua to session true hoga and then dataBase ki call p jayenge okkh 
// and delete kar denge okkh!...

import {getServerSession} from 'next-auth';               // hamm isse check kar lenge ki koi data login hai ya nahi okkh..
import {authOption} from '../../auth/[...nextauth]/option';
import {dbConnect} from '@/dbConnect/connection';
import {userModel} from '@/model/User';

import {User} from 'next-auth';
import mongoose from 'mongoose';
import {NextRequest, NextResponse} from 'next/server';

export async function DELETE(request: NextRequest, {params}: {params: {messageId: string}}){
      
      const messageId = params.messageId

      await dbConnect();

      const session = await getServerSession(authOption);
      const user: User = session?.user as User

      if(!session || user){
          console.log('session m kuch gdbd hai okkh!...s');
          return NextResponse.json({
              success: false,
              message: 'session m kuch galti hai delete wale folder m okkh!..'
          }, {status: 500})
      }
      
      // agar in case session sahi hai to mugeh actaully data delete karna padega okkh!..

      try{
           const updatedResult =  await userModel.updateOne(
            {
                _id: user._id
             },

              {$pull : {messages: {_id: messagesId}}},
              
            );

             if(updatedResult.modifiedCount == 0){
                   return NextResponse.json({
                    success: false,
                    message: 'not autenticated'
                   }, {status: 401})
             }
            return NextResponse.json({
                message: 'message Deleted',
                success: false,
            }, {status: 201});
      }

      catch(error){
         const err = error as Error;
         console.log(err);

         return NextResponse.json({
            success: false,
            message: "error hai yha p kuch okkh!..",

         }, {status: 500})
      }

}



// Bass itna dhyan rakhio like ki getServerSession s hamm backend ka session check karte hai if ye true hota hai then hame ye confirm ho jata hai ki 
// hamare dataBase m chize exist karti hai okkh and fir uske according hi hamm action's lete hai..

// but in case of frontend hamm session lete hai okkh!.. and session s page p data likh wa lete hai okkh!..