export interface IRead<T> {
   findAll(): Promise<T[]>;
   findOne(field: object): Promise<T>;
}
