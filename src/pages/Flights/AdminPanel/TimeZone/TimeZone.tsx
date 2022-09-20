import ArtefactsApi from '@src/api/artefactsApi';
import React, { useRef, useState } from 'react';
import { Modal, ModalComponentProps } from 'react-lib';
import styles from './TimeZone.module.scss';

export const TimeZone: React.FC<ModalComponentProps> = ({
  isOpen,
  handleClose,
}) => {
  const timeRef = useRef('UTC+3') as any;
  const [currentTimeZone, setCurrentTimeZone] = useState(null) as any;
  const [serverTime, setServerTime] = useState(null) as any;
  const timeHandler = async () => {
    await ArtefactsApi.exportTimeSetting(
      timeRef?.current?.value,
    ).then(() => handleClose());
  };
  const getCurrentTimeZone = () => {
    ArtefactsApi.getTimeSetting(setCurrentTimeZone);
  };
  const getServerTime = async () => {
    await ArtefactsApi.getServerTime().then((resp) =>
      setServerTime(resp),
    );
  };

  return (
    <Modal
      className={styles.modal}
      isOpen={isOpen}
      onClose={handleClose}
      style={{
        justifyContent: 'center',
      }}
    >
      <div>
        <div className={styles.tabWrapper}>
          <p>Выберите нужный часовой пояс:</p>
          <select ref={timeRef} name='timezone' id='timezone'>
            <option value='UTC-1'>UTC-1</option>
            <option value='UTC-2'>UTC-2</option>
            <option value='UTC-3'>UTC-3</option>
            <option value='UTC-4'>UTC-4</option>
            <option value='UTC-5'>UTC-5</option>
            <option value='UTC-6'>UTC-6</option>
            <option value='UTC-7'>UTC-7</option>
            <option value='UTC-8'>UTC-8</option>
            <option value='UTC-9'>UTC-9</option>
            <option value='UTC-10'>UTC-10</option>
            <option value='UTC-11'>UTC-11</option>
            <option value='UTC-12'>UTC-12</option>
            <option value='UTC+1'>UTC+1</option>
            <option value='UTC+2'>UTC+2</option>
            <option value='UTC+3'>UTC+3</option>
            <option value='UTC+4'>UTC+4</option>
            <option value='UTC+5'>UTC+5</option>
            <option value='UTC+6'>UTC+6</option>
            <option value='UTC+7'>UTC+7</option>
            <option value='UTC+8'>UTC+8</option>
            <option value='UTC+9'>UTC+9</option>
            <option value='UTC+10'>UTC+10</option>
            <option value='UTC+11'>UTC+11</option>
            <option value='UTC+12'>UTC+12</option>
          </select>
          <button onClick={timeHandler}>Подтвердить</button>
        </div>
        <div className={styles.getTime}>
          <button onClick={getCurrentTimeZone}>
            Получить текущий часовой пояс
          </button>
          <button onClick={getServerTime}>
            Получить текущее время на сервере
          </button>

          {currentTimeZone && (
            <p>
              {
                currentTimeZone?.response?.data
                  ?.applicationOptionValue
              }
            </p>
          )}
          {serverTime && (
            <p>
              {
                serverTime?.response?.data
                  ?.utc
              }
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
};
