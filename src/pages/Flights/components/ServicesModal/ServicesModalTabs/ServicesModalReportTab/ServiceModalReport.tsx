import React from 'react';
import { Icon } from 'react-lib';
import styles from './ServiceModalReports.module.scss';

export const ServiceModalReport = () => {
  const report = [
    {
      name: 'Буксировка',
    },
    {
      name: 'Установка ВС на МС',
    },
    {
      name: 'Колодки',
    },
    {
      name: 'Работа САБ',
    },
    {
      name: 'Трап',
    },
    {
      name: 'Багаж',
    },
  ];
  return (
    <div className={styles.header}>
      <h1>ТКО</h1>
      {report.map((elem) => (
        <div className={styles.report}>
          <h1>{elem.name}</h1>
          <Icon name='angleDown' />
        </div>
      ))}
    </div>
  );
};
