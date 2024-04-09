import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpMethod, IHttpClient, IHttpClientOptions, IHttpResponse } from '../interfaces/IHttp';
import PinoLogger from '../logger/logger';

export class AxiosHttpClient implements IHttpClient {
  private static instance: AxiosHttpClient;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create();
  }

  public static getInstance(): AxiosHttpClient {
    if (!AxiosHttpClient.instance) {
      PinoLogger.logDebug({ action: 'Creating AxiosHttpClient instance' });
      AxiosHttpClient.instance = new AxiosHttpClient();
    }
    PinoLogger.logDebug({ action: 'Getting AxiosHttpClient instance' });
    return AxiosHttpClient.instance;
  }

  public async request<T>(options: IHttpClientOptions): Promise<IHttpResponse<T>> {
    performance.mark('StartRequest AxiosHttpClient');
    PinoLogger.logDebug({
      action: 'Start request AxiosHttpClient',
      message: { options },
    });
    const { url, method, headers, data, timeout } = options;
    const axiosRequestConfig: AxiosRequestConfig = {
      url,
      method: method as HttpMethod,
      headers,
      data,
      timeout: timeout ?? 2000,
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.request(axiosRequestConfig);
      performance.mark('EndRequest AxiosHttpClient');
      performance.measure(
        'Request AxiosHttpClient',
        'StartRequest AxiosHttpClient',
        'EndRequest AxiosHttpClient',
      );
      PinoLogger.logDebug({
        action: 'End request AxiosHttpClient',
        message: response.data,
        duration: performance.getEntriesByName('Request AxiosHttpClient')[0].duration,
      });
      return response.data;
    } catch (error: any) {
      performance.mark('EndRequest AxiosHttpClient');
      performance.measure(
        'Request AxiosHttpClient',
        'StartRequest AxiosHttpClient',
        'EndRequest AxiosHttpClient',
      );
      PinoLogger.logError({
        action: 'Error request AxiosHttpClient',
        message: error.message,
        duration: performance.getEntriesByName('Request AxiosHttpClient')[0].duration,
      });
      throw error;
    }
  }
}
