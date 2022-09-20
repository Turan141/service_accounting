import { TaskStatusesEnum } from '@src/pages/Flights/components/StatusColumn/StatusColumn';
import React, { useEffect } from 'react';
import { Input } from 'react-lib';
import { useDispatch } from 'react-redux';
import { change, formValues } from 'redux-form';
import {
  DocumentItemNamesEnum,
  ReferenceCodesOfServicesEnum,
} from '../ServiceCard';
import styles from '../ServiceCard.module.scss';

interface GarageNumberOfSpecialEquipmentProps {
  formValues: any;
}

export const GarageNumberOfSpecialEquipment: React.FC<
  GarageNumberOfSpecialEquipmentProps
> = ({ formValues }) => {
//   const vehicleGarageNumItem = formValues?.items?.find(
//     (item: any) =>
//       item.type ===
//       DocumentItemNamesEnum.GarageNumberOfSpecialEquipment,
//   );
// const dispatch = useDispatch()
//   useEffect(() => {
//     dispatch(
//       change(
//         'TenderForm',
//         'vehicleGarageNumber',
//         vehicleGarageNumItem?.additionalInfo,
//       ),
//     );
//   }, [vehicleGarageNumItem]);
  return [
    TaskStatusesEnum.Started,
    TaskStatusesEnum.Completed,
    TaskStatusesEnum.CompletedWithoutSignature,
    TaskStatusesEnum.CompletedFromDispatcher,
    TaskStatusesEnum.CompletedWithoutPerformer,
    TaskStatusesEnum.Verified,
    TaskStatusesEnum.Rejected,
    TaskStatusesEnum.ManualVerification,
  ].some((value) => value === formValues.status) &&
    formValues.service !==
      ReferenceCodesOfServicesEnum.ProvisioningMinibus ? (
    <div className={styles.row}>
      <div className={styles.col}>
        <Input.Redux
         name='vehicleGarageNumber'
          value={
            formValues?.garageNumberOfSpecialEquipment?.additionalInfo
          }
          label='Гаражный номер спецтехники'
          className={styles.info}
        />
      </div>
    </div>
  ) : formValues.completeUrgently ? (
    <div className={styles.row}>
      <div className={styles.col}>
        <Input.Redux
          value={
            formValues?.garageNumberOfSpecialEquipment?.additionalInfo
          }
          name='vehicleGarageNumber'
          label='Гаражный номер спецтехники'
          className={styles.info}
        />
      </div>
    </div>
  ) : (
    <React.Fragment></React.Fragment>
  );
};
