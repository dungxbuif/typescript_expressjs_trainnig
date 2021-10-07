export interface TimesheetsReqDto {
   id: number;
   user: string;
   userId: number;
   projectId: number;
   projectName: string;
   taskId: number;
   taskName: string;
   customerName: string;
   projectCode: string;
   mytimesheetNote: string;
   projectTaskId: number;
   branchName: string;
   branch: number;
   dateAt: string;
   workingTime: number;
   status: number;
   note: string;
   isUserInProject: boolean;
   type: number;
   isCharged: boolean;
   avatarPath: string;
   level: number;
}
