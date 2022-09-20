import mobileAppApi from '@src/api/mobileAppApi';
import React, { useState } from 'react';
import styles from './MobileAppUpdate.module.scss';
import android from '../../../../assets/icons/android.svg';
import dayjs from 'dayjs';

export const ApkUpload = () => {
  const [appToUpload, setAppToUpload] = useState(null) as any;
  const [isLoading, setIsLoading] = useState(false);

  const handleFileEvent = (e: any) => {
    console.log(e);
    setAppToUpload(e.target.files[0]);
  };

  const uploadApp = async () => {
    setIsLoading(true);
    await mobileAppApi.uploadAppFileToMinio(appToUpload).then(() =>
      mobileAppApi.uploadAppFileToDb({
        name: appToUpload?.name,
        description: appToUpload?.name,
        distributorMasterCode: appToUpload?.name,
        dateVersion: appToUpload?.lastModifiedDate,
        tag: appToUpload?.type,
        version: appToUpload?.name,
        showInList: 1,
      }),
    );
    setIsLoading(false);
  };
  const units = [
    'байт',
    'кб',
    'мб',
    'гб',
    'тб',
    'PB',
    'EB',
    'ZB',
    'YB',
  ];

  function niceBytes(x: any) {
    let l = 0,
      n = parseInt(x, 10) || 0;
    while (n >= 1024 && ++l) {
      n = n / 1024;
    }
    return n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l];
  }

  return (
    <div className={styles.appUpload}>
      <p>Отправить установочный файл на сервер</p>
      {!appToUpload ? (
        <>
          <label className={styles.upload}>
            Нажмите чтобы выбрать установочный файл
            <input type='file' title=' ' onChange={handleFileEvent} />
          </label>
        </>
      ) : (
        <>
          <div className={styles.insertedFile}>
            <p>Название - {appToUpload?.name}</p>
            <p>
              Последнее изменение -{' '}
              {dayjs(appToUpload?.lastModified).format(
                'DD-MM-YYYY HH:mm',
              )}
            </p>
            <p>Размер - {niceBytes(appToUpload?.size)}</p>
            <p>
              {appToUpload?.type ===
              'application/vnd.android.package-archive' ? (
                <div className={styles.imgAndDelete}>
                  <img width={50} src={android} alt='android' />{' '}
                  <button onClick={() => setAppToUpload(null)}>
                    X
                  </button>
                </div>
              ) : (
                <>
                  <p>
                    Неверный файл. Файл должен быть в формате .apk
                  </p>
                </>
              )}
            </p>
          </div>
        </>
      )}
      {isLoading ? (
        <>
        <span className={styles.loader}></span>
        <p style={{color:'gray', fontSize:'0.8rem'}}>Идет загрузка файла. Пожалуйста не закрывайте окно.</p>
        </>
      ) : (
        <>
          <button
            disabled={!appToUpload}
            onClick={uploadApp}
            className={styles.button30}
          >
            Отправить
          </button>
        </>
      )}
    </div>
  );
};
