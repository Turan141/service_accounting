import React, { useState } from 'react';
import ArtefactsApi from '@src/api/artefactsApi';
import { useModal } from 'react-lib';
import { ArtifactsModal } from './ArtifactsModal';

export const ArtefactItem = ({
  referenceMasterCode,
  tag,
  artefactMasterCode,
  url,
  getUrl,
  clearUrl,
}: any) => {
  const [response, setResponse] = useState(null) as any;
  const [isLoading, setIsLoading] = useState(false);
  const { openModal } = useModal();

  const importHandler = async () => {
    setIsLoading(true);
    await ArtefactsApi.importArtefact(
      artefactMasterCode,
      url,
      setResponse,
    );
    setIsLoading(false);
  };
  const importHandlerWithoutCode = async () => {
    setIsLoading(true);
    await ArtefactsApi.importArtefactWithoutCode(url, setResponse);
    console.log(url)
    setIsLoading(false);
  };

  const getUrlHandler = async () => {
    setIsLoading(true);
    await ArtefactsApi.getUrl(getUrl).then((resp) => {
      openModal(ArtifactsModal, { resp });
    });
    setIsLoading(false);
  };

  const clearUrlHandler = async () => {
    setIsLoading(true);
    await ArtefactsApi.clearUrl(clearUrl);
    setIsLoading(false);
  };
  return (
    <>
      <li>
        <p>{artefactMasterCode}</p>
        <p>{url}</p>
        {/* <p>{referenceMasterCode}</p> */}
        {/* <p>{tag}</p> */}
        {artefactMasterCode !== 'Employees.json' &&
        artefactMasterCode !== 'References.json' &&
        artefactMasterCode !== 'Services.json' &&
        artefactMasterCode !== 'DocumentTypes.json' ? (
          <button onClick={importHandler}>
            {isLoading ? 'Загрузка...' : 'Импортировать'}
          </button>
        ) : (
          <button onClick={importHandlerWithoutCode}>
            {isLoading ? 'Загрузка...' : 'Импортировать'}
          </button>
        )}
        {isLoading ? (
          <>
            <p>{getUrl}</p>
            <button style={{ color: 'gray' }}>Загрузка...</button>
          </>
        ) : getUrl ? (
          <>
            <p>{getUrl}</p>
            <button onClick={getUrlHandler}>Показать</button>
          </>
        ) : (
          <>
            <p></p>
            <button
              style={{ width: '5rem', border: 'none' }}
            ></button>
          </>
        )}
        {isLoading ? (
          <>
            <p>{clearUrl}</p>
            <button style={{ color: 'gray' }}>Загрузка...</button>
          </>
        ) : clearUrl ? (
          <>
            <p>{clearUrl}</p>
            <button onClick={clearUrlHandler}>Очистить</button>
          </>
        ) : (
          <>
            <p></p>
            <button
              style={{ width: '5rem', border: 'none' }}
            ></button>
          </>
        )}
      </li>
      {response?.data?.result?.itemsSuccess ? (
        <h1
          style={{
            color: 'white',
            fontSize: '1.2rem',
            backgroundColor: 'green',
            width: '150px',
          }}
        >
          Удачных: {response?.data?.result?.itemsSuccess}
        </h1>
      ) : response?.data?.result?.itemsError ? (
        <h1
          style={{
            color: 'white',
            fontSize: '1.2rem',
            backgroundColor: 'red',
            width: '150px',
          }}
        >
          Ошибок: {response?.data?.result?.itemsError}
        </h1>
      ) : null}
      {/* <button onClick={deleteFile}>X</button> */}
    </>
  );
};
