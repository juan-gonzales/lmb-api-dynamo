import { IModel } from './IModel';
export interface IRepository {
  findData(data: IModel): Promise<IModel>;
  saveData(data: IModel): Promise<IModel>;
}