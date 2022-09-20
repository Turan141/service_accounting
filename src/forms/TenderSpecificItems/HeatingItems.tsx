import { TaskStatusesEnum } from '@pages/Flights/components/StatusColumn/StatusColumn';
import styles from '@src/forms/ServicesDataForm/ServiceCard/ServiceCard.module.scss';
import { Icon, Input, MultiSelect } from 'react-lib';
import React, { useEffect, useMemo, useState } from 'react';
import DateTimePicker from '@components/DateTimePicker';
import { format } from 'date-fns';
import DictionaryApi from '@api/dictionaryApi';
import {
  DocumentItemNamesEnum,
  ReferenceCodesOfDictionariesEnum,
  ReferenceCodesOfServicesEnum,
} from '@src/forms/ServicesDataForm/ServiceCard/ServiceCard';
import { DictionaryModel } from '@src/types/dictionaries';
import { TenderItemProps } from '@src/forms/TenderSpecificItems/WaterSystemMaintenance';
import { useDispatch } from 'react-redux';
import { change } from 'redux-form';

const HeatingItems: React.FC<TenderItemProps> = ({ formValues }) => {
  const [heatingSpots, setHeatingSpots] = useState<
    DictionaryModel[] | undefined
  >();

  const dispatch = useDispatch();

  
  useEffect(() => {
    DictionaryApi.getDictionaryItems(
      ReferenceCodesOfServicesEnum.Heating,
      {},
      '',
      1,
    )
      .then((response: any) => setHeatingSpots(response.result))
      .catch(console.log);
      
  }, []);

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

  const heatingItems = useMemo(() => {
    const propertiesForcedDownTime =
      formValues?.forcedDownTime?.properties;
    const infoForcedDownTime =
      formValues?.forcedDownTime?.additionalInfo;
    const data: any = formValues?.heatingPoints;
    if (formValues?.forcedDownTime) {
      let firstDate = +data[0].properties?.started;
      let lastDate = +data[data.length - 1].properties?.completed;
      const parsedData = data.map((item: any, index: number) => {
        if (firstDate > +item.properties.started) {
          firstDate = +item.properties.started;
        }
        if (lastDate < +item.properties.completed) {
          lastDate = +item.properties.completed;
        }
        return (
          <div key={item.masterCode}>
            <div className={styles.row}>
              <div className={styles.col}>
                <Input label={'Точка *'} value={item.name} />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.col}>
                <DateTimePicker
                  label='Начало работ *'
                  value={item.properties?.started}
                />
              </div>
              <div className={styles.col}>
                <DateTimePicker
                  isTimePicker
                  label='Начало работ *'
                  value={
                    item.properties?.started &&
                    item.properties.started
                  }
                />
              </div>
              <div className={styles.col}>
                <DateTimePicker
                  label='Окончание работ (факт)'
                  value={item.properties?.completed}
                />
              </div>
              <div className={styles.col}>
                <DateTimePicker
                  isTimePicker
                  label='Окончание работ (факт)'
                  value={item.properties?.completed}
                />
              </div>
            </div>
          </div>
        );
      });
      const resultTime =
        (propertiesForcedDownTime &&
        lastDate &&
        firstDate &&
        propertiesForcedDownTime !== undefined ? (
          <>
            <div className={styles.row}>
              <div className={styles.col}>
                <Input
                  prefix={<Icon name={'time'} />}
                  label='Простой (мин.)'
                  value={format(
                    new Date(
                      0,
                      0,
                      0,
                      0,
                      +Math.ceil(
                        (+propertiesForcedDownTime.completed -
                          +propertiesForcedDownTime.started) /
                          60000,
                      ).toFixed(2),
                    ),
                    'mm:ss',
                  )}
                />
              </div>
              {/* <div className={styles.col}>
                <Input
                  prefix={<Icon name={'time'} />}
                  label='Продолжительность (мин.)'
                  value={Math.ceil((lastDate - firstDate) / 60000)}
                />
              </div> */}
              <div className={styles.col}>
                <Input
                  prefix={<Icon name={'time'} />}
                  label='Итог'
                  value={
                    format(new Date(firstDate), 'dd.MM.y') +
                    '  ' +
                    format(new Date(firstDate), 'HH:mm') +
                    '-' +
                    format(new Date(lastDate), 'HH:mm')
                  }
                />
              </div>
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
        ) : (
          <div className={styles.col}>
            <Input
              prefix={<Icon name={'time'} />}
              label='Продолжительность (мин.)'
              value={'0'}
            />
          </div>
        )) || null;
      return [...parsedData, resultTime];
    }
  }, []);

  return (
    <div>
      {[
        undefined,
        TaskStatusesEnum.New,
        TaskStatusesEnum.Confirmed,
        TaskStatusesEnum.ConfirmedPerformer,
      ].some((value) => value === formValues.status) ? (
        <div className={styles.row}>
          <div className={styles.col}>
            <MultiSelect.Redux
              disabled={
                formValues.status ===
                TaskStatusesEnum.ConfirmedPerformer
              }
              label='Точки обогрева *'
              name='heatingPointsMasterCodes'
            >
              {heatingSpots?.length &&
                heatingSpots?.map((item) => {
                  return (
                    <MultiSelect.Option
                      key={item.masterCode}
                      value={item.masterCode}
                      label={item.name}
                      disabled={false}
                    />
                  );
                })}
            </MultiSelect.Redux>
          </div>
        </div>
      ) : (
        <div className={styles.row}>
          <div className={styles.col}>{heatingItems}</div>
        </div>
      )}
    </div>
  );
};

export default HeatingItems;
