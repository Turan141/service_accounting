import React from 'react';
import {
  statuses,
  statusesByName,
} from '@pages/Flights/Applications/data';
import { Icon } from 'react-lib';
import styles from './StatusChangeNoti.module.scss';

interface statusProps {
  documentNumber: string;
  status: string;
}

export const StatusChangeNotificitaion: React.FC<statusProps> = ({
  documentNumber,
  status,
}) => {
  return (
    <div className={styles.notificationPopup}>
      <div className={styles.notificationPopup__icon}>
        {status === 'confirmed' || status === 'new' ? (
          <Icon name='addCircleBlue' />
        ) : status === 'rejected' || status === 'canceled' ? (
          <Icon name='statusWarning' />
        ) : (
          <Icon name='edit' />
        )}
      </div>
      <div className={styles.notificationPopup__text}>
        {status === 'confirmed' ? (
          <h1>Заявка №{documentNumber} успешно создана.</h1>
        ) : (
          <h1>
            Статус заявки №{documentNumber} был изменён на статус '
            {statusesByName(status)}'
          </h1>
        )}
      </div>
    </div>
  );
};
