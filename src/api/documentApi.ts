import baseApi from '@api/baseApi';
import { AxiosRequestConfig } from 'axios';
import { TaskStatusesEnum } from '@pages/Flights/components/StatusColumn/StatusColumn';
import { TableFilterProps } from '@api/dictionaryApi';
import { DocumentItemDto, PropertyView } from '@typings/swagger/api';

export type DocumentType = 'Requests';

export default class DocumentApi {
  static async createTender(data: any) {
    const request = baseApi.getClient();

    const options: AxiosRequestConfig = {
      url: `/clients/documents/Requests`,
      method: 'POST',
      data,
    };

    try {
      const response: any = await request(options);
      return { response };
    } catch (error) {
      let errorMessage = { error }
      console.log(errorMessage)
      //@ts-ignore
      alert(errorMessage?.error?.response?.data?.Message)
      console.log(error)
      return { error };
    }
  }

  static async getLockedDocs() {
    const request = baseApi.getClient();

    const options: AxiosRequestConfig = {
      url: `/clients/Documents/getlockeddocuments`,
      method: 'GET',
    };

    try {
      const response: any = await request(options);

      return { response };
    } catch (error) {
      return { error };
    }
  }

  static async setLock(data: any) {
    const request = baseApi.getClient();
    const { id } = data;

    const options: AxiosRequestConfig = {
      url: `/clients/Documents/Requests/${id}/lock`,
      method: 'POST',
    };

    try {
      const response: any = await request(options);

      return { response };
    } catch (error) {
      return { error };
    }
  }

  static async setUnlock(data: any) {
    const request = baseApi.getClient();
    const { id } = data;

    const options: AxiosRequestConfig = {
      url: `/clients/Documents/Requests/${id}/unlock`,
      method: 'POST',
    };

    try {
      const response: any = await request(options);

      return { response };
    } catch (error) {
      return { error };
    }
  }

  static async confirmAndUnlock(id: any) {
    const request = baseApi.getClient();

    const options: AxiosRequestConfig = {
      url: `/clients/Documents/${id}/resetlock`,
      method: 'POST',
    };

    try {
      const response: any = await request(options);

      return { response };
    } catch (error) {
      return { error };
    }
  }

  static async updateTender(data: any) {
    const request = baseApi.getClient();
    const { document, documentId } = data;

    const options: AxiosRequestConfig = {
      url: `/clients/Documents/Requests/${documentId}/Properties`,
      method: 'PUT',
      data: document,
    };

    try {
      const response: any = await request(options);

      return { response };
    } catch (error) {
      return { error };
    }
  }

  static async getTendersTable(tableFilter: TableFilterProps) {
    const request = baseApi.getClient();
    let searchWord = tableFilter?.filter?.valuesFilter?.serviceName;
    const { take, skip, filter } = tableFilter;
    console.log(filter)
    const options: AxiosRequestConfig = {
      url: `/clients/Documents/Requests/Find`,
      method: 'POST',
      data: {
        skip,
        take,
        filter: {
          ...filter,
          number: !isNaN(searchWord)
            ? searchWord.toString()
            : undefined,
          valuesFilter: {
            ...filter.valuesFilter,
            serviceName: isNaN(searchWord) ? searchWord : undefined,
          },
        },
      },
    };
    try {
      const response: any = await request(options);
      return {
        result: response.data.result.items,
        total: response.data.result.total,
      };
    } catch (error) {
      return { error };
    }
  }

  static async getTenderById(id: number) {
    const request = baseApi.getClient();

    const options: AxiosRequestConfig = {
      url: `/clients/Documents/Requests/GetById/${id}`,
      method: 'GET',
    };

    try {
      const response: any = await request(options);
      return response.data.result;
    } catch (error) {
      return { error };
    }
  }

  static async removeTenderItemsByIds(data: any) {
    const request = baseApi.getClient();
    const { documentId, itemIds } = data;

    const options: AxiosRequestConfig = {
      url: `/clients/Documents/Requests/${documentId}/Items`,
      method: 'DELETE',
      data: itemIds,
    };

    try {
      const response: any = await request(options);

      return { response };
    } catch (error) {
      return { error };
    }
  }

  static async removeTenderById(documentId: any) {
    const request = baseApi.getClient();

    const options: AxiosRequestConfig = {
      url: `/clients/Documents/References`,
      method: 'DELETE',
      data: [documentId],
    };

    try {
      const response: any = await request(options);

      return { response };
    } catch (error) {
      return { error };
    }
  }

  static async decrementTenderId(documentId: any) {
    const request = baseApi.getClient();

    const options: AxiosRequestConfig = {
      url: `/clients/Documents/DecrementNumber`,
      method: 'GET',
    };

    try {
      const response: any = await request(options);

      return { response };
    } catch (error) {
      return { error };
    }
  }

  static async addTenderItems(
    documentId: number,
    items: DocumentItemDto[],
  ) {
    const request = baseApi.getClient();

    const options: AxiosRequestConfig = {
      url: `/clients/Documents/Requests/${documentId}`,
      method: 'POST',
      data: items,
    };

    try {
      const response: any = await request(options);

      return { response };
    } catch (error) {
      return { error };
    }
  }

  static async addTenderGarageNumber(
    documentId: number,
    items: DocumentItemDto[],
  ) {
    const request = baseApi.getClient();

    const options: AxiosRequestConfig = {
      url: `/clients/Documents/Requests/${documentId}`,
      method: 'POST',
      data: items,
    };

    try {
      const response: any = await request(options);

      return { response };
    } catch (error) {
      return { error };
    }
  }

  static async changeDocumentStatus(
    documentType: DocumentType,
    documentId: number,
    status: TaskStatusesEnum,
    properties: Record<string, string | number> = {},
  ) {
    const request = baseApi.getClient();

    const options: AxiosRequestConfig = {
      url: `/clients/Documents/${documentType}/${documentId}/status/${status}/properties`,
      method: 'PUT',
      data: properties,
    };

    try {
      const response: any = await request(options);
      return { response };
    } catch (error) {
      return console.log('Произошла ошибка!', error);
    }
  }
}
