import { IModel } from '../interfaces';
import {v4 as uuidv4} from 'uuid';

export class DataToSaveModel {
  source: string;
  id: number;
  periodo: string;
  status: string;
  user: string;
  silent: boolean;
  alumno: string;
  date: string;
  grado: string;
  medio: string;
  institucion: string;
  cicloLectivo: string;
  clases: any[];
  constructor(data: IModel) {
    this.source = uuidv4();
    this.id = 1;
    this.periodo = '2231';
    this.status = 'PENDIENTE';
    this.user = data.studentCode ?? '';
    this.silent = false;
    this.alumno = data.studentId ?? '';
    this.date =new Date().toISOString();
    this.grado = data.career ?? '';
    this.medio = 'MEL';
    this.institucion = 'UNUTP';
    this.cicloLectivo = '2231';
    this.clases = [];
  }
}