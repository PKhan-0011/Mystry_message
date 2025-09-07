// Ye acceptMessage's wala route ayega yha p okkh!..

import { getServerSession } from "next-auth";
import {authOption} from '../auth/[...nextauth]/option';
import { dbConnect } from "@/dbConnect/connection";
import { userModel } from "@/model/User";
import {NextRequest, NextResponse} from 'next/server';
import {User} from 'next-auth';

export async function POST(request: NextRequest){
     await dbConnect();

       // yha p generally karte ye hai ki hamm check karte hai ki login hai ya nahi okkh!...

           const session = await getServerSession(authOption);

           const user: User = await session?.user;

           // user k andar  data a jayega sara okkh!.. user:{id:1, username: username, password: password} etc etc.. okkh!..

           if(!session || !session.user){
                // matlb ye hai ki galati ha kuch okkh!..

                return NextResponse.json({
                     message: "session m kcuh gdbd hai okkh!..",
                     success: false
                }, {status: 500})
           }
            
           // agar session m kuch galti nahi hui then data nikalo okkh!..

           const userId = user._id;
           // mai similarly sara data nikl sakta hu.. like username etc etc..
           
           // upar wale s hamm ye dekhte hai ki ye data alrday present hai kya?.

           // abb kya pta frontend s kuch data aayega then kya karna hai ..

           const {acceptMessage} = await request.json(); 

     try{
         const updateUser = await userModel.findByIdAndUpdate(userId, {isAcceptingMessages: acceptMessage}, {new: true});

         if(!updateUser){
            // in case updateUser m kuch galatiya hui to kaise hongi chize okkh!,,
             return NextResponse.json({
             message: 'failded to update user status to accept message..',
             success: false,
        }, {status: 500});
         }
           
         else{
            // upadte user agar true hua to..

            return NextResponse.json({
             message: 'message update ho jayega and accept bhi hoga okkh!..',
             success: true,
        }, {status: 500});
         }
     }
     
     catch(e){
        const err = e as Error;
        console.log(err);

        return NextResponse.json({
             message: 'failded to update user status to accept message..',
             success: false,
        }, {status: 500});
     }
}

export async function GET(request: NextRequest){
      // Yha s sara data milta hai and fetch bhi karte hai yhi s okkh!..
        
      await dbConnect();

      const session = await getServerSession(authOption);

      const user = session?.user;
      
      if(!session || !user){
        // in dono m kuch galatiya hui to inko return karo ki isme kuch gdbd hai okkh!...
         return NextResponse.json({

         })
      }

      // agar session thik hua and session.user bhi thik hua to userId niklo okkh!..

      const userId = await user._id;

      const {message} = await request.json();
      
      console.log(message);

      try{

          const userFound = await userModel.findOne({userId});

           console.log(userFound);

          if(!userFound){
             // iska mmtlb ye hai ki user m kuch galtiya hai like userId m kuch nahi aya okkh!.
             return NextResponse.json({
                  message: 'User not found! ookh!...',
                  success: false,
             }, {status: 500});
          }
          
          // agar user mil gay hai to pura user return kardi okkh!.
          // userFound m sara data mil jayega okkh!...

          return NextResponse.json({
              message: userFound.isAcceptingMessages,
              success: true,
          }, {status: 201});

      }
      catch(e){
           const err = e as Error;
           console.log(err);

           return NextResponse.json({
             message: 'Error aaa rha hai ookh!..',
             success: false,
           })
      }
}

// is session m hamm pura object return karenge like {"user": {id: , name: , }}; ye hai sabb ye sara session m ayega okkh?..
// getServerSession s hamm actaully session logedin hai ya nahi ye check karte hai okkh.. agar session true hoga to wo callBack wala sara sessio return kar dega ookh!..
// getServersession s hamm actaly karte ye hai ki login jo bhi data hota hai wo sara le lete hai okkh!... yahi responsible hota hai data next/auth s lene ka okh!..