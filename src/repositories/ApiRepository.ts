import { IRepository, IModel } from '../interfaces';
import { API_FIND_DATA_BY_DNI } from '../utils/constants/urls';
import DataApiModel from '../models/DataApiModel';
import { AxiosHttpClient } from '../utils/http-client/axiosHttpClient';
import { IHttpClientOptions, HttpMethod } from '../utils/interfaces/IHttp';
import { HttpNotFoundResponse } from '../utils/responseHandlers';
class ApiRepository implements IRepository {
  private httpClient: AxiosHttpClient = AxiosHttpClient.getInstance();
  async findData(data: IModel): Promise<IModel> {
    const { dni } = data;
    const options: IHttpClientOptions = {
      url: `${API_FIND_DATA_BY_DNI}${dni}`,
      method: HttpMethod.Get,
    };
    try {
      const response = await this.httpClient.request<any>(options);
      const result: IModel = new DataApiModel(response.data);
      return result;
    } catch (error: any) {
      throw new HttpNotFoundResponse(`Error fetching data: ${error.message}`);
    }
  }
  async saveData(data: IModel): Promise<IModel> {
    throw new HttpNotFoundResponse(`Method not implemented. ${JSON.stringify(data)}`);
  }
}

export default ApiRepository;
