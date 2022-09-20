import React, { useEffect } from 'react';
import styles from '@src/forms/ServicesDataForm/ServiceCard/ServiceCard.module.scss';
import { DateTimePickerRedux } from '@components/DateTimePicker/DateTimePicker';
import { change, clearFields, reduxForm } from 'redux-form';
import { useDispatch } from 'react-redux';
import { TaskStatusesEnum } from '@pages/Flights/components/StatusColumn/StatusColumn';

interface TimeProps {
  formValues: any;
}

export const FixedTimeForm: React.FC<TimeProps> = ({
  formValues,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(+formValues.endPlan - +formValues.completed);

    if (
      formValues.properties.startedFixed &&
      formValues.properties.completedFixed
    ) {
      dispatch(
        change(
          'TenderForm',
          'startedFixed',
          formValues.properties.startedFixed,
        ),
      );
      dispatch(
        change(
          'TenderForm',
          'completedFixed',
          formValues.properties.completedFixed,
        ),
      );
    }

    if (
      formValues.status === TaskStatusesEnum.ManualVerification &&
      +formValues.endPlan - +formValues.completed > 0
    ) {
      dispatch(
        change('TenderForm', 'completedFixed', formValues.endPlan),
      );
    }

    if (
      formValues.status === TaskStatusesEnum.ManualVerification &&
      +formValues.startPlan - +formValues.started > 0
    ) {
      dispatch(
        change('TenderForm', 'startedFixed', formValues.startPlan),
      );
    }
  }, []);

  return (
    <>
      <div className={styles.row}>
        <div className={styles.col}>
          <DateTimePickerRedux
            label='Начало работ (подтв..)'
            name='startedFixed'
            disabled={
              formValues.status !==
              TaskStatusesEnum.ManualVerification
            }
            maxDate={
              +formValues.completedFixed &&
              formValues.startedFixed !== formValues.completedFixed &&
              new Date(+formValues.completedFixed)
            }
          />
        </div>
        <div className={styles.col}>
          <DateTimePickerRedux
            label='Окончание работ (подтв..)'
            name='completedFixed'
            disabled={
              formValues.status !==
              TaskStatusesEnum.ManualVerification
            }
            minDate={
              +formValues.startedFixed &&
              new Date(+formValues.startedFixed)
            }
          />
        </div>
      </div>
    </>
  );
};
