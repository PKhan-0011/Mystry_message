import { NextResponse, NextRequest } from 'next/server';
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt"

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
   
    const token = await getToken({req: request});
    const url = request.nextUrl;

     if(token && ( 
        url.pathname.startsWith('/sign-in') || 
        url.pathname.startsWith('/sign-up') || 
        url.pathname.startsWith('/verify')  ||
        url.pathname.startsWith('/')
    ))
     
    {
      return NextResponse.redirect(new URL('/home', request.url));
    }

      if (!token && url.pathname.startsWith('/dashboard')) {
         return NextResponse.redirect(new URL('/sign-in', request.url));
   }


   return NextResponse.next();
  
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
     '/sign-in',
     '/sign-up',
     '/',
     '/dashboard/:path*',
     '/verify/:path*',
  ]
}

// useSession.. ki bat agr karenge to ye agar user login nahi hai to client side p check karke login page p redircet kra dega okkh!..
