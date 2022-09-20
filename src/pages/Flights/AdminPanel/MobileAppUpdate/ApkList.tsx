import mobileAppApi from '@src/api/mobileAppApi';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { ApkItem } from './ApkItem';
import styles from './MobileAppUpdate.module.scss';

export const ApkList = () => {
  const [filesFromDb, setFilesFromDb] = useState([]) as any;
  const [isLoading, setIsLoading] = useState(false);
  const getAppList = async () => {
    setIsLoading(true)
    await mobileAppApi
      .getAppList()
      .then((resp) =>
        setFilesFromDb(resp?.response?.data?.result?.items),
      );
      setIsLoading(false)
  };
  console.log(filesFromDb);
  return (
    <>
      {filesFromDb.length ? (
        <div className={styles.apklistDiv}>
          <button disabled={isLoading} onClick={getAppList} className={styles.button4__top}>
              Обновить список файлов
            </button>
          <ul className={styles.apklist}>
            {filesFromDb.map((elem: any) => (
              <ApkItem getAppList={getAppList} elem={elem}/>
            ))}
          </ul>
        </div>
      ) : (
        <div className={styles.viewAllAppList}>
          <p>
            Посмотреть все установочные файлы загруженные на сервер
          </p>
          {isLoading ? (
            <span className={styles.loader}></span>
          ) : (
            <button onClick={getAppList} className={styles.button4}>
              Получить список файлов
            </button>
          )}
        </div>
      )}
    </>
  );
};