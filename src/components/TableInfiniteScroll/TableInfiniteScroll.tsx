// Core
import * as React from 'react';
import { Row, useTable } from 'react-table';
import InfiniteScroll from 'react-infinite-scroll-component';

//Components
import { TableHeading } from './TableHeading';
import { TableBody } from './TableBody';
import { TableWrapper } from './TableWrapper';
import TableLoader from '@components/TableInfiniteScroll/TableLoader';

export interface TableInfiniteScrollProps {
  className?: string;
  data: any[any];
  columns: any[any];
  next: any;
  tableHooks?: any[];
  getSubRows?: (p: any) => Row[];
  getRowClass?: (row: Row<Row<{}>>) => string;
  cellClass?: string[];
  renderRowSubComponent?: (p: any) => Row<any>[];
  scrollable?: boolean;
  scrollHeight?: string;
  hasMore: boolean;
  loading?: boolean;
  // @deprecated
  rowClass?: string[];
  handleClick: any;
}

function TableInfiniteScroll({
  handleClick,
  className,
  data,
  columns,
  tableHooks = [],
  getSubRows,
  getRowClass,
  cellClass = [],
  renderRowSubComponent,
  rowClass,
  next,
  loading,
  hasMore,
}: TableInfiniteScrollProps) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
  } = useTable({ columns, data, getSubRows }, ...tableHooks);

  return (
    <>
      <InfiniteScroll
        style={{
          display: 'flex',
          flex: 1,
          marginBottom: 69,
        }}
        dataLength={rows.length}
        next={next}
        scrollableTarget={'tableWrapper'}
        scrollThreshold='90%'
        hasMore={hasMore}
        loader={null}
        height={'100%'}
      >
        <TableWrapper
          className={className}
          getTableProps={getTableProps}
          id={'tableWrapper'}
        >
          <TableHeading headerGroups={headerGroups} />
          <TableBody
            handleClick={handleClick}
            rows={rows}
            getRowClass={getRowClass}
            cellClass={cellClass}
            getTableBodyProps={getTableBodyProps}
            prepareRow={prepareRow}
            renderRowSubComponent={renderRowSubComponent}
            visibleColumns={visibleColumns}
            rowClass={rowClass}
          />
        </TableWrapper>
        {hasMore && loading && <TableLoader />}
      </InfiniteScroll>
    </>
  );
}

export default TableInfiniteScroll;
