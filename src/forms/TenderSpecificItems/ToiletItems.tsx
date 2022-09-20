import { TaskStatusesEnum } from '@pages/Flights/components/StatusColumn/StatusColumn';
import styles from '@src/forms/ServicesDataForm/ServiceCard/ServiceCard.module.scss';
import { AsyncSelect, Icon, Input } from 'react-lib';
import React, { useEffect } from 'react';
import { format } from 'date-fns';
import DictionaryApi from '@api/dictionaryApi';
import {
  DocumentItemNamesEnum,
  ReferenceCodesOfServicesEnum,
} from '@src/forms/ServicesDataForm/ServiceCard/ServiceCard';
import { DocumentItemView } from '@typings/swagger/api';
import Textarea from '@components/Textarea';
import { useDispatch } from 'react-redux';
import { change } from 'redux-form';
import { TenderItemProps } from '@src/forms/TenderSpecificItems/WaterSystemMaintenance';
import { ForcedDownTimeRender  } from '../TenderCommonItems/ForcedDownTimeRender';

const ToiletItems: React.FC<TenderItemProps> = ({ formValues }) => {
  const dispatch = useDispatch();

  const propertiesForcedDownTime = formValues.forcedDownTime?.properties;
  const infoForcedDownTime = formValues?.forcedDownTime?.additionalInfo;

  const lavatory = formValues?.items?.find(
    (item: DocumentItemView) => item.type === DocumentItemNamesEnum.Lavatory,
  );
  const properties = lavatory?.properties;
  useEffect(() => {
    dispatch(
      change(
        'TenderForm',
        'additionalInfoLavatoryType',
        lavatory?.additionalInfo,
      ),
    );
  }, [lavatory]);

  const vehicleGarageNumItem = formValues?.items?.find(
    (item: any) =>
      item.type ===
      DocumentItemNamesEnum.GarageNumberOfSpecialEquipment,
  );

  useEffect(() => {
    dispatch(
      change(
        'TenderForm',
        'vehicleGarageNumber',
        vehicleGarageNumItem?.additionalInfo,
      ),
    );
  }, [vehicleGarageNumItem]);

  return (
    <div>
      {[
        undefined,
        TaskStatusesEnum.New,
        TaskStatusesEnum.Confirmed,
        TaskStatusesEnum.ConfirmedPerformer,
      ].some((value) => value === formValues.status) ? (
        <>
          <div className={styles.row}>
            <div className={styles.col}>
              <AsyncSelect.Redux
                fetch={DictionaryApi.getDictionaryItems.bind(
                  null,
                  ReferenceCodesOfServicesEnum.Lavatory,
                  {},
                )}
                fetchOne={DictionaryApi.getDictionaryItemByMasterCode.bind(
                  null,
                  ReferenceCodesOfServicesEnum.Lavatory,
                )}
                disabled={
                  formValues.status === TaskStatusesEnum.ConfirmedPerformer
                }
                dataToValue={(x: any) => x.masterCode}
                dataToRender={(x: any) => x.name}
                name='lavatoryType'
                label='Тип обслуживания *'
              />
            </div>
          </div>
          {formValues.lavatoryType === 'other' && (
            <div className={styles.row}>
              <div className={styles.col}>
                <Input.Redux
                  name='additionalInfoLavatoryType'
                  label='Информация'
                  disabled={
                    formValues.status === TaskStatusesEnum.ConfirmedPerformer
                  }
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className={styles.row}>
            <div className={styles.col}>
              <AsyncSelect.Redux
                fetch={DictionaryApi.getDictionaryItems.bind(
                  null,
                  ReferenceCodesOfServicesEnum.Lavatory,
                  {},
                )}
                fetchOne={DictionaryApi.getDictionaryItemByMasterCode.bind(
                  null,
                  ReferenceCodesOfServicesEnum.Lavatory,
                )}
                disabled={true}
                dataToValue={(x: any) => x.masterCode}
                dataToRender={(x: any) => x.name}
                name='lavatoryType'
                label='Тип обслуживания *'
              />
            </div>
            {[
              TaskStatusesEnum.CompletedWithoutSignature,
              TaskStatusesEnum.Completed,
              TaskStatusesEnum.Canceled,
              TaskStatusesEnum.Verified,
              TaskStatusesEnum.ManualVerification,
            ].some((value) => value === formValues.status) &&
            propertiesForcedDownTime !== undefined && propertiesForcedDownTime.length && (
              <ForcedDownTimeRender
                completedTime={+propertiesForcedDownTime.completed}
                startedTime={+propertiesForcedDownTime.started}
                properties={properties}
              />
            )}
          </div>
          
          {infoForcedDownTime && (
            <div className={styles.row}>
              <div className={styles.col}>
                <Input
                  label='Доп. информация (вынужденный простой)'
                  value={infoForcedDownTime}
                  disabled={true}
                />
              </div>
            </div>
          )}
          {formValues.lavatoryType === 'other' && (
            <div className={styles.row}>
              <div className={styles.col}>
                <Input.Redux
                  name='additionalInfoLavatoryType'
                  label='Информация'
                  disabled={true}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ToiletItems;
