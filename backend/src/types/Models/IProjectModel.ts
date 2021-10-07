export interface IProjectModel {
   id: number;
   name: string;
   code: string;
   status: number;
   timeStart: Date;
   timeEnd: Date;
   note: string;
   projectType: number;
   customerId: number;
   projectTargetUsers: Array<any>;
   isAllUserBelongTo: boolean;
}
