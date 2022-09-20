import styles from '@src/forms/ServicesDataForm/ServiceCard/ServiceCard.module.scss';
import { Input } from 'react-lib';
import React, { useEffect } from 'react';
import { change } from 'redux-form';
import { TenderItemProps } from '@src/forms/TenderSpecificItems/WaterSystemMaintenance';
import { useDispatch } from 'react-redux';

export const FlightNumber: React.FC<TenderItemProps> = ({
  formValues,
}) => {
  const dispatch = useDispatch();

  const flightNumber = formValues?.items?.find(
    (item: any) => item.type === 'anyServiceFlight',
  )?.additionalInfo;

  useEffect(() => {
    dispatch(change('TenderForm', 'flight', flightNumber));
  }, [flightNumber]);

  return (
    <div className={styles.col}>
      <Input.Redux name='flight' label='Номер рейса' />
    </div>
  );
};
