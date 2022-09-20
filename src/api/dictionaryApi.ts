import baseApi from '@api/baseApi';
import { AxiosRequestConfig } from 'axios';
import {
  DocumentItemView,
  DocumentView,
  ReferenceView,
} from '@typings/swagger/api';
import { Console } from 'console';

export interface DictionaryFilterProps {
  skip?: number;
  take?: number;
  flightDate: any;
}

const countInPage = 40;

export const toSkipTake = (page: number) => {
  return {
    Skip: countInPage * (page - 1),
    Take: countInPage,
  };
};

export interface TableFilterProps {
  skip?: number;
  take?: number;
  filter?: any;
  flightDate?: any;
}

export interface DictionaryFilter {
  company?: string;
  service?: string;
  aircraft?: ReferenceView;
  customer?: ReferenceView;
  performer?: string;
  parking?: string;
  aircraftType?: string;
  airline?: string;
  type?: string;
  isService?: string;
  status?: string;
  parkingTo?: string;
  parkingFrom?: string;
  name?: string;
  serial?: string;
}

export default class DictionaryApi {
  static async getDictionaryItems(
    referenceMasterCode: string,
    deps: DictionaryFilter,
    Search: string,
    Page: number,
  ) {
    const request = baseApi.getClient();
    const { Skip, Take } = toSkipTake(Page);
    let options: AxiosRequestConfig = {};

    let itemMasterCode;

    if (referenceMasterCode === 'Companies') {
      itemMasterCode = deps?.airline;
    }
    if (referenceMasterCode === 'AircraftsType') {
      itemMasterCode = deps?.type;
    }

    if (
      Search &&
      (referenceMasterCode === 'Companies' ||
        referenceMasterCode === 'Customers')
    ) {
      options = {
        url: `/clients/References/${referenceMasterCode}/Find`,
        method: 'POST',
        data: {
          Skip,
          Take,
          valuesFilter: {
            company: deps?.company,
            service: deps?.service,
            aircraft: deps?.aircraft,
            performer: deps?.performer,
            customer: deps?.customer,
            airline: deps?.airline,
            name: deps?.name,
          },
          propertiesSearch: {
            properties:
              referenceMasterCode === 'Customers'
                ? ['nameRu', 'utg', 'nameEn']
                : referenceMasterCode === 'Companies'
                ? ['nameRu', 'utg', 'nameEn']
                : ['nameRu', 'utg', 'iata', 'nameEn'],
            Value: Search || '',
          },
        },
      };
    } else if (referenceMasterCode === 'AircraftParkings') {
      options = {
        url: `/clients/References/${referenceMasterCode}/Find`,
        method: 'POST',
        data: {
          Skip: 0,
          Take: 5,
          valuesFilter: {
            airport: 'EE47EA3C-84F9-4B87-8686-AA7B2662F454',
            ...(deps.parking === '0' && { category: 0 }),
            ...(deps.parking === '1' && { category: 1 }),
            ...(deps.parking === '2' && { category: 2 }),
            ...(deps.parking === '3' && { category: 3 }),
          },
          propertiesSearch:
            Search.length > 0
              ? {
                  fullMatch: false,
                  properties: ['parkingName', 'parkingNumber'],
                  value: Search,
                }
              : undefined,
        },
      };
    } else if (referenceMasterCode === '72') {
      options = {
        url: `/clients/References/LaddersProvision/Find`,
        method: 'POST',
        data: {
          Skip:0,
          Take,
          valuesFilter: {
            ...(deps.serial === '0' && { laddersCategory: 0 }),
            ...(deps.serial === '1' && { laddersCategory: 1 }),
            ...(deps.serial === '2' && { laddersCategory: 2 }),
            ...(deps.serial === '3' && { laddersCategory: 3 }),
            ...(deps.serial === '4' && { laddersCategory: 4 }),
            ...(deps.serial === '5' && { laddersCategory: 5 }),
            ...(deps.serial === '6' && { laddersCategory: 6 }),
            ...(deps.serial === '7' && { laddersCategory: 7 }),
            ...(deps.serial === '8' && { laddersCategory: 8 }),
            ...(deps.serial === '9' && { laddersCategory: 9 }),
            ...(deps.serial === '10' && { laddersCategory: 10 }),
          },
        },
      };
    } else {
      options = {
        url: `/clients/References/${referenceMasterCode}/Find`,
        method: 'POST',
        data: {
          Skip,
          Take,
          filter: {
            name: Search,
            itemMasterCode: deps?.name || deps?.type,
          },
          valuesFilter: {
            isService: deps?.isService,
            company: deps?.company,
            service: deps?.service,
            aircraft: deps?.aircraft,
            performer: deps?.performer,
            airline: deps?.airline,
            name: deps?.name,
            type: deps?.type,
          },
        },
      };
    }

    try {
      const response: any = await request(options);

      const exactMatchValue = response.data.result.items.filter(
        (elem: any) => elem.name === Search,
      );

      const restResponseValues = response.data.result.items.filter(
        (elem: any) => elem.name !== Search,
      );

      restResponseValues &&
        restResponseValues?.sort((a: any, b: any) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0,
        );

      const restSortedResult: any = [];

      restResponseValues &&
        restResponseValues.forEach((element: any) => {
          let splitted = element.name.split(' ');
          if (
            Search &&
            splitted &&
            splitted[0].toLowerCase() === Search.toLowerCase()
          ) {
            restSortedResult.unshift(element);
          } else if (
            Search &&
            splitted &&
            splitted[0].toLowerCase() !== Search.toLowerCase()
          ) {
            restSortedResult.push(element);
          } else restSortedResult.push(element);
        });

      const sortedResponse = [
        ...exactMatchValue,
        ...restSortedResult,
      ];

      return {
        result: sortedResponse,
        total: response.data.result.count,
      };
    } catch (error) {
      return { error };
    }
  }

  static async getTenderReports(referenceMasterCode: string) {
    const request = baseApi.getClient();
    let options: AxiosRequestConfig = {};
    options = {
      url: `/clients/References/${referenceMasterCode}/Find`,
      method: 'POST',
      data: {
        take: 10,
        skip: 0,
        filter: {},
      },
    };
    try {
      const response: any = await request(options);
      return { response };
    } catch (error) {
      return { error };
    }
  }

  static async getDictionaryItemByMasterCode(
    referenceMasterCode: string,
    itemMasterCode: ReferenceView | string,
  ) {
    const request = baseApi.getClient();
    let options: AxiosRequestConfig = {};

    if (typeof itemMasterCode === 'string') {
      options = {
        url: `/clients/References/${referenceMasterCode}/Find`,
        method: 'POST',
        data: {
          take: 1,
          skip: 0,
          filter: {
            itemMasterCode,
          },
        },
      };
    } else {
      options = {
        url: `/clients/References/${referenceMasterCode}/Find`,
        method: 'POST',
        data: {
          filter: {
            itemMasterCode: itemMasterCode.masterCode,
          },
        },
      };
    }

    try {
      const response: any = await request(options);
      return response.data.result.items[0];
    } catch (error) {
      return { error };
    }
  }

  static async getTenderStatusHistory(
    tableFilter: TableFilterProps,
    documentId: any,
  ) {
    const request = baseApi.getClient();

    const options: AxiosRequestConfig = {
      url: `/clients/Documents/Requests/${documentId}/Actions/StatusChanged`,
      method: 'GET',
      data: tableFilter,
    };

    try {
      const response: any = await request(options);

      return { data: response.data };
    } catch (error) {
      return { error };
    }
  }

  static async getTenderEditLog(
    tableFilter: TableFilterProps,
    documentId: any,
  ) {
    const request = baseApi.getClient();

    const options: AxiosRequestConfig = {
      url: `/clients/Documents/Requests/${documentId}/Actions`,
      method: 'GET',
      data: tableFilter,
    };

    try {
      const response: any = await request(options);

      return { data: response.data };
    } catch (error) {
      return { error };
    }
  }

  static async getDocumentFile(
    reportCode: any,
    format: any,
    nameRu: any,
    tableFilter?: any,
  ) {
    const request = baseApi.getClient();
    const requiredFilters: any = {};
    const statusesFilter: any = {};
    const numberFilter: any = {};
    const valuesRangeFilter: any = [];
    if (tableFilter) {
      if (tableFilter?.started) {
        valuesRangeFilter.push({
          name: 'started',
          from: new Date(tableFilter?.started).valueOf().toString(),
          to: Date.now().valueOf().toString(),
        });
      }

      if (tableFilter?.completed) {
        valuesRangeFilter.push({
          name: 'completed',
          from: '0',
          to: new Date(tableFilter?.completed).valueOf().toString(),
        });
      }

      if (tableFilter?.startPlan) {
        valuesRangeFilter.push({
          name: 'startPlan',
          from: new Date(tableFilter?.startPlan).valueOf().toString(),
          to: Date.now().valueOf().toString(),
        });
      }

      if (tableFilter?.endPlan) {
        valuesRangeFilter.push({
          name: 'endPlan',
          from: '0',
          to: new Date(tableFilter?.endPlan).valueOf().toString(),
        });
      }

      for (const [key, value] of Object.entries(tableFilter)) {
        //@ts-ignore
        if (typeof value === 'object' && value?.masterCode) {
          //@ts-ignore
          requiredFilters[key] = value?.masterCode;
        }
        if (typeof value === 'string' && key !== 'number') {
          requiredFilters[key] = value;
        }

        if (Array.isArray(value)) {
          statusesFilter[key] = [...value];
        }

        if (key === 'number') {
          numberFilter[key] = value;
        }
      }
    }

    const options: AxiosRequestConfig = {
      url: `/clients/Documents/Report/${reportCode}/${format}`,
      method: 'POST',
      responseType: 'blob',
      data: {
        skip: 0,
        filter: {
          ...statusesFilter,
          ...numberFilter,
          valuesFilter: {
            serviceName: '',
            ...requiredFilters,
          },
          valuesRangeFilter: [...valuesRangeFilter],
        },
      },
    };

    try {
      const response: any = await request(options);
      const blob = new Blob([response.data], { type: format });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = nameRu + '.' + format;
      link.click();
    } catch (error) {
      return { error };
    }
  }
}
