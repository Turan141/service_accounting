import { format } from 'date-fns';
import dayjs, { utc } from 'dayjs';
import React from 'react';
import styles from '../ServiceModalLir.module.scss';

export const LIRTelegramItem = ({ elem }: any) => {
  const convertToUTC = (date: any) => {
    const offset = new Date().getTimezoneOffset();
    return dayjs(date).valueOf() - offset * 60000;
  };
  return (
    <div className={styles.LirWindow}>
      <h1>{elem?.from}</h1>
      <h2>{elem?.content}</h2>
      <p>
        {dayjs(convertToUTC(elem?.created))?.format(
          'DD-MM-YYYY HH:mm',
        )}
      </p>
    </div>
  );
};
