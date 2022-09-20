//Core
import classNames from 'classnames';
import React, { FC } from 'react';
import { Icon } from 'react-lib';

//Styles
import styles from './AttentionAlert.module.scss';

interface ITextAlertProps {
  text: string;
  className?: string;
}

const AttentionAlert: FC<ITextAlertProps> = ({ text, className }) => {
  return (
    <div className={classNames(styles.attention, className)}>
      <Icon name={'statusWarning'} />
      <p className={styles.alertTxt}>{text}</p>
    </div>
  );
};

export default AttentionAlert;
