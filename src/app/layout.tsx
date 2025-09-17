import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from '@/context/AuthProvider';
import {Toaster} from '@/components/ui/sonner';
import Navbar from "@/components02/Navbar";
import Footer from '@/components02/footer';
import { ThemeProvider } from "@/components/theme-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mystry_Message's",
  description: "Message for u",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">


      <AuthProvider>
            
          <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >    
           <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={true}
            disableTransitionOnChange
          >   

           <Navbar />
            
           
           

           <main className="min-h-screen relative z-30 bg-white transition-colors duration-300">
               {children}
           </main>

          <Footer />

          <Toaster />

              </ThemeProvider>
      </body>
      </AuthProvider>

    </html>
  );
}

