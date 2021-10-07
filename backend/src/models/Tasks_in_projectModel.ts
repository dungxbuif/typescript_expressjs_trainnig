import mongoose, { Schema } from 'mongoose';
import { ITasks_in_projectModel } from '../types/Models/ITasks_in_projectModel';

const Tasks_in_projectSchema: Schema = new Schema({
   id: { type: Number, requied: true },
   projectId: { type: Number, requied: true },
   taskId: { type: Number, requied: true },
   billable: { type: Boolean, default: false },
});

export default mongoose.model<ITasks_in_projectModel>('Tasks_in_project', Tasks_in_projectSchema);
