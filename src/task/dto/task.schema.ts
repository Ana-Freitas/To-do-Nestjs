import * as mongoose from 'mongoose';

export interface TaskDocument extends mongoose.Document {
    _id: number,
    title: String,
    description: String,
    createDate: Date,
    finishDate: Date,
    isDone: Boolean
  }

  export const TaskSchema = new mongoose.Schema<TaskDocument>({
    _id: { type: Number, require: true },
    title: { type: String, required: true },
    description: { type: String},
    createDate: { type: Date, required: false, default: new Date() },
    finishDate: { type: Date, required: false, default: new Date() },
    isDone: { type: Boolean, required: false, default: false }
  }); 