import React from 'react';
import styles from './StatusColumn.module.scss';
import { Icon, P } from 'react-lib';
import classNames from 'classnames';

interface StatusColumnProps {
  className?: string;
  status: string;
  customText?: string;
}


export enum TaskStatusesEnum {
  New = 'new',
  Confirmed = 'confirmed',
  Canceled = 'canceled',
  ConfirmedPerformer = 'confirmedPerformer',
  Started = 'started',
  CompletedWithoutSignature = 'completedWithoutSignature',
  Completed = 'completed',
  Verified = 'verified',
  Rejected = 'rejected',
  ManualVerification = "manualVerification",
  CompletedWithoutPerformer = "completedWithoutPerformer",
  CompletedFromDispatcher = 'completedFromDispatcher',
}

const StatusColumn: React.FC<StatusColumnProps> = ({
  status,
  customText,
  className,
}) => {
  switch (status) {
    case TaskStatusesEnum.New:
      return (
        <span className={classNames(styles.statusColumn, className)}>
          <Icon
            name={'statusClock'}
            className={classNames(styles.icon, styles.blue)}
          />
          Новая
        </span>
      );

    case TaskStatusesEnum.Confirmed:
      return (
        <span className={classNames(styles.statusColumn, className)}>
          <Icon name={'statusClock'} className={styles.icon} />
          Подтверждена
        </span>
      );

    case TaskStatusesEnum.Completed:
      return (
        <span className={classNames(styles.statusColumn, className)}>
          <Icon name={'statusDone'} className={classNames(styles.icon)} />
          Выполнено
          <P>{customText}</P>
        </span>
      );

    case TaskStatusesEnum.CompletedWithoutSignature:
      return (
        <span className={classNames(styles.statusColumn, className)}>
          <Icon name={'statusDraft'} className={styles.icon} />
          Выполнено. Ожидает подписи
        </span>
      );

    case TaskStatusesEnum.Started:
      return (
        <span className={classNames(styles.statusColumn, className)}>
          <Icon name={'statusDraft'} className={styles.icon} />
          Приступили к выполнению
        </span>
      );

    case TaskStatusesEnum.Canceled:
      return (
        <span className={classNames(styles.statusColumn, className)}>
          <Icon name={'statusBlock'} className={styles.icon} />
          Отменена
        </span>
      );

    case TaskStatusesEnum.ConfirmedPerformer:
      return (
        <span className={classNames(styles.statusColumn, className)}>
          <Icon name={'statusUser'} className={styles.icon} />
          Взято в работу
        </span>
      );

    case TaskStatusesEnum.Rejected:
      return (
        <span className={classNames(styles.statusColumn, className)}>
          <Icon name={'close'} className={styles.icon} />
         Отклонено
        </span>
      );

    case TaskStatusesEnum.Verified:
      return (
        <span className={classNames(styles.statusColumn, className)}>
          <Icon name={'agreed'} className={styles.icon} />
          Проверено
        </span>
      );

    case TaskStatusesEnum.ManualVerification:
      return (
        <span className={classNames(styles.statusColumn, className)}>
          <Icon name={'eye'} className={styles.icon} />
          Нуждается в ручной проверке!
        </span>
      );

      case TaskStatusesEnum.CompletedFromDispatcher:
        return (
          <span className={classNames(styles.statusColumn, className)}>
          <Icon name={'statusDone'} className={classNames(styles.icon)} />
          Выполнено
          <P>{customText}</P>
        </span>
        );

        case TaskStatusesEnum.CompletedWithoutPerformer:
          return (
            <span className={classNames(styles.statusColumn, className)}>
            <Icon name={'statusDone'} className={classNames(styles.icon)} />
            Выполнено
            <P>{customText}</P>
          </span>
          );

    default:
      return <span className={className}>Не заполнено</span>;
  }
};

export default StatusColumn;
