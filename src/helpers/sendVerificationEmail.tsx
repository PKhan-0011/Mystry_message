import { render } from "@react-email/render";

import VerificationEmail from '../../emails/EmailVerification';
import resend from '@/dbConnect/ResendEmail';
import ApiResponse from '@/types/ApiResponse';

export async function sendVerficationEmail(
     email: string,
     username: string,
     verifyCode: string, // otp hai ye okkh!...
): Promise<ApiResponse>{
    try{

        const emailHtml = await render(
           VerificationEmail({ username:username, otp:verifyCode })
       );

          
       const data =  await resend.emails.send({
         from: 'Acme <onboarding@resend.dev>',
         to: email,
         subject: 'Mystry message | Verification_code',
         react: emailHtml,
      });

        console.log(data);
         return {success: true, message: 'email send successfully!'};

    }
    catch(e){
        
        const err = e as Error;
        console.log(err);
         return {success: false, message: 'email not send ...'};
    }
}
