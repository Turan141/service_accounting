import React, { useEffect, useState } from 'react';
import { TaskStatusesEnum } from '@pages/Flights/components/StatusColumn/StatusColumn';
import styles from '@src/forms/ServicesDataForm/ServiceCard/ServiceCard.module.scss';
import { ForcedDownTimeRender } from '../TenderCommonItems/ForcedDownTimeRender';
import { AsyncSelect, Icon, Input, Select } from 'react-lib';
import DictionaryApi from '@api/dictionaryApi';
import {
  DocumentItemNamesEnum,
  ReferenceCodesOfServicesEnum,
} from '@src/forms/ServicesDataForm/ServiceCard/ServiceCard';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { DocumentItemView } from '@typings/swagger/api';
import { TenderItemProps } from '@src/forms/TenderSpecificItems/WaterSystemMaintenance';
import { Field, change, clearFields } from 'redux-form';
import { ParkingTypeList } from '@src/forms/TenderCommonItems/ParkingTypeList';

const ProvisioningMinibus: React.FC<TenderItemProps> = ({
  formValues,
}) => {
  const dispatch = useDispatch();

  const provisioningMinibusItem = formValues?.items?.find(
    (item: any) => item.type === 'provisioningminibuses',
  );

  const parkingFromTypeFetch =
    provisioningMinibusItem?.properties?.parkingFromReference
      ?.properties?.category;

  const parkingToTypeFetch =
    provisioningMinibusItem?.properties?.parkingToReference
      ?.properties?.category;

  const getParkingType = (arg: string) => {
    switch (arg) {
      case '0':
        return 'mc';
      case '1':
        return 'gate';
      case '2':
        return 'briefing';
      case '3':
        return 'other';
      default:
        return 'mc';
    }
  };

  const propertiesForcedDownTime =
    formValues.forcedDownTime?.properties;
  const minibus = formValues?.items?.find(
    (item: DocumentItemView) =>
      item.type === DocumentItemNamesEnum.ProvisioningMinibuses,
  );
  const properties = minibus?.properties;
  const infoForcedDownTime =
    formValues?.forcedDownTime?.additionalInfo;

  useEffect(() => {
    console.log(formValues);
    if (parkingFromTypeFetch && parkingToTypeFetch) {
      dispatch(
        change(
          'TenderForm',
          'parkingFromType',
          getParkingType(parkingFromTypeFetch),
        ),
      );
      dispatch(
        change(
          'TenderForm',
          'parkingToType',
          getParkingType(parkingToTypeFetch),
        ),
      );
    }

    dispatch(
      change(
        'TenderForm',
        'parkingFrom',
        minibus?.properties?.parkingFrom,
      ),
    );
    dispatch(
      change(
        'TenderForm',
        'parkingTo',
        minibus?.properties?.parkingTo,
      ),
    );
    dispatch(
      change(
        'TenderForm',
        'passengersCategory',
        minibus?.properties?.passengersCategory,
      ),
    );
    dispatch(
      change(
        'TenderForm',
        'passengersCount',
        minibus?.properties?.passengersCount,
      ),
    );
    dispatch(
      change(
        'TenderForm',
        'transportNumber',
        minibus?.properties?.transportNumber,
      ),
    );
  }, [minibus]);

  useEffect(() => {
    if (formValues?.passengersCount <= 0) {
      dispatch(change('TenderForm', 'passengersCount', 1));
    }
  }, [formValues?.passengersCount]);

  return (
    <div>
      <div className={styles.row}>
        <div className={styles.col}>
          <Select.Redux
            label='Тип парковки'
            name='parkingFromType'
            disabled={
              formValues.status === TaskStatusesEnum.Completed ||
              formValues.status ===
                TaskStatusesEnum.CompletedWithoutSignature
            }
          >
            <Select.Option value={'mc'} label={'МС'} />
            <Select.Option value={'gate'} label={'Гейт'} />
            <Select.Option value={'briefing'} label={'Брифинг'} />
            <Select.Option value={'other'} label={'Иное'} />
          </Select.Redux>
        </div>
        <div className={styles.col}>
          <Select.Redux
            label='Тип парковки'
            name='parkingToType'
            disabled={
              formValues.status === TaskStatusesEnum.Completed ||
              formValues.status ===
                TaskStatusesEnum.CompletedWithoutSignature
            }
          >
            <Select.Option value={'mc'} label={'МС'} />
            <Select.Option value={'gate'} label={'Гейт'} />
            <Select.Option value={'briefing'} label={'Брифинг'} />
            <Select.Option value={'other'} label={'Иное'} />
          </Select.Redux>
        </div>
      </div>
      {[
        undefined,
        TaskStatusesEnum.New,
        TaskStatusesEnum.Confirmed,
        TaskStatusesEnum.ConfirmedPerformer,
        TaskStatusesEnum.CompletedFromDispatcher,
        TaskStatusesEnum.CompletedWithoutPerformer,
      ].some((value) => value === formValues.status) ? (
        <>
          <div className={styles.row}>
            <div className={styles.col}>
              {formValues.parkingFromType === 'mc' ? (
                <ParkingTypeList
                  parkingType={'0'}
                  nameOfField='parkingFrom'
                  key={String(formValues.parkingFromType)}
                  label='Маршрут с'
                />
              ) : formValues.parkingFromType === 'gate' ? (
                <ParkingTypeList
                  parkingType={'1'}
                  nameOfField='parkingFrom'
                  key={String(formValues.parkingFromType)}
                  label='Маршрут с'
                />
              ) : formValues.parkingFromType === 'briefing' &&
                formValues.status === undefined ? (
                <Input.Redux
                  value='EE47EA3C-84F9-4B87-8686-AA7B2662F454_briefing'
                  placeholder='Брифинг'
                  label='Маршрут с'
                  name='parkingFrom'
                  disabled
                  key={String(formValues.parkingFromType)}
                />
              ) : formValues.parkingFromType === 'briefing' &&
                formValues.status !== undefined ? (
                <ParkingTypeList
                  parkingType={'2'}
                  nameOfField='parkingFrom'
                  key={String(formValues.parkingFromType)}
                  label='Маршрут с'
                />
              ) : formValues.parkingFromType === 'other' ? (
                <ParkingTypeList
                  parkingType={'3'}
                  nameOfField='parkingFrom'
                  key={String(formValues.parkingFromType)}
                  label='Маршрут с'
                />
              ) : null}

              {formValues.parkingTo &&
              formValues.parkingFrom &&
              formValues.parkingTo === formValues.parkingFrom ? (
                <div style={{ color: 'red', fontSize: '0.7rem' }}>
                  Ошибка! Выбраны одинаковые места назначения.
                </div>
              ) : null}

              {formValues.parkingToType === 'briefing' &&
              formValues.parkingFromType === 'briefing' && (!formValues.parkingFrom || !formValues.parkingFrom) ? (
                <div style={{ color: 'red', fontSize: '0.7rem' }}>
                  Ошибка! Выбраны одинаковые места назначения.
                </div>
              ) : null}
            </div>

            <div className={styles.col}>
              {formValues.parkingToType === 'mc' ? (
                <ParkingTypeList
                  parkingType={'0'}
                  nameOfField='parkingTo'
                  key={String(formValues.parkingToType)}
                  label='Маршрут на'
                />
              ) : formValues.parkingToType === 'gate' ? (
                <ParkingTypeList
                  parkingType={'1'}
                  nameOfField='parkingTo'
                  key={String(formValues.parkingToType)}
                  label='Маршрут на'
                />
              ) : formValues.parkingToType === 'briefing' &&
                formValues.status === undefined ? (
                <Input.Redux
                  value='EE47EA3C-84F9-4B87-8686-AA7B2662F454_briefing'
                  placeholder='Брифинг'
                  label='Маршрут на'
                  name='parkingTo'
                  disabled
                  key={String(formValues.parkingToType)}
                />
              ) : formValues.parkingToType === 'briefing' &&
                formValues.status !== undefined ? (
                <ParkingTypeList
                  parkingType={'2'}
                  nameOfField='parkingTo'
                  key={String(formValues.parkingToType)}
                  label='Маршрут на'
                />
              ) : formValues.parkingToType === 'other' ? (
                <ParkingTypeList
                  parkingType={'3'}
                  nameOfField='parkingTo'
                  key={String(formValues.parkingToType)}
                  label='Маршрут на'
                />
              ) : null}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.col}>
              <AsyncSelect.Redux
                fetch={DictionaryApi.getDictionaryItems.bind(
                  null,
                  DocumentItemNamesEnum.PassengerCategories,
                  {},
                )}
                fetchOne={DictionaryApi.getDictionaryItemByMasterCode.bind(
                  null,
                  DocumentItemNamesEnum.PassengerCategories,
                )}
                disabled={
                  formValues.status ===
                  TaskStatusesEnum.ConfirmedPerformer
                }
                dataToValue={(x: any) => x.masterCode}
                dataToRender={(x: any) => x.name}
                name='passengersCategory'
                label='Тип *'
              />
            </div>
            <div className={styles.col}>
              <Input.Redux
                name='passengersCount'
                label='Количество пассажиров'
                type='number'
                min="0"
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              <Input.Redux
                name='transportNumber'
                label='Номер машины'
              />
            </div>
          </div>
        </>
      ) : (
        <>
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
                disabled={true}
                name='parkingFrom'
                label='Маршрут с'
              />
            </div>
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
                disabled={true}
                name='parkingTo'
                label='Маршрут на'
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              <AsyncSelect.Redux
                fetch={DictionaryApi.getDictionaryItems.bind(
                  null,
                  DocumentItemNamesEnum.PassengerCategories,
                  {},
                )}
                fetchOne={DictionaryApi.getDictionaryItemByMasterCode.bind(
                  null,
                  DocumentItemNamesEnum.PassengerCategories,
                )}
                disabled={true}
                dataToValue={(x: any) => x.masterCode}
                dataToRender={(x: any) => x.name}
                name='passengersCategory'
                label='Тип'
              />
            </div>
            <div className={styles.col}>
              <Input.Redux
                name='passengersCount'
                label='Количество пассажиров'
                type='number'
                disabled={true}
                min="0"
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              <Input.Redux
                name='transportNumber'
                label='Номер машины'
                disabled={true}
              />
            </div>
          </div>
          <div className={styles.row}>
            {[
              TaskStatusesEnum.CompletedWithoutSignature,
              TaskStatusesEnum.Completed,
              TaskStatusesEnum.Canceled,
              TaskStatusesEnum.Verified,
              TaskStatusesEnum.ManualVerification,
            ].some((value) => value === formValues.status) &&
              propertiesForcedDownTime !== undefined &&
              propertiesForcedDownTime.length && (
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

export default ProvisioningMinibus;
