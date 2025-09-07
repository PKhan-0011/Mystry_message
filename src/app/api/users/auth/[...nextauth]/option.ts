import  { NextAuthOptions } from 'next-auth';
import  CredentialsProvider from "next-auth/providers/credentials";
import  GoogleProvider from "next-auth/providers/google";
import  { dbConnect } from '@/dbConnect/connection';
import  { userModel } from '@/model/User';
import  bcrypt from 'bcrypt';


export const authOption: NextAuthOptions = {
    providers:[
        CredentialsProvider({
            id: "Credentials",
            name: "Credentails",

             credentials: {
                email: {label: 'Email', type: 'email'},
                password: {label: 'Password', type: 'password'}
             },

             async authorize(credentials: any): Promise<any> {
                   await dbConnect();
                     
                   // ye signIn wala hota hai jo async autorize m likhte hai okkh!..
                  // yha m actaully username, email and other chize ani hi chaiye okkh!...

                  try{
                       const user = await userModel.findOne({
                            $or: [
                                {email: credentials.identifier},
                                {username: credentials.identifier}
                            ]
                        });
                     
                        if(!user){
                            // agar user m kuch galati hui then error dega okkh!..
                            throw new Error("Error are there",);
                        }

                        if(!user.isVerified){
                            throw new Error(
                                "user not verifie also okkh!.."
                            )
                        }

                        // agar user true hua then kya karna hai okkh!..
                        const passwordHashed = await bcrypt.compare(credentials.password, user.password);

                        // agar password true hua to user bhi true hi hai okkh!..then user return kar do okkh!..

                        if(passwordHashed){
                            return user;
                        }

                        // agar password hashed nahi hai then error ayega okkh!...
                        else{

                            throw new Error(
                                "Icorrect password!"
                            )
                        }
                  }
                  catch(e){
                     const err = e as Error;
                     console.log(err);
                     throw new Error("Error hai yha p okkh!", err);
                  }
             }
        }),

        // iske andar hi googleProvider and faceBokk thridparty credentails likhnge... okkh!
        GoogleProvider ({
                clientId: process.env.GOOGLE_CLIENT_ID!,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET!
      }),
    ],
     
    callbacks: {
          // isme do chize ayengi okkh!.. jwt and session okkh!..
    async session({ session,  token }) {
        
        if(token){
            session.user._id = token._id;
            session.user.isVerified = token.isVerified;
            session.user.isAcceptingMessage = token.isAcceptingMessages;
            session.user.username = token.username
        }

      return session;
    },

    async jwt({ token, user, }) {
       
        if(user){
            token._id = user._id?.toString();
            token.isVerified = user.isVerified;
            token.isAcceptingMessage = user.isAcceptingMessage;
            token.username = user.username;
        }

      return token;
    }
    },

    // yha p ata hai bhut sari chize like pages secret and callbacks..
    //  pages: {
    //      signIn: '/sign-in', // ye page mughe banana padega okkh!.
    //  },

     session: {
        strategy: "jwt",
     },
     secret: process.env.NEXTAUTH_SECRET!, 
}


// hamne dekha hoga har jagah like ki kabhi koi user logIn nahi hota aur dashboard p jata hai 
// to wo kuch click karta hai then wo direct login page p chla jata hai wo ye pages hi karte hai okkh!..

// agar maine pages liya hi nahi hai to ye byDefault apne pages le lega and login nahi hai to login page p chla jayega apne app hi okkh!..
// but in case pages use kiye hai to jo jo mention karunga wo sara page banana hi padega.
// like agar user login nahi hai to ye sign-in page p chla jayega okkh!....

// pages m bass itna samjh le like ki signIn singOut newUser isAccepting mesasge somthing ye teen 4 chize ayengi okkh!..
// to agar maine pages m ye define kiya hai to mughe pages banana padega okkh!..
// gara nahi define kiya hai to by_default apne app hi chla jayega...