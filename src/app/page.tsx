'use client'

import {BackgroundLinesDemo} from '@/components02/lineBackground'

export default function Home() {
  return (
     <>
          <div className='w-full max-h-screen'>
                <div>
                       <BackgroundLinesDemo />      
                </div> 
                 
          </div>     
     </>
  );
}


// Yha p ek chiz ka dhyan jarror rakhna like ki reDirect ata hai ek.. and Router ata hai ek 
// in sab chizo m mughe actaully karna ye hota hai ki reDirect m generally mughe page badlna nahi padta 
// for and example hamm sabse pehle login check karte hai agar wo login nahi hua to directly login page p send kar dega ye url 
// okkh and iska hi dhyan rakhio like ki isme koi page nahi bnta..
// But router m mughe ek page p push karna hota hai okkh... router.push('/url) to ye page hi hota hai single page 

// In reDirect hamm page nahi change karte agr login nahi hua to ye directly reDirect hoke login page p apne app chla jayega okkh!..
// isko h reDirect kahte hai ye Nextauth me session wala pe ata hai anc lerk mai currentruser() banke ata hai okkh!...