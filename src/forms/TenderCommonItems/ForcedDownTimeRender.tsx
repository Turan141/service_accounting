import { format } from 'date-fns';
import React from 'react';
import { Icon, Input } from 'react-lib';
import styles from '@src/forms/ServicesDataForm/ServiceCard/ServiceCard.module.scss';

type ForcedDownTimeRenderProps = {
  completedTime: number;
  startedTime: number;
  properties: any;
};

export const ForcedDownTimeRender: React.FC<ForcedDownTimeRenderProps> = ({
  completedTime,
  startedTime,
  properties,
}) => {
  return (
    <>
      <div className={styles.col}>
        <Input
          prefix={<Icon name={'time'} />}
          label='Простой (мин.)'
          value={+Math.ceil((+completedTime - +startedTime) / 60000)}
        />
      </div>
      {/* <div className={styles.col}>
        <Input
          prefix={<Icon name={'time'} />}
          label='Продолжительность (мин.)'
          value={
            properties?.completed
              ? +Math.ceil(
                  (properties?.completed - properties?.started) / 60000
                )
              : '0'
          }
        />
      </div> */}
    </>
  );
};
