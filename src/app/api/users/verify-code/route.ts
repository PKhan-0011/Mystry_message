// Abb verify ki bari ayegi okkH!..

import {dbConnect} from '@/dbConnect/connection';
import {userModel} from '@/model/User';
import {NextRequest, NextResponse} from 'next/server';


export async function POST(request: NextRequest){
      await dbConnect();

      try{
             const {username, code} = await request.json(); // ye frontend s data ayega okkh!..

             const decodedUsername = decodeURIComponent(username); // is isliye bcz username m kuch bhi extra chize ayengi unko remove kar dega okkh!..

            const user = await userModel.findOne({username: decodedUsername});

            if(!user){
                return NextResponse.json({
                     message: "User not found",
                     success: false,
                }, {status: 500});
            }
            
            // yha kya hoga like user found...

            const isCodeValid = user.verifyCode === code;
            const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date(); // code ki expiry check karni padegi agar to mughe actauly ye dekhna padega like ki new Date dataBase s bda hai ya nahi okkh!...

            // dataBase m actaully time expiry jo hai wo zada hona chaiye okkh!.. as compare to new Date() okkh!..

            if(isCodeValid && isCodeNotExpired){
                // agar ye true hota hai okh!... 
                // isVerified ko true mark kar dena hai okkh!..
                user.isVerified = true;
                await user.save();

                // agar y sabb true hai yha s return karo okkh!..

                return NextResponse.json({
                    success: true,
                    message: 'Account verfied successfully!',
                }, {status: 201});
            }
            else if(!isCodeNotExpired){
                // iska mtlb ye hai ki code expire ho gya hai okh!..
                return NextResponse.json({
                     success: false,
                     message: 'code Expire ho gya hai okkh! Please signUp again to get a new code',
                }, {status: 500});
            }
            else{
                // yha p hoga ye like ki isCodeValid and isCodeNotExpired agar true nahi hai to else part..
                // isme sara data galt wala fill hoga okkh!..
                return NextResponse.json({
                    success: false,
                    message: "InCorrect verification code"
                }, {status: 400});
            }
      }
      catch(e){
         const err = e as Error;
         console.log(err);

         return NextResponse.json({
             sucess: false,
             message: "Error verifying user",
         }, {status: 500});
      }
}


// Yha p actaully 2-3 chize hongi like ki verify code etc...


