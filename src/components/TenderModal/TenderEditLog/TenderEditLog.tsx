import React, { HTMLAttributes, useMemo } from 'react';
import { Table } from 'react-lib';
import styles from './TenderEditLog.module.scss';
import classNames from 'classnames';
import { useFlexLayout } from 'react-table';
import EventMessage from '@components/TenderModal/TenderEditLog/EventMessage';

interface TenderEditHistoryProps {
  log: any;
}

const TenderEditLog: React.FC<
  TenderEditHistoryProps & HTMLAttributes<HTMLDivElement>
> = ({ log, className }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Событие',
        accessor: 'name',
        Cell: (data: any) => (
          <EventMessage event={data.row.original} />
        ),
      },
      {
        Header: 'Инициатор',
        accessor: 'user',
        Cell: (data: any) => <span>{data.value.fullName}</span>,
      },
      {
        Header: 'Время',
        accessor: 'created',
      },
    ],
    [],
  );

  return (
    <div className={classNames(styles.root, className)}>
      <Table
        className={styles.table}
        data={log}
        columns={columns}
        tableHooks={[useFlexLayout]}
      />
    </div>
  );
};

export default TenderEditLog;
