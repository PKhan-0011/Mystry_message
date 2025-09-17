import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import Autoplay from "embla-carousel-autoplay";


import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  
} from "@/components/ui/carousel";

import { CardHeader } from "@/components/ui/card";

import { Card, CardContent } from "@/components/ui/card";
import messages from '@/messages.json';

import {Button} from '@/components/ui/button';

import Link from 'next/link'

export function BackgroundLinesDemo() {
  return (

    <BackgroundLines className="flex  w-full flex-col px-4 ">
            <section className="pointer-events-auto flex gap-4 w-full items-center justify-around px-8  py-12">
                      <div className="pt-14 pl-16 space-y-8">
                            <h1 className="text-2xl md:text-3xl lg:text-7xl  font-bold px-4 space-y-4 text-transparent bg-clip-text  bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white font-sans "> Your Mystry </h1>
                            <h1 className="text-2xl md:text-3xl lg:text-7xl  font-bold px-4 space-y-4 text-transparent bg-clip-text  bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white font-sans "> Your Message </h1>
                            <h1 className="text-2xl md:text-3xl lg:text-7xl  font-bold px-4 space-y-4 text-transparent bg-clip-text  bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white font-sans "> Your Words.  </h1>
                            <h1 className="text-2xl md:text-3xl lg:text-7xl  font-bold px-4 space-y-4 text-transparent bg-clip-text  bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white font-sans "> Your Secret. </h1>   

                             <div className="w-20 md:w-50 lg:w-full relative z-10">
                                 <Button asChild className="bg-white text-black text-2xl mx-4 h-12 w-44   hover:opacity-90 overflow-hidden">
                                        <Link href='/dashboard' className="text-black hover:text-white-900">
                                                DashBoard
                                       </Link>
                                 </Button>
                                 
                                  <Button asChild className="bg-white text-black text-2xl mx-4 h-12 w-44 hover:bg-slate-200 overflow-hodden">
                                        <Link href='/sign-Up' className="text-black mx-4 my-4">
                                                Sign-Up
                                       </Link>
                                 </Button>

                                
                                 
                             </div>
                      </div>

                      <div className="flex flex-cols items-center mt-20">
                           <Carousel className="w-full max-w-xs text-white" plugins={[Autoplay({delay:2000})]}>
                                   <CarouselContent>
                                     {messages.map((data, index) => (
                                          <CarouselItem key={index}>
                                            <div>
                                               <Card className="text-2xl font-bold text-white">
                                                     <CardHeader>{data.title}</CardHeader>
                                                     <CardContent>
                                                               {data.content}                    
                                                     </CardContent>
                                                     <CardHeader>{data.title}</CardHeader>
                                               </Card>
                                            </div>
                                          </CarouselItem>
                                     ))}
                                   </CarouselContent>
                                   <CarouselPrevious />
                                   <CarouselNext />
                             </Carousel>
                      </div>


            </section>
    </BackgroundLines>
  );
}




    
