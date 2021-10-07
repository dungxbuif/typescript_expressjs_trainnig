export interface ProjectResDto {
   id: number;
   customerName: string;
   name: string;
   code: string;
   status: number;
   pms: Array<string>;
   activeMember: number;
   projectType: number;
   timeStart: string;
   timeEnd: string;
}
