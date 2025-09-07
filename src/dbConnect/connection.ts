import mongoose from 'mongoose';

 export interface ConnectionObject {
    isConnected?: number
 }
  
const connection: ConnectionObject = {};

export  async function dbConnect(): Promise<void>{
     // yha p pehle check lagta hai like ki ye pehle connect to nahi hai okkh!..
     if(connection.isConnected){
        // agr ye true hai.. iska matlb ye hai ki ye already connected hai;
         console.log("already connected.. to dataBase");
     }

     // agar connection nahi hai then connect karo okkh!..
      try{
          
           const db = await mongoose.connect(process.env.MONGO_URL!);
              connection.isConnected = db.connections[0].readyState;
              console.log("Connect successFully!");

      }
      catch(e){
         const err = e as Error;
         console.log(err);
         throw new Error("Error are there! okkh!");
      }
}


