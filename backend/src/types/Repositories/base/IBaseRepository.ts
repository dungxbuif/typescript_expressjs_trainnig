import { IDelete } from './IDelete';
import { IRead } from './IRead';
import { IWrite } from './IWrite';

export interface IBaseRepository<T> extends IWrite<T>, IRead<T>, IDelete<T> {}
