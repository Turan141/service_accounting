import ArtefactsApi from '@src/api/artefactsApi';
import React, { useState } from 'react';
import styles from './DictionaryUpload.module.scss';

export const ItemFromDB = ({
  artefactMasterCode,
  useInImport,
}: any) => {
  const [isDeleted, setisDeleted] = useState(false);

  const deleteArtifact = async (code: any) => {
    await ArtefactsApi.deleteArtifact(code).then(() =>
      setisDeleted(true),
    );
  };
  return (
    <div className={isDeleted ? styles.deleted : ''}>
      <li>
        <p className={useInImport === 0 ? styles.notExist : ''}>
          {artefactMasterCode}
        </p>
        {useInImport === 1 ? (
          <button
            disabled={isDeleted}
            className={
              isDeleted ? styles.disabledBtn : styles.removeArtifact
            }
            onClick={(e: any) => {
              deleteArtifact(artefactMasterCode);
            }}
          >
            Удалить
          </button>
        ) : (
          <button
            disabled={true}
            className={styles.insivibleBtn}
          >
            Удалить
          </button>
        )}
      </li>
    </div>
  );
};
