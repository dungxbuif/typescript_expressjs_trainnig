import mongoose, { Schema } from 'mongoose';
import { IProjectModel } from '../types/Models/IProjectModel';

const ProjectSchema: Schema = new Schema({
   id: { type: Number, required: true },
   name: { type: String, default: null },
   code: { type: String, default: null },
   status: { type: Number, default: 0 },
   timeStart: { type: Date, default: null },
   timeEnd: { type: Date, default: null },
   note: { type: String, default: null },
   projectType: { type: Number, default: null },
   customerId: { type: Number, default: null },
   projectTargetUsers: { type: Array, default: [] },
   isAllUserBelongTo: { type: Boolean, default: true },
});

export default mongoose.model<IProjectModel>('Project', ProjectSchema);
