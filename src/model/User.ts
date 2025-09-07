// abb yha p generally hota ye hai like ki model create hote hai...

 import mongoose, { Schema , Document, Model} from 'mongoose';

 export interface Message extends Document {
    content: string;
    createdAt: Date
}

// // model define kar abb yha s okkh!..

const MessageSchema: Schema<Message> = new Schema({
      content: {type: String, required: true},
      createdAt: {type: Date, required: true, default: Date.now}
});


 export const MessageModel: Model<Message> = (mongoose.models.Message as mongoose.Model<Message>) || (mongoose.model<Message>("message", MessageSchema));


// // abb ek aur chiz ayegi yha p like user wali bat chit...

export interface User extends Document {
      email: string
      username: string
      password: string
      verifyCode: string
      isVerified: boolean
      verifyCodeExpiry: Date;
      isAcceptingMessages: boolean
      messages: Message[]
}

const userSchema: Schema<User> = new Schema({
     email: {type: String, required: [true, "Email is required"], unique: true, trim: true},
     username: {type: String, required: [true, "userName is required"], trim: true},
     password: {type: String, required: [true, "password is required"]},
     verifyCode: {type: String, required: [true, "verifyCode is required"]},
     isVerified: {type: Boolean, default: false}, // by default koi bhi verified nahi hoga...
     verifyCodeExpiry: {type: Date, required: [true, "verifyCodeExpiry is required"]},
     isAcceptingMessages: {type: Boolean, required: true},
     messages: [MessageSchema]
});

// // yha p model bhi actually create karna padega okkh!...
// // using trim bcz in case koi space hua to hat jayega ye okkh!...

 export const userModel: Model<User> = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", userSchema));

// Yha p do chize ayengi like User and another one is Message's thik hai...
// Generally iska matlb ye hoga like ki mongoose.models.User se jo bhi existing data hai wo aa jayega okkh!...


