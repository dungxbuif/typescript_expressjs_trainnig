export interface IMyTimesheetsModel {
   id: number;
   userId: number;
   typeOfWork: string;
   projectTaskId: number;
   note: string;
   projectTargetUserId: string;
   workingTime: number;
   targetUserWorkingTime: number;
   dateAt: Date;
   isCharged: boolean;
   status: number;
}
