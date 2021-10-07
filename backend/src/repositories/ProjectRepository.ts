import { SEARCH_TEXT_FIELD_PROJECTS } from './../constants/index';
import { IUsers_in_projectModel } from './../types/Models/IUsers_in_projectModel';
import { ITasks_in_projectModel } from './../types/Models/ITasks_in_projectModel';
import { IProjectReqDto } from './../dto/reqDto/IProjectReqDto';
import { searchTextFieldOpt } from './../utils/index';
import generateID from '../utils/generateID';
import db from '../models';
import logger from '../config/logger';
import UsersInProjectRepository from './UsersInProjectRepository';
import TasksInProjectRepository from './TasksInProjectRepository';
import { IProjectModel } from '../types/Models/IProjectModel';
import { BaseRepository } from './base/BaseRepository';
class ProjectRepository extends BaseRepository<IProjectModel> {
   constructor() {
      super(db.Project, 'ProjectRepository');
   }

   async createOrUpdate(projectInput: IProjectReqDto) {
      try {
         const { tasks, users } = projectInput;
         tasks.forEach((item) => {
            if (item.id === undefined) item.id = generateID('tasks_in_project');
            if (item.projectId === undefined) item.projectId = projectInput.id;
         });

         users.forEach((item) => {
            if (item.id === undefined) item.id = generateID('tasks_in_project');
            if (item.projectId === undefined) item.projectId = projectInput.id;
         });

         delete projectInput['tasks'];
         delete projectInput['users'];

         const project = await this._db.findOneAndUpdate({ id: projectInput.id }, projectInput, {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true,
         });

         const createdTasks: ITasks_in_projectModel[] = await TasksInProjectRepository.createMany(
            tasks,
         );

         const createdUsers: IUsers_in_projectModel[] = await UsersInProjectRepository.createMany(
            users,
         );

         let result = {
            ...project,
            tasks: createdTasks,
            users: createdUsers,
         };

         return result;
      } catch (error) {
         logger.error('create ProjectRepository error: ', error.message);
      }
   }

   async filterAll(status: number | null, search: string) {
      // Search with name | username ... text
      const searchFilter = [];
      let match = [];

      if (status !== null) match.push({ status });
      if (search) match.push({ $or: searchTextFieldOpt(search, SEARCH_TEXT_FIELD_PROJECTS) });
      if (match.length) searchFilter.push({ $match: { $and: match } });

      const customerNameQuery = [
         {
            $lookup: {
               from: 'customers',
               localField: 'customerId',
               foreignField: 'id',
               as: 'customerName',
            },
         },
         { $unwind: '$customerName' },
      ];

      const activeMemberQuery = [
         {
            $lookup: {
               from: 'users_in_projects',
               let: { id: '$id' },
               as: 'activeMember',
               pipeline: [
                  {
                     $match: {
                        $expr: {
                           $and: [{ $eq: ['$projectId', '$$id'] }, { $ne: ['$type', 3] }],
                        },
                     },
                  },
               ],
            },
         },
      ];

      const projectManagersQuery = [
         {
            $lookup: {
               from: 'users_in_projects',
               let: { id: '$id' },
               as: 'pms',
               pipeline: [
                  {
                     $match: {
                        $expr: {
                           $and: [{ $eq: ['$projectId', '$$id'] }, { $ne: ['$type', 3] }],
                        },
                     },
                  },
                  {
                     $lookup: {
                        from: 'users',
                        let: { userId: '$userId', type: '$type' },
                        as: 'name',
                        pipeline: [
                           {
                              $match: {
                                 $expr: {
                                    $and: [{ $eq: ['$id', '$$userId'] }, { $eq: ['$$type', 1] }],
                                 },
                              },
                           },
                           {
                              $project: {
                                 name: { $concat: ['$name', ' ', '$surname'] },
                              },
                           },
                        ],
                     },
                  },
                  { $unwind: '$name' },
               ],
            },
         },
      ];

      const formatReturnFields = [
         {
            $project: {
               id: '$id',
               customerName: '$customerName.name',
               name: '$name',
               code: '$code',
               status: '$status',
               pms: '$pms.name.name',
               activeMember: { $size: '$activeMember' },
               projectType: '$projectType',
               timeStart: '$timeStart',
               timeEnd: '$timeEnd',
            },
         },
      ];

      const filterOpt = [
         ...customerNameQuery,
         ...activeMemberQuery,
         ...projectManagersQuery,
         ...formatReturnFields,
         ...searchFilter,
      ];
      try {
         return await this._db.aggregate(filterOpt);
      } catch (error) {
         logger.error('findUserPagging UserRepository error: ', error.message);
      }
   }

   async findProjectsIncludingTasks(projectIds: number[], userId: number) {
      try {
         return await this._db.aggregate([
            { $match: { id: { $in: projectIds } } },
            {
               $lookup: {
                  from: 'tasks_in_projects',
                  let: { id: '$id' },
                  as: 'tasks',
                  pipeline: [
                     {
                        $match: {
                           $expr: {
                              $eq: ['$projectId', '$$id'],
                           },
                        },
                     },
                     {
                        $lookup: {
                           from: 'tasks',
                           localField: 'taskId',
                           foreignField: 'id',
                           as: 'taskName',
                        },
                     },
                     { $unwind: '$taskName' },
                     {
                        $project: {
                           _id: 0,
                           projectTaskId: '$id',
                           taskName: '$taskName.name',
                           billable: '$billable',
                        },
                     },
                  ],
               },
            },
            {
               $lookup: {
                  from: 'users_in_projects',
                  let: { id: '$id' },
                  as: 'projectUserType',
                  pipeline: [
                     {
                        $match: {
                           $expr: {
                              $and: [{ $eq: ['$projectId', '$$id'] }, { $eq: ['$userId', userId] }],
                           },
                        },
                     },
                     {
                        $project: {
                           _id: 0,
                           userId: '$userId',
                           type: '$type',
                           id: '$id',
                        },
                     },
                  ],
               },
            },
            {
               $lookup: {
                  from: 'users_in_projects',
                  let: { id: '$id' },
                  as: 'listPM',
                  pipeline: [
                     {
                        $match: {
                           $expr: {
                              $and: [{ $eq: ['$projectId', '$$id'] }, { $ne: ['$type', 3] }],
                           },
                        },
                     },
                     {
                        $lookup: {
                           from: 'users',
                           let: { userId: '$userId', type: '$type' },
                           as: 'name',
                           pipeline: [
                              {
                                 $match: {
                                    $expr: {
                                       $and: [{ $eq: ['$id', '$$userId'] }, { $eq: ['$$type', 1] }],
                                    },
                                 },
                              },
                              {
                                 $project: {
                                    name: { $concat: ['$name', ' ', '$surname'] },
                                 },
                              },
                           ],
                        },
                     },
                     { $unwind: '$name' },
                  ],
               },
            },
            {
               $lookup: {
                  from: 'customers',
                  localField: 'customerId',
                  foreignField: 'id',
                  as: 'customerName',
               },
            },
            { $unwind: '$customerName' },
            { $unwind: '$projectUserType' },
            {
               $project: {
                  _id: 0,
                  projectName: '$name',
                  customerName: '$customerName.name',
                  projectCode: '$code',
                  projectUserType: '$projectUserType.type',
                  listPM: '$listPM.name.name',
                  tasks: '$tasks',
                  targetUsers: '$projectTargetUsers',
                  id: '$id',
               },
            },
         ]);
      } catch (err) {
         logger.error('findByName ProjectRepository error: ', err.message);
      }
   }

   async updateWithUserAndTask(projectInput: IProjectReqDto) {
      try {
         const projectId = projectInput.id;

         await UsersInProjectRepository.deleteMany(projectId);
         await TasksInProjectRepository.deleteMany(projectId);

         return await this.createOrUpdate(projectInput);
      } catch (error) {
         logger.error('create ProjectRepository error: ', error.message);
      }
   }
}

export = new ProjectRepository();
