import { IModel } from '../interfaces';
class DataApiModel implements IModel {
  dni?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  studentCode?: string | null;
  studentId?: string | null;
  campus?: string | null;
  career?: string | null;
  program?: string | null;

  constructor(data: IModel) {
    this.dni = data.dni;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.studentCode = data.studentCode;
    this.studentId = data.studentId;
    this.campus = data.campus;
    this.career = data.career;
    this.program = data.program;
  }
}

export default DataApiModel;