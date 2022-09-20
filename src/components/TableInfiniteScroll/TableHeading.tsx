import * as React from 'react';
import { HeaderGroup, TableHeaderGroupProps } from 'react-table';
import styles from './Table.module.scss';

export interface ITableHeading<T extends object> {
    headerGroups: Array<HeaderGroup<T>>;
}

export function TableHeading<T extends object>({
    headerGroups,
}: ITableHeading<T>) {
    const getter = (
        props: Partial<TableHeaderGroupProps>,
        { column }: { column: HeaderGroup<T> },
    ) => ({
        ...props,
        onClick: (column as any).onClick,
    });
    return (
        <div className={styles.head}>
            {headerGroups.map((headerGroup) => (
                <div
                    {...headerGroup.getHeaderGroupProps()}
                    className={styles.row}
                >
                    {headerGroup.headers.map((column) => (
                        <div
                            {...column.getHeaderProps(getter)}
                            className={styles.header}
                        >
                            {column.render('Header')}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
