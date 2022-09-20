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

const ProvisionOfSpecialMachinery: React.FC<TenderItemProps> = ({ formValues }) => {
  const TYPE = DocumentItemNamesEnum.ProvisioningEscortVehicle;
  const CODE = ReferenceCodesOfServicesEnum.ProvisioningEscortVehicle;

  const dispatch = useDispatch();

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

  const propertiesForcedDownTime =
    formValues.forcedDownTime?.properties;
  const infoForcedDownTime =
    formValues?.forcedDownTime?.additionalInfo;

  const tenderItem = formValues?.items?.find(
    (item: DocumentItemView) => item.type === TYPE,
  );
  const properties = tenderItem?.properties;

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

  const routeFrom = formValues?.items?.find(
    (item: any) => item.type === 'provisioningescortvehicle',
  )?.properties?.routeFrom;

  const routeTo = formValues?.items?.find(
    (item: any) => item.type === 'provisioningescortvehicle',
  )?.properties?.routeTo;


  useEffect(() => {
    dispatch(change('TenderForm', 'routeFrom', routeFrom));
    dispatch(change('TenderForm', 'routeTo', routeTo));
  }, [routeFrom, routeTo]);

  return (
    <div>
        <div className={styles.row}>
        <div className={styles.col}>
            <AsyncSelect.Redux
                fetch={DictionaryApi.getDictionaryItems.bind(
                  null,
                  DocumentItemNamesEnum.AircraftParkings,
                  {},
                )}
                fetchOne={DictionaryApi.getDictionaryItemByMasterCode.bind(
                  null,
                  DocumentItemNamesEnum.AircraftParkings,
                )}
                dataToValue={(x: any) => x.masterCode}
                dataToRender={(x: any) => x.name}
                name='routeFrom'
                label='Маршрут с *'
              />
        </div>
        <div className={styles.col}>
            <AsyncSelect.Redux
                fetch={DictionaryApi.getDictionaryItems.bind(
                  null,
                  DocumentItemNamesEnum.AircraftParkings ||  ReferenceCodesOfServicesEnum.ProvisioningEscortVehicle,
                  {},
                )}
                fetchOne={DictionaryApi.getDictionaryItemByMasterCode.bind(
                  null,
                  DocumentItemNamesEnum.AircraftParkings || ReferenceCodesOfServicesEnum.ProvisioningEscortVehicle,
                )}
                dataToValue={(x: any) => x.masterCode}
                dataToRender={(x: any) => x.name}
                name='routeTo'
                label='Маршрут на *'
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

export default ProvisionOfSpecialMachinery;
