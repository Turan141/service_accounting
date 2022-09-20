import React from 'react';

import styles from './TenderSignature.module.scss';
import { H4, H5, P, Typography } from 'react-lib';
import { DocumentItemView } from '@typings/swagger/api';
import StatusColumn, {
  TaskStatusesEnum,
} from '@pages/Flights/components/StatusColumn/StatusColumn';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { getFormValues } from 'redux-form';
import { useSelector } from 'react-redux';

export interface TenderSignatureProps {
  signature?: any;
  customerFullName?: string;
  dispatcherSign?: DocumentItemView;
  completed?: string;
  status: TaskStatusesEnum;
  customerSign?: DocumentItemView;
}

const TenderSignature: React.FC<TenderSignatureProps> = ({
  signature,
  completed,
  customerFullName,
  dispatcherSign,
  status,
  customerSign,
}) => {
  const formValues = useSelector(
    (state) => getFormValues('TenderForm')(state),
    undefined,
  ) as {} as DocumentItemView;

  return (
    <div className={styles.root}>
      <H4 className={styles.subHeader}>
        {status !== TaskStatusesEnum.Canceled
          ? 'Подпись:'
          : 'Выполнение услуги отменено'}
      </H4>
      {status === TaskStatusesEnum.Completed &&
        signature?.data?.result?.url && (
          <div className={styles.wrap}>
            <img
              width={300}
              src={`${window.location.origin}/clients/files/${signature.data.result.url}`}
              alt='Иконка статуса'
            />
            <H5 className={styles.row}>
              {customerSign?.properties?.position}:{' '}
              {customerSign?.properties?.fullName}
            </H5>
          </div>
        )}

      {status === TaskStatusesEnum.Verified &&
        signature?.data?.result?.url && (
          <div className={styles.wrap}>
            <img
              width={300}
              src={`${window.location.origin}/clients/files/${signature.data.result.url}`}
              alt='Иконка статуса'
            />
            <H5 className={styles.row}>
              {customerSign?.properties?.position}:{' '}
              {customerSign?.properties?.fullName}
            </H5>
          </div>
        )}

      {status === TaskStatusesEnum.Rejected &&
        signature?.data?.result?.url && (
          <div className={styles.wrap}>
            <img
              width={300}
              src={`${window.location.origin}/clients/files/${signature.data.result.url}`}
              alt='Иконка статуса'
            />
            <H5 className={styles.row}>
              {customerSign?.properties?.position}:{' '}
              {customerSign?.properties?.fullName}
            </H5>
          </div>
        )}

      {status === TaskStatusesEnum.CompletedWithoutSignature && (
        <div className={classNames(styles.row)}>
          <StatusColumn
            status={TaskStatusesEnum.CompletedWithoutSignature}
            className={styles.status}
          />
          <Typography size={'medium'}>
            {completed &&
              dayjs(+completed).format('DD.MM.YYYY HH:mm')}
          </Typography>
        </div>
      )}

      {status === TaskStatusesEnum.CompletedFromDispatcher &&
        dispatcherSign && (
          <div className={classNames(styles.column, styles.content)}>
            <div className={classNames(styles.row)}>
              <StatusColumn
                status={TaskStatusesEnum.CompletedWithoutPerformer}
                className={styles.status}
              />
              <Typography size={'medium'}>
                {dispatcherSign.createdAt &&
                  dayjs(+dispatcherSign.createdAt).format(
                    'DD.MM.YYYY HH:mm',
                  )}
              </Typography>
            </div>
            <H5>
              Подписано диспетчером{' '}
              {dispatcherSign?.createdByFullName}
            </H5>
            <P>{`Комментарий диспетчера: ${dispatcherSign.properties?.dispatcherComment}`}</P>
          </div>
        )}

      {status === TaskStatusesEnum.Completed && dispatcherSign && (
        <div className={classNames(styles.column, styles.content)}>
          <div className={classNames(styles.row)}>
            <StatusColumn
              status={TaskStatusesEnum.CompletedWithoutPerformer}
              className={styles.status}
            />
            <Typography size={'medium'}>
              {dispatcherSign.createdAt &&
                dayjs(+dispatcherSign.createdAt).format(
                  'DD.MM.YYYY HH:mm',
                )}
            </Typography>
          </div>
          <H5>
            Подписано диспетчером {dispatcherSign?.createdByFullName}
          </H5>
          <P>{`Комментарий диспетчера: ${dispatcherSign.properties?.dispatcherComment}`}</P>
        </div>
      )}

      {status === TaskStatusesEnum.CompletedWithoutPerformer &&
        dispatcherSign && (
          <div className={classNames(styles.column, styles.content)}>
            <div className={classNames(styles.row)}>
              <StatusColumn
                status={TaskStatusesEnum.CompletedWithoutPerformer}
                className={styles.status}
              />
              <Typography size={'medium'}>
                {dispatcherSign.createdAt &&
                  dayjs(+dispatcherSign.createdAt).format(
                    'DD.MM.YYYY HH:mm',
                  )}
              </Typography>
            </div>
            <H5>
              Подписано диспетчером{' '}
              {dispatcherSign?.createdByFullName}
            </H5>
            <P>{`Комментарий диспетчера: ${dispatcherSign.properties?.dispatcherComment}`}</P>
          </div>
        )}

      {status === TaskStatusesEnum.Canceled && (
        <div className={classNames(styles.column, styles.content)}>
          <div className={classNames(styles.row)}>
            <StatusColumn
              status={TaskStatusesEnum.Canceled}
              className={styles.status}
            />
          </div>
          {formValues?.properties?.serviceCancellationReason && (
            <>
              <H5>Отменено</H5>
              <P>{`Комментарий: ${formValues?.properties?.serviceCancellationReason}`}</P>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TenderSignature;
