import mongoose, { Schema } from 'mongoose';
import { IUsers_in_projectModel } from '../types/Models/IUsers_in_projectModel';

const Users_in_projectSchema: Schema = new Schema({
   id: { type: Number, required: true },
   projectId: { type: Number, required: true },
   userId: { type: Number, required: true },
   type: { type: Number },
});

export default mongoose.model<IUsers_in_projectModel>('Users_in_project', Users_in_projectSchema);
