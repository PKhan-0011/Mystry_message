'use client'

import React from 'react'
import {useSession, signOut} from 'next-auth/react'
import {User} from 'next-auth';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ThemeButton from '@/lib/ThemeButton';


const Navbar = () => {

    const {data:session} = useSession();
    
    const user: User = session?.user;

    console.log(user); // iske andar sara data hoga like user: {id: , username: , email: , password: ,};



  return (

    <nav className='p-4 md:p-6 shadow-md relative z-50 flex flex-row items-center gap-14 '>
        <div className='container mx-auto flex flex-col md:flex-row justify-between items-center '>
              <a 
                className='text-4xl font-bold mb-4 md:mb-0'
              href={"/"}>Mystry Message</a>

              {
                 session ? (
                    <>
                        
                        <span className='mr-4'>
                               Welcome, {user.username || user.email}
                        </span>
                        <Button onClick={() => signOut()} className='w-full md:w-auto'>Logout</Button>

                    </>
                 ) : (
                    <>
                           <Link href={'/sign-in'}>
                                <Button className='w-full md:w-auto text-[1.3rem] border-2 bg-black text-white p-6'>Login</Button>
                           </Link>

                    </>
                 )
              }   
        </div>
         <ThemeButton/>
    </nav>

  )
}

export default Navbar;

// useSession jo hai wo hooks hai ek usse direct mai data nahi le sakta okkh!..
// kahi p mugeh iska data store karna padega okkh! ans then use lena padega gotIt..

// bhai dekh yha s jo User ayega usme sara data rahega like session token etc.. 

