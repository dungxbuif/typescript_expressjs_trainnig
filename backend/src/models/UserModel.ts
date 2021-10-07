import dotenv from 'dotenv';
import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import { IUserModel } from '../types/Models/IUserModel';
import bcrypt from 'bcrypt';

dotenv.config();

const JWT_KEY = process.env.JWT_KEY;

const UserSchema: Schema = new Schema({
   id: { type: Number, required: true },
   password: { type: String, required: true },
   userName: { type: String, default: '' },
   name: { type: String, default: '' },
   surname: { type: String, default: '' },
   fullName: { type: String, default: '' },
   emailAddress: { type: String, default: '' },
   phoneNumber: { type: String, default: '' },
   address: { type: String, default: '' },
   isActive: { type: Boolean, default: null },
   roleNames: { type: Array },

   projectUsers: { type: Array, default: [] },

   type: { type: Number, default: null },
   salary: { type: Number, default: null },
   salaryAt: { type: String, default: null },
   startDateAt: { type: String, default: null },
   allowedLeaveDay: { type: Number, default: null },
   userCode: { type: String, default: '' },
   jobTitle: { type: String, default: '' },
   level: { type: Number, default: null },
   registerWorkDay: { type: Number, default: null },
   avatarPath: { type: String, default: '' },

   managerId: { type: Number, default: 1 },

   managerAvatarPath: { type: String, default: '' },
   managerName: { type: String, default: '' },
   branch: { type: Number, default: 0 },
   sex: { type: Number, default: null },
   creationTime: { type: String, default: new Date() },
   morningWorking: { type: Number, default: null },
   morningStartAt: { type: String, default: '' },
   morningEndAt: { type: String, default: '' },
   afternoonWorking: { type: Number, default: null },
   afternoonStartAt: { type: String, default: '' },
   afternoonEndAt: { type: String, default: '' },
});

UserSchema.methods.generateAuthToken = async function () {
   const token = await jwt.sign(
      {
         id: this.id,
         roleNames: this.roleNames,
      },
      JWT_KEY,
   );
   return token;
};

UserSchema.methods.comparePassHash = async function (plainPass: String) {
   return await bcrypt.compare(plainPass, this.password);
};

export default mongoose.model<IUserModel>('User', UserSchema);
