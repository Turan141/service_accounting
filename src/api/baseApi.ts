import axios from 'axios';
import KC from '..';

export default class baseApi {
  static getClient() {
    return axios.create({
      baseURL: process.env.API_URL,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${KC.getToken()}`,
      },
    });
  }
}
