import mobileAppApi from '@src/api/mobileAppApi';
import React, { useState } from 'react';
import { Icon } from 'react-lib';
import styles from './MobileAppUpdate.module.scss';

export const ApkSearch = () => {
  const [recommended, setRecommended] = useState(null) as any;
  const getRecommendVersion = async () => {
    await mobileAppApi
      .getRecommendVersion()
      .then((resp) =>
        setRecommended(resp?.response?.data?.applicationOptionValue),
      );
  };
  console.log(recommended);
  return (
    <div className={styles.appSearch}>
      <p>Поиск установочного файла на сервере</p>
      <div className={styles.searchFields}>
        <input
          disabled
          type='text'
          placeholder='Получение объекта по ключу'
        ></input>
        <button>
          <Icon name='search' />
        </button>
      </div>
      <div className={styles.searchFields}>
        <input
          disabled
          type='text'
          placeholder='Проверить наличие файла по имени'
        ></input>
        <button>
          <Icon name='search' />
        </button>
      </div>
      <div className={styles.searchFields}>
        {!recommended ? (
          <button
            className={styles.showActual}
            onClick={getRecommendVersion}
          >
            Показать актуальную версию
          </button>
        ) : (
          <div className={styles.actual}>
            <p>{recommended}</p>
            <button onClick={getRecommendVersion}>
              Показать актуальную версию
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
