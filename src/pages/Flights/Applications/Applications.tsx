// Core
import React, { useCallback, useState } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import { useDispatch } from 'react-redux';
import { formValues, initialize } from 'redux-form';

// Style
import sls from './Applications.module.scss';

// Components
import { AsyncSelect, Button, useModal } from 'react-lib';
import CreateTenderModal from '@components/CreateTenderModal/CreateTenderModal';
import Search from '@pages/Flights/Applications/Search/Search';
import FilterWrapper from '@pages/Flights/Applications/Filter/FilterWrapper';
import ApplicationsTable from '@src/pages/Flights/Applications/ApplicationsTable/ApplicationsTable';

// Utils
import { checkAccess } from '@helpers/utils';
import ReportsView from './ReportsView/ReportsView';

const Applications: React.FC = () => {
  dayjs.extend(utc);
  dayjs.extend(customParseFormat);
  const { openModal } = useModal();
  // const modal_2 = useModal();

  const dispatch = useDispatch();

  const openTenderModal = useCallback(() => {
    dispatch(initialize('TenderForm', {}));
    openModal(CreateTenderModal, {});
  }, []);

  return (
    <div className={sls.root}>
      <div className={sls.searchBlock}>
        <div>
          {checkAccess(['5', '6']) && <ReportsView />}
          {checkAccess(['0', '1', '5']) && (
            <Button
              onClick={openTenderModal}
              icon={<i className='icon-add' />}
            >
              Создать заявку
            </Button>
          )}
        </div>

        <div className={sls.search}>
          <Search />
          <FilterWrapper />
        </div>
      </div>
      {checkAccess(['0', '1', '4', '5', '6']) && (
        <ApplicationsTable />
      )}
    </div>
  );
};

export default Applications;
