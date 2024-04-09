import { IModel } from '../interfaces';
class DataToFindModel implements IModel {
  dni: string | null;
  constructor(dni: string | null) {
    this.dni = dni;
  }
}

export default DataToFindModel;