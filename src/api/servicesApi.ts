import baseApi from './baseApi';
import { AxiosRequestConfig, Method } from 'axios';

export interface RequestData {
  url: string;
  method: Method;
  params: any;
  body?: any;
}

export default class servicesApi {
  static async asyncRequest(data: RequestData) {
    const { url, params, method, body } = data;
    const request = baseApi.getClient();
    const options: AxiosRequestConfig = {
      url,
      method,
      params,
      data: body,
    };
    try {
      const response = await request(options);
      return { response };
    } catch (error) {
      return { error };
    }
  }
  static async getServiceList(requiredURL?: any, setResponse?: any) {
    const request = baseApi.getClient();

    const options: AxiosRequestConfig = {
      url: `/clients/References/Services/Find`,
      method: 'POST',
      data: {},
    };

    try {
      const response: any = await request(options);
      return response?.data?.result?.items;
    } catch (error) {
      return { error };
    }
  }
}
