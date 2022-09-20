import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DocumentItemView } from '@typings/swagger/api';
import {
  DocumentItemNamesEnum,
  ReferenceCodesOfServicesEnum,
} from '@src/forms/ServicesDataForm/ServiceCard/ServiceCard';
import { change } from 'redux-form';
import { TaskStatusesEnum } from '@pages/Flights/components/StatusColumn/StatusColumn';
import styles from '@src/forms/ServicesDataForm/ServiceCard/ServiceCard.module.scss';
import { AsyncSelect, Icon, Input } from 'react-lib';
import DictionaryApi from '@api/dictionaryApi';
import { format } from 'date-fns';
import { ForcedDownTimeRender  } from '../TenderCommonItems/ForcedDownTimeRender';
import { ITenderSpecificProps } from '@src/types/tenderItemsProps';



export interface TenderItemProps {
  formValues: any;
  // ITenderSpecificProps
}

const WaterSystemMaintenance: React.FC<TenderItemProps> = ({ formValues }) => {
  const TYPE = DocumentItemNamesEnum.WaterSystemMaintenance;
  const CODE = ReferenceCodesOfServicesEnum.WaterSystemMaintenance;

  const dispatch = useDispatch();

  const propertiesForcedDownTime = formValues.forcedDownTime?.properties;
  const infoForcedDownTime = formValues?.forcedDownTime?.additionalInfo;

  const tenderItem = formValues?.items?.find(
    (item: DocumentItemView) => item.type === TYPE,
  );
  const properties = tenderItem?.properties;

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

  useEffect(() => {
    dispatch(
      change(
        'TenderForm',
        'additionalInfo_' + TYPE,
        tenderItem?.additionalInfo,
      ),
    );
    dispatch(change('TenderForm', TYPE, tenderItem?.masterCode));
  }, [tenderItem]);

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
                fetch={DictionaryApi.getDictionaryItems.bind(null, CODE, {})}
                fetchOne={DictionaryApi.getDictionaryItemByMasterCode.bind(
                  null,
                  CODE,
                )}
                disabled={
                  formValues.status === TaskStatusesEnum.ConfirmedPerformer
                }
                dataToValue={(x: any) => x.masterCode}
                dataToRender={(x: any) => x.name}
                name={TYPE}
                label='Тип обслуживания *'
              />
            </div>
          </div>
          {formValues[TYPE] === 'WSMOther' && (
            <div className={styles.row}>
              <div className={styles.col}>
                <Input.Redux
                  name={'additionalInfo_' + TYPE}
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
                fetch={DictionaryApi.getDictionaryItems.bind(null, CODE, {})}
                fetchOne={DictionaryApi.getDictionaryItemByMasterCode.bind(
                  null,
                  CODE,
                )}
                disabled={true}
                dataToValue={(x: any) => x.masterCode}
                dataToRender={(x: any) => x.name}
                name={TYPE}
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
          {formValues[TYPE] === 'WSMOther' ? (
            <div className={styles.row}>
              <div className={styles.col}>
                <Input.Redux
                  name={'additionalInfo_' + TYPE}
                  label='Информация'
                  disabled={true}
                />
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default WaterSystemMaintenance;
