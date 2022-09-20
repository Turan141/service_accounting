import ArtefactsApi from '@src/api/artefactsApi';
import React, { useState } from 'react';
import styles from './DictionaryUpload.module.scss';

export const HealthItem = ({ elem }: any) => {
  const [health, setHealth] = useState(null) as any;
  const [isLoading, setIsLoading] = useState(false);

  const checkHealth = async (url: any) => {
    setIsLoading(true);
    await ArtefactsApi.checkItemHealth(url).then((resp) =>
      setHealth(resp.response),
    );
    setIsLoading(false);
  };

  return (
    <div className={styles.healthCheck}>
      <div className={styles.healthText}>
        <h1>{elem.tag}</h1>
      </div>
      {isLoading ? (
        <p>Загрузка</p>
      ) : health ? (
        <p style={{ fontSize: '1.2rem' }}>
          {health?.data}
        </p>
      ) : (
        <button onClick={() => checkHealth(elem)}>Проверить</button>
      )}
    </div>
  );
};
