import { IModel } from './';
export interface IService {
  fetchDataByDni(dni: string): Promise<IModel>;
}
