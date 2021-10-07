import mongoose, { Schema } from 'mongoose';
import { IMyTimesheetsModel } from '../types/Models/IMyTimesheetsModel';

const MyTimesheetsSchema: Schema = new Schema({
   id: { type: Number, required: true },
   userId: { type: Number, required: true },
   typeOfWork: { type: Number, default: null },
   projectTaskId: { type: Number, default: null },
   note: { type: String, default: null },
   projectTargetUserId: { type: Number, default: null },
   workingTime: { type: Number, default: null },
   targetUserWorkingTime: { type: Number, default: null },
   dateAt: { type: Date, default: null },
   isCharged: { type: Boolean, default: null },
   status: { type: Number, default: 0 },
});

export default mongoose.model<IMyTimesheetsModel>('MyTimesheets', MyTimesheetsSchema);
