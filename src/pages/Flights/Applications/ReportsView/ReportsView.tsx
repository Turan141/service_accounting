import React, { createRef, useRef } from 'react';
import useDropdownFilter from '@helpers/useDropdownFilter';
import ReportsForm from './ReportsForm';
import { Button } from 'react-lib';

const ReportsView: React.FC = () => {
  const trigger = createRef<any>();

  const pos = 'bottom left'
  
  const { DropdownView, close, toggle } = useDropdownFilter(trigger, pos);



  return (
    <>
      <span ref={trigger} onClick={toggle}>
            <>
            <Button>
              Выгрузить отчёт
            </Button>
            </>
      </span>
      <div style={{left: '300px !important', top: '200px !important', position:'absolute'}}>
      <DropdownView>
        <ReportsForm handleClose={close} />
      </DropdownView>
      </div>
    </>
  );
};

export default ReportsView;


