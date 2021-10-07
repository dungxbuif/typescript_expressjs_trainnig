import { ICustomerModel } from '../types/Models/ICustomerModel';
import mongoose, { Schema } from 'mongoose';

const CustomerSchema: Schema = new Schema({
   id: { type: Number, required: true },
   name: { type: String, requierd: true, default: null },
   address: { type: String, default: null },
});

export default mongoose.model<ICustomerModel>('Customer', CustomerSchema);
