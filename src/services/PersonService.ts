import { IService, IRepository, IModel } from '../interfaces';
import DataToFindModel from '../models/DataToFindModel';
import PinoLogger from '../utils/logger/logger';
class PersonService implements IService {
  private dynamoRepository: IRepository;
  private apiRepository: IRepository;

  constructor(dynamoRepository: IRepository, apiRepository: IRepository) {
    this.dynamoRepository = dynamoRepository;
    this.apiRepository = apiRepository;
  }

  async fetchDataByDni(dni: string): Promise<IModel> {
    performance.mark('Start fetchDataByDni');
    PinoLogger.logTrace({
      action: 'Start fetchDataByDni Service',
      message: { dni },
    });
    const dataToFind: IModel = new DataToFindModel(dni);
    const data: IModel = await this.apiRepository.findData(dataToFind);
    const result: IModel = await this.dynamoRepository.saveData(data);
    performance.mark('End fetchDataByDni');
    performance.measure('fetchDataByDni', 'Start fetchDataByDni', 'End fetchDataByDni');
    PinoLogger.logTrace({
      action: 'End fetchDataByDni Service',
      message: result,
      duration: performance.getEntriesByName('fetchDataByDni')[0].duration,
    });
    return result;
  }
}

export default PersonService;
