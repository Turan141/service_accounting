import baseApi from '@api/baseApi';
import { AxiosRequestConfig } from 'axios';

export default class ArtefactsApi {
  static async checkForExistence(elemForCheck: any) {
    const request = baseApi.getClient();

    const options: AxiosRequestConfig = {
      url: `/clients/Files/ArtifactFileExistsInMinio/${elemForCheck?.artefactMasterCode}`,
      method: 'GET',
    };

    try {
      const response: any = await request(options);
      return { response };
    } catch (error) {
      return { error };
    }
  }

  static async checkItemHealth(elemForCheck: any) {
    const request = baseApi.getClient();

    const options: AxiosRequestConfig = {
      url: `${elemForCheck?.url}`,
      method: 'GET',
    };

    try {
      const response: any = await request(options);
      return { response };
    } catch (error) {
      return { error };
    }
  }

  static async reloadArtifacts(setArtefacts?: any) {
    const request = baseApi.getClient();

    const options: AxiosRequestConfig = {
      url: `/clients/Artifact/GetArtifactsToShowInGrid`,
      method: 'GET',
    };

    try {
      const response: any = await request(options);
      setArtefacts && setArtefacts(response.data);
      return { response };
    } catch (error) {
      return { error };
    }
  }

  static async importArtefact(
    artefactMasterCode?: any,
    requiredURL?: any,
    setResponse?: any,
  ) {
    const request = baseApi.getClient();

    const options: AxiosRequestConfig = {
      url: `${requiredURL}/${artefactMasterCode}`,
      method: 'POST',
      data: {},
    };

    try {
      const response: any = await request(options);
      response && setResponse(response);
      return { response };
    } catch (error) {
      return { error };
    }
  }

  static async importArtefactWithoutCode(
    requiredURL?: any,
    setResponse?: any,
  ) {
    const request = baseApi.getClient();

    const options: AxiosRequestConfig = {
      url: `${requiredURL}`,
      method: 'POST',
      data: {},
    };

    try {
      const response: any = await request(options);
      response && setResponse(response);
      return { response };
    } catch (error) {
      return { error };
    }
  }

  static async deleteArtifact(artifact?: any) {
    const request = baseApi.getClient();

    const options: AxiosRequestConfig = {
      url: `/clients/Files/RemoveArtifactFilesFromMinio/${artifact}`,
      method: 'DELETE',
    };

    try {
      const response: any = await request(options);
      return { response };
    } catch (error) {
      return { error };
    }
  }

  static async importFilesFromMinioN1() {
    const request = baseApi.getClient();

    const options: AxiosRequestConfig = {
      url: `/clients/Artifact/InsertOrUpdateServisesReferenceDocumentType`,
      method: 'GET',
    };

    try {
      const response: any = await request(options);
      return { response };
    } catch (error) {
      return { error };
    }
  }
  static async importFilesFromMinioN2() {
    const request = baseApi.getClient();

    const options: AxiosRequestConfig = {
      url: `/clients/Files/ImportArtifactFromMinio`,
      method: 'GET',
    };

    try {
      const response: any = await request(options);
      return { response };
    } catch (error) {
      return { error };
    }
  }

  static async getHealthCheck() {
    const request = baseApi.getClient();

    const options: AxiosRequestConfig = {
      url: `/clients/Artifact/GetHealthToShowInGrid`,
      method: 'GET',
    };

    try {
      const response: any = await request(options);
      return { response };
    } catch (error) {
      return { error };
    }
  }

  static async getHealth() {
    const request = baseApi.getClient();

    const options: AxiosRequestConfig = {
      url: `/clients/Health`,
      method: 'GET',
    };

    try {
      const response: any = await request(options);
      return { response };
    } catch (error) {
      return { error };
    }
  }

  static async getServerTime() {
    const request = baseApi.getClient();

    const options: AxiosRequestConfig = {
      url: `/clients/Health/GetDateTimeFromServer`,
      method: 'GET',
    };

    try {
      const response: any = await request(options);
      return { response };
    } catch (error) {
      return { error };
    }
  }

  static async getUrl(url: any) {
    const request = baseApi.getClient();

    const options: AxiosRequestConfig = {
      url: `${url}`,
      method: 'GET',
    };

    try {
      const response: any = await request(options);
      console.log(response);
      return { response };
    } catch (error) {
      return { error };
    }
  }

  static async clearUrl(url: any) {
    const request = baseApi.getClient();

    const options: AxiosRequestConfig = {
      url: `${url}`,
      method: 'DELETE',
    };

    try {
      const response: any = await request(options);
      return { response };
    } catch (error) {
      return { error };
    }
  }

  static async uploadReferenceFile(file: any) {
    const request = baseApi.getClient();
    const formData = new FormData();
    formData.append('attachments', file, file.name);
    const options: AxiosRequestConfig = {
      url: `/clients/Files/SaveArtifactFilesToMinio`,
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

  static async exportTimeSetting(timezone?: any) {
    const request = baseApi.getClient();

    const options: AxiosRequestConfig = {
      url: `/clients/ApplicationOption/SaveTimeZone/${timezone}`,
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

  static async getTimeSetting(setCurrentTimeZone?: any) {
    const request = baseApi.getClient();

    const options: AxiosRequestConfig = {
      url: `/clients/ApplicationOption/GetTimeZone`,
      method: 'GET',
    };

    try {
      const response: any = await request(options);
      setCurrentTimeZone({ response });
      return { response };
    } catch (error) {
      return { error };
    }
  }
}
