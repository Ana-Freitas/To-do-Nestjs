import * as mongoose from 'mongoose';

export interface UserDocument extends mongoose.Document {
    _id: number,
    name: string,
    username: string,
    password: string
  }

  export const UserSchema = new mongoose.Schema<UserDocument>({
    _id: { type: Number, require: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    
  }); 