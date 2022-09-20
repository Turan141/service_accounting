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

const MaintanceKit: React.FC<TenderItemProps> = ({ formValues }) => {
  const TYPE = DocumentItemNamesEnum.MaintanceKit;
  const CODE = ReferenceCodesOfServicesEnum.MaintanceKit;

  const dispatch = useDispatch();

  const propertiesForcedDownTime =
    formValues?.forcedDownTime?.properties;
  const infoForcedDownTime =
    formValues?.forcedDownTime?.additionalInfo;

  const tenderItem = formValues?.items?.find(
    (item: DocumentItemView) => item.type === TYPE,
  );
  const properties = tenderItem?.properties;

  const maintanceKit = tenderItem?.masterCode;

  const numberseats = properties?.numberseats;

  const weight = properties?.weight;

  const maintanceKitFrom = properties?.maintanceKitFrom;

  const maintanceKitTo = properties?.maintanceKitTo;

  useEffect(() => {
    dispatch(change('TenderForm', 'maintanceKit', maintanceKit));
    dispatch(change('TenderForm', 'numberseats', numberseats));
    dispatch(change('TenderForm', 'weight', weight));
    dispatch(
      change('TenderForm', 'maintanceKitFrom', maintanceKitFrom),
    );
    dispatch(change('TenderForm', 'maintanceKitTo', maintanceKitTo));
    dispatch(
      change(
        'TenderForm',
        'additionalInfo_' + TYPE,
        tenderItem?.additionalInfo,
      ),
    );
    dispatch(change('TenderForm', TYPE, tenderItem?.masterCode));
  }, [maintanceKit, numberseats, tenderItem]);

  return (
    <div>
      <div className={styles.row}>
        <div className={styles.col}>
          <AsyncSelect.Redux
           disabled={
            formValues.status === TaskStatusesEnum.Verified ||
            formValues.status === TaskStatusesEnum.Rejected ||
            formValues.status ===
              TaskStatusesEnum.CompletedWithoutSignature
          }
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
            name='maintanceKitFrom'
            label='Маршрут с *'
          />
        </div>
        <div className={styles.col}>
          <AsyncSelect.Redux
           disabled={
            formValues.status === TaskStatusesEnum.Verified ||
            formValues.status === TaskStatusesEnum.Rejected ||
            formValues.status ===
              TaskStatusesEnum.CompletedWithoutSignature
          }
            fetch={DictionaryApi.getDictionaryItems.bind(
              null,
              DocumentItemNamesEnum.AircraftParkings ||
                ReferenceCodesOfServicesEnum.ProvisioningEscortVehicle,
              {},
            )}
            fetchOne={DictionaryApi.getDictionaryItemByMasterCode.bind(
              null,
              DocumentItemNamesEnum.AircraftParkings ||
                ReferenceCodesOfServicesEnum.ProvisioningEscortVehicle,
            )}
            dataToValue={(x: any) => x.masterCode}
            dataToRender={(x: any) => x.name}
            name='maintanceKitTo'
            label='Маршрут на *'
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.col}>
          <AsyncSelect.Redux
           disabled={
            formValues.status === TaskStatusesEnum.Verified ||
            formValues.status === TaskStatusesEnum.Rejected ||
            formValues.status ===
              TaskStatusesEnum.CompletedWithoutSignature
          }
            fetch={DictionaryApi.getDictionaryItems.bind(
              null,
              ReferenceCodesOfServicesEnum.MaintanceKit,
              {},
            )}
            fetchOne={DictionaryApi.getDictionaryItemByMasterCode.bind(
              null,
              ReferenceCodesOfServicesEnum.MaintanceKit,
            )}
            dataToValue={(x: any) => x.masterCode}
            dataToRender={(x: any) => x.name}
            name='maintanceKit'
            label='Вид работы *'
          />
        </div>
        <div className={styles.col}>
          <Input.Redux
           disabled={
            formValues.status === TaskStatusesEnum.Verified ||
            formValues.status === TaskStatusesEnum.Rejected ||
            formValues.status ===
              TaskStatusesEnum.CompletedWithoutSignature
          }
            name='numberseats'
            label='Мест'
            type='number'
            min="0"
          />
        </div>
        <div className={styles.col}>
          <Input.Redux name='weight' label='Вес, кг' type='number' min="0"  disabled={
              formValues.status === TaskStatusesEnum.Verified ||
              formValues.status === TaskStatusesEnum.Rejected ||
              formValues.status ===
                TaskStatusesEnum.CompletedWithoutSignature
            }/>
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

export default MaintanceKit;
