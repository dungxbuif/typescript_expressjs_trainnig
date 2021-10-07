import { ITaskModel } from './../types/Models/ITaskModel';
import mongoose, { Schema } from 'mongoose';

const TaskSchema: Schema = new Schema({
   id: { type: Number, required: true },
   name: { type: String, requierd: true, default: null },
   isDeleted: { type: Boolean, default: false },
   type: { type: Number, required: true },
});

export default mongoose.model<ITaskModel>('Task', TaskSchema);
