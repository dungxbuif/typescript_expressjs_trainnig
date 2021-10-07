export interface IDelete<T> {
   delete(id: number): Promise<void>;
}
