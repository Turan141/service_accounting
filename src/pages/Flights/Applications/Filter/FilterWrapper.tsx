import React, { useRef } from 'react';
import useDropdownFilter from '@helpers/useDropdownFilter';
import FilterForm from '@pages/Flights/Applications/Filter/FilterForm';
import styles from './Filter.module.scss';
import { Button, Icon } from 'react-lib';
import { getFormValues } from 'redux-form';
import { useSelector } from 'react-redux';
import _ from 'lodash';

const FilterWrapper: React.FC = () => {
  const trigger = useRef<HTMLDivElement>(null);
  const pos = 'bottom right';
  const { DropdownView, close, toggle } = useDropdownFilter(
    trigger,
    pos,
  );

  const applicationsFilter: any = useSelector((state) =>
    getFormValues('applicationsFilter')(state),
  );

  return (
    <div className={styles.iconSetting}>
      {!_.isEmpty(applicationsFilter) && (
        // @ts-ignore
        <Button
          className={styles.clearInputSearchBtn}
          icon={
            <Icon
              className={styles.clearInputSearch}
              name='statusWarning'
            />
          }
        ></Button>
      )}

      <span ref={trigger} onClick={toggle}>
        <i className='icon-setting' />
        <DropdownView>
          <FilterForm handleClose={close} />
        </DropdownView>
      </span>
    </div>
  );
};

export default FilterWrapper;
