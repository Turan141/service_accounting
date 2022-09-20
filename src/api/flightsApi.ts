import baseApi from './baseApi';
import { AxiosRequestConfig, Method } from 'axios';
import { TableFilterProps } from '@api/dictionaryApi';

export interface RequestData {
  url: string;
  method: Method;
  params: any;
  body?: any;
}

export default class flightsApi {
  static async asyncRequest(data: RequestData) {
    const { url, params, method, body } = data;
    const request = baseApi.getClient();
    const options: AxiosRequestConfig = {
      url,
      method,
      params,
      data: {},
    };
    try {
      const response = await request(options);
      console.log(response);
      return { response };
    } catch (error) {
      return { error };
    }
  }

  static async getFlights(data: TableFilterProps) {
    const request = baseApi.getClient();
    const options: AxiosRequestConfig = {
      url: '/clients/Flight/Filter',
      method: 'POST',
      data,
    };
    try {
      const response = await request(options);
      return {
        result: response.data.result.items,
        total: response.data.result.total,
      };
    } catch (error) {
      return { error };
    }
  }
}
