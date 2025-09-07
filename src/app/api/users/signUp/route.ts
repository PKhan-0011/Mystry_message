// Yha p abb hamm signUp ka bacjend ka logic craete karenge okkh!...

import {NextResponse, NextRequest} from 'next/server';
import { dbConnect } from '@/dbConnect/connection';
import {userModel} from '@/model/User';
import { sendVerficationEmail } from '@/helpers/sendVerificationEmail';
import bcrypt from 'bcrypt';

// Yahi jo hai sendVerfifaicationEmail isse hi hamm emails end karenge okkh!...

export async function POST(request: NextRequest){
     // abb yah s chize lena start karo okkh!..
     // Backed jaise hi start hoga mughe sabse pehle dnConnect karna hai okkh!..
     await dbConnect();

     try{
             const {username, email, password} = await request.json(); // ye Frontend s aa rha hai okkh!...
     
             const user = await userModel.findOne({
                      username,
             });
             
             console.log(user);

    // yha p ek check like in case wo user alraedy exist karta hai then kya karna hai okkh!..
     if(user){
        // agar user exist karta hai okkh and isVerify bhi hai then ye dataBase m exist karta hi karta hai okkH!..
        return NextResponse.json({
            success: false,
            message: 'user dataBase m exist karta hai okkH!.',
        }, {status: 5000});
    }
      
    // Yha p hoga ye like agar user exist hi nahi karta to aya hi first time hai okkh!.. abb email bhi cjeck kar lo 
    // for confirmation..

    const emailVerfication = await userModel.findOne({email});
    
     const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

     console.log(emailVerfication);

    if(emailVerfication){
        // agar email true hai to ye to exist karta hai okkh!..
         // Yha do bate hongi ek to ye verifed hai and another id verfied nahi hai okkh!,,
         if(emailVerfication.isVerified){
            // agar ye true hai to smjh lo pakka exist karta hai bcz otp s bhi verify hua hai okkh!..
            return NextResponse.json({
                success: false,
                message: 'user exist karta hai okkh!.. and verify bhi hai!',
            }, {status: 5000});
         }
         else{
            // email to exist karta hai but verfiy nahi hai okkh!...
            const hashedPassword = await bcrypt.hash(password, 10);
            emailVerfication.password = hashedPassword;
            emailVerfication.verifyCodeExpiry = new Date();
            emailVerfication.verifyCode = verifyCode;
            await emailVerfication.save();

            console.log(emailVerfication.password);
         }
    }
    else{
         // iska matlb ye hai ki email exist nahi karta okkh!.. yha p mai data sara khud s dataBase m push karunga okkh!...

              const hashedPassword = await bcrypt.hash(password, 10);
              const verifyCodeExpiry = new Date();
              verifyCodeExpiry.setHours(verifyCodeExpiry.getHours() + 1);

               console.log(hashedPassword);

          const newDataStore =  new userModel({
               username, 
               email,
               password: hashedPassword,
               verifyCode,
               verifyCodeExpiry,
               isVerified: false,
               isAcceptingMessages: true,
               messages: [],
         });
           
         await newDataStore.save();

         console.log(newDataStore);

         
    }   

       // abb yha p mughe actaully data send karna hai okkh!...
        
       const emailResponse = await sendVerficationEmail(
           email,
           username,
           verifyCode
           // dekh isme teen chize ye ani hi chaiye okkh!. otherwise they showing me error;...
       );
        
        console.log(emailResponse);

       if(!emailResponse.success){
          // iska matlb ye hai ki sendVerfication wala data chalega hi nahi okkh..
          return NextResponse.json({
             message: emailResponse.message,
             success: false,
          }, {status: 500});
       }
        
       // 

       return NextResponse.json({
          success: true,
          message: "User registered successfully. Please verify your account.",
       }, {status: 201});

      }

     catch(e){
         const err = e as Error;
         console.log(err, "Error aa rha hai yha p okkh!..");
         return NextResponse.json({
            success: false,
            message: 'Error Catch wala!',
         }, {status: 500});
     }
}

