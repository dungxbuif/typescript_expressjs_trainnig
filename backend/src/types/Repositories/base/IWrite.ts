import mongoose = require('mongoose');

export interface IWrite<T> {
   update(id: number, updateFeild: Object): Promise<T>;
   create(model: T): Promise<T>;
}
