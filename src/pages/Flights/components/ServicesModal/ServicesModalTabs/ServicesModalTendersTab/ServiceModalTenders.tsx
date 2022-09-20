import React, { useMemo } from 'react';
import { Table } from 'react-lib';
import { useFlexLayout } from 'react-table';
import styles from './ServiceModalTenders.module.scss';
export const ServiceModalTenders = () => {
  const json = {
    items: [
      {
        number: '35',
        name: 'Загрузка по классам (СЗВ)',
        qty: '3',
        comment: 'Запрос срочный',
        respons: 'Специалист по учету',
      },
      {
        number: '34',
        name: 'Груз-почта-багаж',
        qty: '3',
        comment: 'Запрос срочный',
        respons: 'Специалист по учету',
      },
      {
        number: '33',
        name: 'Слив воды из ВС',
        qty: '3',
        comment: 'Запрос срочный',
        respons: 'Специалист по учету',
      },
      {
        number: '23',
        name: 'Буксировка ВС',
        qty: '3',
        comment: 'Запрос срочный',
        respons: 'Специалист по учету',
      },
      {
        number: '13',
        name: 'Заправка санузлов',
        qty: '3',
        comment: 'Запрос срочный',
        respons: 'Специалист по учету',
      },
      {
        number: '63',
        name: 'Загрузка по классам',
        qty: '3',
        comment: 'Запрос срочный',
        respons: 'Специалист по учету',
      },
    ],
    count: 5,
    total: 5,
  };
  const columns = useMemo(
    () => [
      {
        Header: 'Номер',
        accessor: 'number',
        width: '85%',
        Cell: ({ value }: any) => {
          return <div className={styles.td}>{value}</div>;
        },
      },
      {
        Header: 'Название',
        accessor: 'name',
        // width: 45,
        Cell: ({ value }: any) => {
          return <div className={styles.td}>{value}</div>;
        },
      },
      {
        Header: 'Кол-во:',
        accessor: 'qty',
        width: '60%',
        // width: 45,
        Cell: ({ value }: any) => {
          return <div className={styles.td}>{value}</div>;
        },
      },
      {
        Header: 'Комментарий',
        accessor: 'comment',
        // width: 45,
        Cell: ({ value }: any) => {
          return <div className={styles.td}>{value}</div>;
        },
      },
      {
        Header: 'Отвественный',
        accessor: 'respons',
        // width: 45,
        Cell: ({ value }: any) => {
          return <div className={styles.td}>{value}</div>;
        },
      },
    ],
    [],
  );
  return (
    <div className={styles.ServiceModalTenders}>
      <Table
        className={styles.table}
        data={json?.items?.map((item: any) => item)}
        columns={columns}
        tableHooks={[useFlexLayout]}
      />
    </div>
  );
};
