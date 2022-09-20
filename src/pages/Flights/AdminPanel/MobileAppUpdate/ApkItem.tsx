import mobileAppApi from '@src/api/mobileAppApi';
import dayjs from 'dayjs';
import React from 'react';
import styles from './MobileAppUpdate.module.scss';

export const ApkItem = ({ elem, getAppList }: any) => {
  const makeRecommended = () => {
    mobileAppApi.makeRecommendedVersion(elem?.version);
  };
  const downloadApk = () => {
    mobileAppApi.getFileById();
  };
  const deleteApk = async () => {
    await mobileAppApi.deleteApk(elem?.distributorMasterCode);
    getAppList();
  };
  return (
    <li>
      <p>Название файла - {elem?.distributorMasterCode}</p>
      <p>
        Дата изменения файла -{' '}
        {dayjs(elem?.dateVersion).format('DD-MM-YYYY HH:mm')}
      </p>
      <p>
        Дата создания файла -{' '}
        {dayjs(elem?.created).format('DD-MM-YYYY HH:mm')}
      </p>
      <div className={styles.itemButtons}>
        <button onClick={downloadApk}>Скачать</button>
        <button onClick={deleteApk}>Удалить</button>
        <button onClick={makeRecommended}>В актуальную</button>
      </div>
    </li>
  );
};
