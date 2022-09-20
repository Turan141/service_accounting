import baseApi from '@api/baseApi';
import { AxiosRequestConfig } from 'axios';

export default class telegramApi {
  static async sendTelegram(telegramInfo?: any) {
    const request = baseApi.getClient();

    const options: AxiosRequestConfig = {
      url: `/clients/Lir/SendLir`,
      method: 'POST',
      data: {...telegramInfo},
    };

    try {
      const response: any = await request(options);
      return { response };
    } catch (error) {
      return { error };
    }
  }

  static async getTelegramLir(flightCode?: any) {
    const request = baseApi.getClient();

    const options: AxiosRequestConfig = {
      url: `/clients/Lir/GetLirsByFlightCode/${flightCode}`,
      method: 'GET',
    };

    try {
      const response: any = await request(options);
      return { response };
    } catch (error) {
      return { error };
    }
  }
  static async getTelegramMvt(flightCode?: any) {
    const request = baseApi.getClient();

    const options: AxiosRequestConfig = {
      url: `/clients/Lir/GetMvtByFlightCode/${flightCode}`,
      method: 'GET',
    };

    try {
      const response: any = await request(options);
      return { response };
    } catch (error) {
      return { error };
    }
  }
  static async getTelegramLdm(flightCode?: any) {
    const request = baseApi.getClient();

    const options: AxiosRequestConfig = {
      url: `/clients/Lir/GetLdmByFlightCode/${flightCode}`,
      method: 'GET',
    };

    try {
      const response: any = await request(options);
      return { response };
    } catch (error) {
      return { error };
    }
  }
}
