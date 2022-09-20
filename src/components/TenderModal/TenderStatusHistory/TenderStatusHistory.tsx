import React, { HTMLAttributes, useMemo } from 'react';

import { H4, Table, Typography } from 'react-lib';
import StatusColumn from '@pages/Flights/components/StatusColumn/StatusColumn';

import styles from './TenderStatusHistory.module.scss';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { useFlexLayout } from 'react-table';

interface TenderEditHistoryProps {
  statuses: any;
}

const TenderStatusHistory: React.FC<
  TenderEditHistoryProps & HTMLAttributes<HTMLDivElement>
> = ({ statuses, className }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Статус',
        accessor: 'name',
        Cell: (data: any) => (
          <StatusColumn
            status={data.value}
            className={styles.status}
          />
        ),
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
        data={statuses}
        columns={columns}
        tableHooks={[useFlexLayout]}
      />
    </div>
  );
};

export default TenderStatusHistory;
