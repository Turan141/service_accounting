import styles from '@src/forms/ServicesDataForm/ServiceCard/ServiceCard.module.scss';
import { Input } from 'react-lib';
import React, { useEffect } from 'react';
import { change } from 'redux-form';
import { TenderItemProps } from '@src/forms/TenderSpecificItems/WaterSystemMaintenance';
import { useDispatch } from 'react-redux';
import { TaskStatusesEnum } from '@pages/Flights/components/StatusColumn/StatusColumn';

export const PerformerName: React.FC<TenderItemProps> = ({
  formValues,
}) => {
  const dispatch = useDispatch();

  const performerName = formValues?.performerFullName;

  useEffect(() => {
    dispatch(
      change(
        'TenderForm',
        'performerFullName',
        performerName ? performerName : null,
      ),
    );
  }, [performerName]);

  return (
    <div className={styles.col}>
      {formValues.status === TaskStatusesEnum.Confirmed ?
        <Input.Redux
          name='performerFullName'
          label='Исполнитель'
          placeholder='Заявка не принята в работу'
          disabled
        />
        :
        <Input.Redux
          name='performerFullName'
          label='Исполнитель'
          disabled
        />
      }
    </div>
  );
};
