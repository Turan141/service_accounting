// Создание таблицы в бд Distributor и инфраструктуры работы с ней

//  GET clients/Distributor/GetDistributorsToShowInGrid - возвращает список, для показа в таблице

// GET clients/Distributor/GetByDistributorMasterCode/{distributorMasterCode} - получение объекта по ключу

// GET clients/Distributor/GetByName/{name} - Получение  объекта по имени

// GET clients/Distributor/GetByVersion/{version} - Получение  объекта по версии

// POST clients/Distributor/SetShowInGrid/{showInGrid}/{distributorMasterCode} Установить \ сбросить флаг показа в таблице 1\0

// DELETE clients/Distributor/DeleteByDistributorMasterCode/{distributorMasterCode} Удалить объект по ключу

// GET clients/Distributor/GetFileFromMinio/{fileName} - Получить файл по имени

// GET clients/Distributor/ExistsFileInMinio/{fileName}- Проверить есть ли файл с таким именем

// POST clients/Distributor/SaveFilesToMinio - Записать файл и объект в бд

// POST  clients/ApplicationOption/SaveMobileVersion/{mobileversion}  Установка рекомендованной версии

// GET clients/ApplicationOption/MobileVersion  Получение рекомендованной версии

// Рассылка SignalR - UpdatedMobileVersionEvent

import baseApi from '@api/baseApi';
import axios, { AxiosRequestConfig } from 'axios';

export default class mobileAppApi {
  static async uploadAppFileToMinio(file: File) {
    const request = baseApi.getClient();
    const formData = new FormData();
    formData.append('attachments', file, file?.name);
    const options: AxiosRequestConfig = {
      url: `/clients/Distributor/SaveFilesToMinio`,
      method: 'POST',
      timeout: 1000000000000000,
      maxContentLength: 100000000000,
      maxBodyLength: 1000000000000,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    };
    // axios.post('/clients/Distributor/SaveFilesToMinio', formData);

    try {
      const response: any = await request(options);
      console.log(response);
      return { response };
    } catch (error) {
      return { error };
    }
  }

  static async getFileById() {
    const request = baseApi.getClient();
    const mime = require('mime-types');

    const options: AxiosRequestConfig = {
      url: `/clients/Distributor/GetFileFromMinio/totu.apk`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/vnd.android.package-archive',
      },
      responseType: 'blob',
    };

    try {
      const response: any = await request(options);
      console.log(response);
      const blob = new Blob([response.data], {
        type: 'application/vnd.android.package-archive',
      });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      console.log(url);
      link.href = url;
      const fileExtension = mime.extension(
        'application/vnd.android.package-archive',
      );
      console.log(fileExtension);
      link.download = 'document.' + fileExtension;
      link.click();
    } catch (error) {
      console.log(error);
      return { error };
    }
  }

  static async makeRecommendedVersion(mobileversion?: any) {
    const request = baseApi.getClient();

    const options: AxiosRequestConfig = {
      url: `/clients/ApplicationOption/SaveMobileVersion/${mobileversion}`,
      method: 'POST',
      data: {},
    };

    try {
      const response: any = await request(options);
      return { response };
    } catch (error) {
      return { error };
    }
  }

  static async getApkByMasterCode(mastercode: any) {
    const request = baseApi.getClient();
    const mime = require('mime-types');

    const options: AxiosRequestConfig = {
      url: `/clients/Distributor/GetByDistributorMasterCode/${mastercode} `,
      method: 'GET',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'arraybuffer',
    };

    try {
      const response: any = await request(options);
      return { response };
    } catch (error) {
      console.log(error);
      return { error };
    }
  }

  static async uploadAppFileToDb(dataForDb?: any) {
    const request = baseApi.getClient();

    const options: AxiosRequestConfig = {
      url: `/clients/Distributor/SaveToDb`,
      method: 'POST',
      data: { ...dataForDb },
    };

    try {
      const response: any = await request(options);
      return { response };
    } catch (error) {
      return { error };
    }
  }

  static async deleteApk(distributorMasterCode: any) {
    const request = baseApi.getClient();

    const options: AxiosRequestConfig = {
      url: `/clients/Distributor/DeleteByDistributorMasterCode/${distributorMasterCode}`,
      method: 'DELETE',
    };

    try {
      const response: any = await request(options);
      return { response };
    } catch (error) {
      return { error };
    }
  }
  static async getRecommendVersion() {
    const request = baseApi.getClient();

    const options: AxiosRequestConfig = {
      url: `/clients/ApplicationOption/MobileVersion`,
      method: 'GET',
    };

    try {
      const response: any = await request(options);
      return { response };
    } catch (error) {
      return { error };
    }
  }

  static async getAppList() {
    const request = baseApi.getClient();

    const options: AxiosRequestConfig = {
      url: `/clients/Distributor/GetDistributorsToShowInGrid`,
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
