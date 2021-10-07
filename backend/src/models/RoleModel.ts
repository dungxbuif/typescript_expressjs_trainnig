import { IRoleModel } from './../types/Models/IRoleModel';
import dotenv from 'dotenv';
import mongoose, { Schema } from 'mongoose';

dotenv.config();

const RoleSchema: Schema = new Schema({
   id: { type: Number, required: true },
   name: { type: String, default: '', required: true },
   displayName: { type: String, default: '' },
   normalizedName: { type: String, default: '' },
   description: { type: String, default: '' },
});

export default mongoose.model<IRoleModel>('Role', RoleSchema);
