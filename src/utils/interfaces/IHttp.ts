export enum HttpMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
  Options = 'OPTIONS',
  Patch = 'PATCH',
  Head = 'HEAD',
}

export interface IHttpClientOptions {
  method?: HttpMethod;
  headers?: { [name: string]: string };
  data?: any;
  options?: any;
  url?: string;
  timeout?: number;
}

export interface IHttpResponse<T> {
  status: number;
  headers?: { [name: string]: string };
  data?: T;
}

export interface IHttpClient {
  /**
   * Exchange the given HTTP request with the server at url.
   * @param {string} url
   * @param {HttpClientOptions} options
   * @returns {Promise<HttpResponse<T>>}
   */
  request<T>(options?: IHttpClientOptions): Promise<IHttpResponse<T>>;
}

/**
* Default HTTP client options each implementation to should use.
* @type {{method: HttpMethod; headers: {}; retry: WrapOptions}}
*/
export const DefaultHttpClientOptions: IHttpClientOptions = {
  method: HttpMethod.Get,
};
