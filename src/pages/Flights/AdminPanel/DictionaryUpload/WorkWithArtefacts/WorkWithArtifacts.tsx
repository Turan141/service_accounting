import React, { useState } from 'react';
import ArtefactsApi from '@src/api/artefactsApi';
import styles from '../DictionaryUpload.module.scss';
import { ArtefactFromDBList } from './ArtefactFromDBList';

export const WorkWithArtifacts = () => {
  const [artefacts, setArtefacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const importArtifactsFromMinio = async () => {
    setIsLoading(true);
    await ArtefactsApi.importFilesFromMinioN1();
    await ArtefactsApi.importFilesFromMinioN2();
    setIsLoading(false);
  };

  const reloadArtifacts = async () => {
    setIsLoading(true);
    await ArtefactsApi.reloadArtifacts(setArtefacts);
    setIsLoading(false);
  };

  // isLoading && return (<div>Идет загрузка...</div>)

  return (
    <>
      <div className={styles.DictionaryUpload}>
        <button
          className={styles.importFiles}
          onClick={importArtifactsFromMinio}
        >
          Импортировать артефакты из файла (Minio) в Базу Данных
        </button>
        <button
          className={styles.importFiles}
          onClick={reloadArtifacts}
        >
          Обновить артефакты из Базы Данных
        </button>
      </div>
      <div className={styles.colsArtefacts}>
        <p>ArtefactsMasterCode</p>
        <p>Import Url</p>
        <p>Импортировать Артефакт</p>
        <p>Export Url</p>
        <p>Показать содержимое</p>
        <p>Clear Url</p>
        <p>Очистить содержимое</p>
      </div>
      <div className={styles.UploadedFiles}>
        <ul>
          <div className={styles.fileList}>
            {isLoading ? (
              <p style={{padding:'1rem', fontSize:'1.3rem'}}>Идет загрузка...</p>
            ) : artefacts.length ? (
              <ArtefactFromDBList artefacts={artefacts} />
            ) : (
              <div className={styles.NoFiles}>
                <h1>
                  Пустой список файлов. Выполните одну из команд для
                  получения списка.
                </h1>
              </div>
            )}
          </div>
        </ul>
      </div>
    </>
  );
};
