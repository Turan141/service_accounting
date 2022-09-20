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

const LaddersProvision: React.FC<TenderItemProps> = ({
  formValues,
}) => {
  const TYPE = DocumentItemNamesEnum.LaddersProvision;
  const CODE = ReferenceCodesOfServicesEnum.LaddersProvision;

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
    dispatch(
      change(
        'TenderForm',
        'ladderType',
        tenderItem?.properties?.laddersSerialReference?.properties
          ?.laddersCategory,
      ),
    );
    dispatch(
      change(
        'TenderForm',
        'ladderSerial',
        tenderItem?.properties?.laddersSerial,
      ),
    );
  }, [tenderItem]);

  useEffect(() => {
    if (
      formValues?.ladderType === '8' ||
      formValues?.ladderType === '9' ||
      formValues?.ladderType === '10'
    ) {
      DictionaryApi.getDictionaryItems(
        ReferenceCodesOfServicesEnum.LaddersProvision,
        { serial: formValues.ladderType },
        '',
        1,
      ).then((resp: any) =>
        dispatch(
          change('TenderForm', 'ladderSerial', {
            masterCode: resp?.result?.[0].masterCode,
          }),
        ),
      );
    }
  }, [formValues?.ladderType]);

  // useEffect(() => {
  //    dispatch(
  //     change(
  //       'TenderForm',
  //       'ladderType',
  //       tenderItem?.properties?.laddersSerial.description,
  //     ),
  //   );

  // }, [formValues.laddersSerial])

  return (
    <div>
      <div className={styles.row}>
        <div className={styles.col}>
          {formValues?.ladderSerial &&
          formValues.status === undefined ? (
            <Select.Redux
              label='Тип стремянки *'
              name='ladderType'
              defaultDisplayValue={
                formValues?.ladderSerial?.description
              }
              disabled={
                formValues.status === TaskStatusesEnum.Verified ||
                formValues.status === TaskStatusesEnum.Rejected ||
                formValues.status ===
                  TaskStatusesEnum.CompletedWithoutSignature
              }
            >
              <Select.Option
                value={'0'}
                label={'Стремянка Малая, 900мм'}
              />
              <Select.Option
                value={'1'}
                label={'Стремянка Средняя, 1500мм'}
              />
              <Select.Option
                value={'2'}
                label={'Стремянка Высокая, выше 1500мм'}
              />
              <Select.Option value={'3'} label={'Стремянка "Гусь"'} />
              <Select.Option
                value={'4'}
                label={'Стремянка Гидравлическая'}
              />
              <Select.Option value={'10'} label={'Технический трап'} />
              <Select.Option
                value={'8'}
                label={'Трап пассажирский прицепной'}
              />
              <Select.Option value={'9'} label={'Трап самоходный'} />
            </Select.Redux>
          ) : (
            <Select.Redux
              label='Тип стремянки *'
              name='ladderType'
              disabled={
                formValues.status === TaskStatusesEnum.Verified ||
                formValues.status === TaskStatusesEnum.Rejected ||
                formValues.status ===
                  TaskStatusesEnum.CompletedWithoutSignature
              }
            >
              <Select.Option
                value={'0'}
                label={'Стремянка Малая, 900мм'}
              />
              <Select.Option
                value={'1'}
                label={'Стремянка Средняя, 1500мм'}
              />
              <Select.Option
                value={'2'}
                label={'Стремянка Высокая, выше 1500мм'}
              />
              <Select.Option value={'3'} label={'Стремянка "Гусь"'} />
              <Select.Option
                value={'4'}
                label={'Стремянка Гидравлическая'}
              />
              <Select.Option value={'10'} label={'Технический трап'} />
              <Select.Option value={'9'} label={'Трап самоходный'} />
              <Select.Option
                value={'8'}
                label={'Трап пассажирский прицепной'}
              />
            </Select.Redux>
          )}
        </div>
      </div>

      <div className={styles.col}>
        {formValues.status === undefined &&
        formValues?.ladderType !== '8' &&
        formValues?.ladderType !== '9' &&
        formValues?.ladderType !== '10' ? (
          <AsyncSelect.Redux
            disabled={
              formValues.status === TaskStatusesEnum.Verified ||
              formValues.status === TaskStatusesEnum.Rejected ||
              formValues.status ===
                TaskStatusesEnum.CompletedWithoutSignature
            }
            fetch={DictionaryApi.getDictionaryItems.bind(
              null,
              ReferenceCodesOfServicesEnum.LaddersProvision,
              { serial: formValues?.ladderType },
            )}
            fetchOne={DictionaryApi.getDictionaryItemByMasterCode.bind(
              null,
              DocumentItemNamesEnum.LaddersProvision,
            )}
            dataToValue={(x: any) => x}
            dataToRender={(x: any) => x?.name}
            name='ladderSerial'
            label='Номер стремянки *'
          />
        ) : formValues.status !== undefined &&
          formValues?.ladderType !== '8' &&
          formValues?.ladderType !== '9' &&
          formValues?.ladderType !== '10' ? (
          <AsyncSelect.Redux
            disabled={
              formValues.status === TaskStatusesEnum.Verified ||
              formValues.status === TaskStatusesEnum.Rejected ||
              formValues.status ===
                TaskStatusesEnum.CompletedWithoutSignature
            }
            fetch={DictionaryApi.getDictionaryItems.bind(
              null,
              ReferenceCodesOfServicesEnum.LaddersProvision,
              { serial: formValues?.ladderType },
            )}
            fetchOne={DictionaryApi.getDictionaryItemByMasterCode.bind(
              null,
              DocumentItemNamesEnum.LaddersProvision,
            )}
            dataToValue={(x: any) => x.masterCode}
            dataToRender={(x: any) => x?.name}
            name='ladderSerial'
            label='Номер стремянки *'
          />
        ) : (
          <></>
        )}
      </div>

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
    </div>
  );
};

export default LaddersProvision;
