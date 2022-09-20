import ArtefactsApi from '@src/api/artefactsApi';
import React, { useCallback, useEffect, useState } from 'react';
import styles from './DictionaryUpload.module.scss';
import spinner from '../../../../assets/icons/flightSpinner.svg';
import { ItemListFromDB } from './ItemListFromDB';
import { UploadedFilesList } from './UploadedFilesList';
export const UploadToMinio = () => {
  const [uploadedFilesArr, setUploadedFiles] = useState<any[]>(
    [],
  ) as any;
  const [modifiedFilesFromCloud, setModifiedFilesFromCloud] =
    useState<any[]>([]);
  const [temp, setTemp] = useState<any[] | null>([]);
  const [disableBtn, setdisableBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileEvent = (e: any) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    setModifiedFilesFromCloud([]);
    setUploadedFiles(chosenFiles);
  };

  const submitAndUpload = async () => {
    setIsLoading(true);
    for await (let value of uploadedFilesArr) {
      await ArtefactsApi.uploadReferenceFile(value);
    }
    setUploadedFiles([]);
    setIsLoading(false);
  };
  const modify = async (array: any) => {
    const mergedArrayWithExistence: any = [...array];
    setdisableBtn(true);
    for await (const [
      index,
      value,
    ] of mergedArrayWithExistence.entries()) {
      await ArtefactsApi.checkForExistence(value).then((resp) => {
        resp?.response?.data?.successful === 0
          ? (mergedArrayWithExistence[index].useInImport = 1)
          : (mergedArrayWithExistence[index].useInImport = 0);
      });
    }
    setdisableBtn(false);
    return setModifiedFilesFromCloud(mergedArrayWithExistence);
  };

  const checkForExist = useCallback(async () => {
    await ArtefactsApi.reloadArtifacts()
      .then(async (resp) => {
        return setTemp(resp.response.data);
      })
      .then(() => setIsLoading(true))
      .then(async () => {
        await modify(temp);
      })
      .then(() => setIsLoading(false));
  }, [temp]);

  useEffect(() => {
    checkForExist();
  }, []);

  return (
    <>
      <div className={styles.DictionaryUpload}>
        <h2>Выберите файлы для загрузки и нажмите "Загрузить все"</h2>
        <label className={styles.customUploadButton}>
          Выбрать файлы
          <input
            type='file'
            title=' '
            multiple
            onChange={handleFileEvent}
          />
        </label>
        <button
          className={
            uploadedFilesArr.length
              ? styles.uploadFiles
              : styles.uploadFilesDisabled
          }
          onClick={submitAndUpload}
          disabled={!uploadedFilesArr.length}
        >
          Загрузить все документы
        </button>
        <button
          className={
            disableBtn || uploadedFilesArr.length
              ? styles.uploadFilesDisabled
              : styles.uploadFiles
          }
          onClick={checkForExist}
          disabled={disableBtn || uploadedFilesArr.length}
        >
          Сверить файлы
        </button>
      </div>
      {uploadedFilesArr.length ? (
        <div className={styles.cols}>
          <p>Название</p>
          <p>Размер</p>
          <p>Тип</p>
          <p>Последнее изменение</p>
        </div>
      ) : null}

      {modifiedFilesFromCloud?.length ? (
        <div className={styles.colsExistense}>
          <p>Название</p>
          <p>Удалить из БД</p>
        </div>
      ) : null}

      <div className={styles.UploadedFiles}>
        <ul>
          <div className={styles.fileList}>
            {isLoading ? (
              <>
                <img
                  src={spinner}
                  className={styles.flightSpinner}
                  alt='flightPlane'
                />
                <h1 className={styles.loadingText}>
                  Пожалуйста подождите, это может занять несколько
                  минут.
                </h1>
              </>
            ) : uploadedFilesArr?.length ? (
              <UploadedFilesList
                uploadedFilesArr={uploadedFilesArr}
              />
            ) : !isLoading && modifiedFilesFromCloud?.length ? (
              <ItemListFromDB
                modifiedFilesFromCloud={modifiedFilesFromCloud}
              />
            ) : (
              <div className={styles.NoFiles}>
                <h1>
                  Нет файлов. Пожалуйста выберите нужные файлы для
                  отображения списка
                </h1>
              </div>
            )}
          </div>
        </ul>
      </div>
    </>
  );
};
