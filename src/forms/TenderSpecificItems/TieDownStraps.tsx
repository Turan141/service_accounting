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
import { Icon, Input } from 'react-lib';
import DictionaryApi from '@api/dictionaryApi';
import { format } from 'date-fns';
import { ForcedDownTimeRender } from '../TenderCommonItems/ForcedDownTimeRender';

export interface TenderItemProps {
  formValues: any;
}

const TieDownStraps: React.FC<TenderItemProps> = ({ formValues }) => {
  const TYPE = DocumentItemNamesEnum.TieDownStraps;
  const CODE = ReferenceCodesOfServicesEnum.AnyService;

  const dispatch = useDispatch();

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

  const kitsCount = formValues?.items?.find(
    (item: any) => item.type === 'tiedownstraps',
  )?.properties?.kitsCount;

  useEffect(() => {
    dispatch(change('TenderForm', 'kitsCount', kitsCount));
  }, [kitsCount]);

  return (
    <div>
        <div className={styles.row}>
        <div className={styles.col}>
            <Input.Redux name='kitsCount' label='Кол-во комплектов'/>
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

export default TieDownStraps;
