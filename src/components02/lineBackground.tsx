import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import Autoplay from "embla-carousel-autoplay";

import messages from '@/messages.json';

export function BackgroundLinesDemo() {
  return (
    <BackgroundLines className="flex  w-full flex-col px-4">
            <section className="flex gap-4">
                      <div className="pt-14 pl-16 space-y-8">

                            <h1 className="text-2xl md:text-3xl lg:text-7xl  font-bold px-4 space-y-4 text-transparent bg-clip-text  bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white font-sans "> Your Mystry </h1>
                            <h1 className="text-2xl md:text-3xl lg:text-7xl  font-bold px-4 space-y-4 text-transparent bg-clip-text  bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white font-sans "> Your Message </h1>
                            <h1 className="text-2xl md:text-3xl lg:text-7xl  font-bold px-4 space-y-4 text-transparent bg-clip-text  bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white font-sans "> Your Words.  </h1>
                            <h1 className="text-2xl md:text-3xl lg:text-7xl  font-bold px-4 space-y-4 text-transparent bg-clip-text  bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white font-sans "> Your Secret. </h1>
                            <h1 className="text-2xl md:text-3xl lg:text-7xl  font-bold px-4 space-y-4 text-transparent bg-clip-text  bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white font-sans "> Your Emotions,  </h1>
                            <h1 className="text-2xl md:text-3xl lg:text-7xl  font-bold px-4 space-y-4 text-transparent bg-clip-text  bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white font-sans "> Unlocked Secret. </h1>
                             
                      </div>
                       
                       <div>
                           { /*Yha p mugeh actaully sara carousel ka data likhna hai okkh!...*/}
                       </div>
            </section>
    </BackgroundLines>
  );
}






    
