import * as React from 'react';
import classNames from 'classnames';
import styles from './Table.module.scss';
import { TablePropGetter, TableProps } from 'react-table';

export interface ITableWrapper<T extends object> {
  className?: string;
  scrollable?: boolean;
  getTableProps: (propGetter?: TablePropGetter<T>) => TableProps;
  children: React.ReactElement | React.ReactElement[];
  id?: string;
}

export function TableWrapper<T extends object>({
  className,
  scrollable,
  getTableProps,
  children,
  id = '',
}: ITableWrapper<T>) {
  return (
    <table
      id={id}
      {...getTableProps}
      className={classNames(styles.root, className, {
        [styles.scrollable]: scrollable,
      })}
    >
      {children}
    </table>
  );
}
