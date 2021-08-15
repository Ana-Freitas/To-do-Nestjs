import * as mongoose from 'mongoose';

export interface TokenDocument extends mongoose.Document {
  username: string,
  hash: String,
}

export const TokenSchema = new mongoose.Schema<TokenDocument>({
  username: { type: String, required: true },
  hash: { type: String, required: true },
});