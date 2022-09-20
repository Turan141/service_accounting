import baseApi from '@api/baseApi';
import { AxiosRequestConfig } from 'axios';

export default class AttachmentApi {
  static async getTAttachment(documentId: any, documentItemId: any) {
    const request = baseApi.getClient();

    const options: AxiosRequestConfig = {
      url: `/clients/Documents/Requests/${documentId}/Items/${documentItemId}/Attachments`,
      method: 'GET',
    };

    try {
      const response: any = await request(options);
      return { data: response.data[0] };
    } catch (error) {
      return { error };
    }
  }

  

  static async addTenderAttachment(documentId: number, file: File) {
    const request = baseApi.getClient();
    const formData = new FormData();
    formData.append('attachments', file, file.name);
    const options: AxiosRequestConfig = {
      url: `/clients/Documents/Requests/${documentId}/Attachments`,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    };

    try {
      const response: any = await request(options);
      console.log(response);
      return { response };
    } catch (error) {
      return { error };
    }
  }

  static async getTenderAttachments(documentId: number) {
    const request = baseApi.getClient();

    const options: AxiosRequestConfig = {
      url: `/clients/Documents/Requests/${documentId}/Attachments`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        Skip: 0,
        Take: 10,
      },
    };

    try {
      const response: any = await request(options);
      return { ...response.data };
    } catch (error) {
      return { error };
    }
  }

  static async deleteTenderAttachmentsByIds(
    documentId: number,
    fileIds: string[],
  ) {
    const request = baseApi.getClient();

    const options: AxiosRequestConfig = {
      url: `/clients/Documents/Requests/${documentId}/Attachments`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      data: fileIds,
    };

    try {
      const response: any = await request(options);
      return { ...response.data };
    } catch (error) {
      return { error };
    }
  }

  static async getFileById(fileId: string, mimeType: string) {
    const request = baseApi.getClient();
    const mime = require('mime-types');

    const options: AxiosRequestConfig = {
      url: `/clients/Files/${fileId}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'arraybuffer',
    };

    try {
      const response: any = await request(options);
      console.log(response);
      const blob = new Blob([response.data], { type: mimeType });
      console.log('doing blob ', fileId, mimeType);
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      console.log(url);
      link.href = url;
      const fileExtension = mime.extension(mimeType);
      console.log(fileExtension);
      link.download = 'document.' + fileExtension;
      link.click();
    } catch (error) {
      console.log(error);
      return { error };
    }
  }

  static async viewPdfInNewTabById(fileId: string, mimeType: string) {
    const request = baseApi.getClient();
    const mime = require('mime-types');

    const options: AxiosRequestConfig = {
      url: `/clients/Files/${fileId}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'arraybuffer',
    };

    try {
      const response: any = await request(options);
      console.log(response);
      const blob = new Blob([response.data], { type: mimeType });
      console.log('doing blob ', fileId, mimeType);
      const url = URL.createObjectURL(blob);
      //Open the URL on new Window
      const pdfWindow = window.open();
      if (pdfWindow) pdfWindow.location.href = url;
    } catch (error) {
      console.log(error);
      return { error };
    }
  }
}
