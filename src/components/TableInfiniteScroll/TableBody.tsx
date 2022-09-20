import * as React from 'react';
import styles from './Table.module.scss';
import cn from 'classnames';
import {
  Row,
  ColumnInstance,
  TablePropGetter,
  TableProps,
  TableRowProps,
} from 'react-table';
import { MutableRefObject } from 'react';

export interface ITableBody<T extends {}> {
  handleClick: any;
  scrollHeight?: string;
  scrollable?: boolean;
  rows: Array<Row<T>>;
  rowClass?: string[];
  getRowClass?: (row: Row<T>) => string;
  cellClass?: string[];
  visibleColumns: Array<ColumnInstance<T>>;
  getTableBodyProps: (propGetter?: TablePropGetter<T>) => TableProps;
  prepareRow: (row: Row<T>) => void;
  renderRowSubComponent?: (p: {
    row: Row<T>;
    rowProps: TableRowProps;
    visibleColumns: Array<ColumnInstance<T>>;
  }) => Row<T>[];
  ref?: MutableRefObject<any>;
  id?: string;
}

export function TableBody<T extends {}>({
  scrollHeight = '150px',
  scrollable = false,
  rows,
  getRowClass,
  cellClass,
  visibleColumns,
  getTableBodyProps,
  prepareRow,
  renderRowSubComponent,
  rowClass,
  ref,
  id,
  handleClick,
}: ITableBody<T>) {
  const getter = (
    props: Partial<TableRowProps>,
    { row }: { row: Row<T> },
  ) => {
    const original = row.original as any;
    // TODO Разобраться с параметрами в дженериках rows и data в react-table
    return {
      onClick: original.onClick,
      needwarningfont: original.needWarningFont,
      needcustombackground: original.needCustomBackground,
      ...props,
    };
  };
  return (
    <div
      id={id}
      ref={ref}
      {...getTableBodyProps()}
      className={styles.body}
      style={scrollable ? { height: scrollHeight } : {}}
    >
      {rows.map((row, index) => {
        prepareRow(row);
        const rowProps = row.getRowProps(getter);
        return (
          <React.Fragment key={index}>
            <div
              {...rowProps}
              className={
                // @ts-ignore
                row.original.lockState === 'lock'
                  ? cn(
                      styles.rowLocked,
                      getRowClass && getRowClass(row),
                      rowClass?.concat(' '),
                    )
                  : styles.row
              }
            >
              {row.cells.map((cell) => (
                <div
                  {...cell.getCellProps()}
                  className={cn(styles.td, cellClass?.concat(' '))}
                  onClick={() => {
                    // @ts-ignore
                    row.original.lockState !== 'lock' &&
                      handleClick(row.original);
                  }}
                >
                  {cell.render('Cell')}
                </div>
              ))}
            </div>
            {(row as any).isExpanded && renderRowSubComponent
              ? renderRowSubComponent({
                  row,
                  rowProps,
                  visibleColumns,
                })
              : null}
          </React.Fragment>
        );
      })}
    </div>
  );
}
