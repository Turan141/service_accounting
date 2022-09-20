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
import { ForcedDownTimeRender } from '../TenderCommonItems/ForcedDownTimeRender';

export interface TenderItemProps {
  formValues: any;
}

const CompressedGas: React.FC<TenderItemProps> = ({ formValues }) => {
  const TYPE = DocumentItemNamesEnum.CompressedGas;
  const CODE = ReferenceCodesOfServicesEnum.CompressedGas;

  const dispatch = useDispatch();

  const propertiesForcedDownTime =
    formValues.forcedDownTime?.properties;
  const infoForcedDownTime =
    formValues?.forcedDownTime?.additionalInfo;

  const tenderItem = formValues?.items?.find(
    (item: DocumentItemView) => item.type === TYPE,
  );
  const properties = tenderItem?.properties;

  const compressedgas = formValues?.items?.find(
    (item: any) => item.type === 'compressedgas',
  )?.properties?.litersCount;

  useEffect(() => {
    dispatch(
      change(
        'TenderForm',
        'additionalInfo_' + TYPE,
        tenderItem?.additionalInfo,
      ),
    );
    dispatch(
      change('TenderForm', 'compressedGas', tenderItem?.masterCode),
    );
  }, [tenderItem, compressedgas]);

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
      <div className={styles.row}>
        <div className={styles.col}>
          <AsyncSelect.Redux
            fetch={DictionaryApi.getDictionaryItems.bind(
              null,
              ReferenceCodesOfServicesEnum.CompressedGas,
              {},
            )}
            fetchOne={DictionaryApi.getDictionaryItemByMasterCode.bind(
              null,
              ReferenceCodesOfServicesEnum.CompressedGas,
            )}
            dataToValue={(x: any) => x.masterCode}
            dataToRender={(x: any) => x.name}
            name='compressedGas'
            label='Тип газа *'
          />
        </div>
      </div>
      {[
        undefined,
        TaskStatusesEnum.New,
        TaskStatusesEnum.Confirmed,
        TaskStatusesEnum.ConfirmedPerformer,
      ].some((value) => value === formValues.status) ? (
        <></>
      ) : (
        <>
          <div className={styles.row}>
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
        </>
      )}
    </div>
  );
};

export default CompressedGas;
