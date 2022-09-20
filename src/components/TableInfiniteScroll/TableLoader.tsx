import React, { FC, useRef } from 'react';
import s from './Table.module.scss';
import { Loader } from 'react-lib';

const TableLoader: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <article className={s.article}>
      <div className={s.loader}>
        <div
          style={{ position: 'relative', marginBottom: 20 }}
          ref={ref}
        >
          <Loader wrapper={ref} />
        </div>
        <div>Загружаем данные...</div>
      </div>
    </article>
  );
};

export default TableLoader;
