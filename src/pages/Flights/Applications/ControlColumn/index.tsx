// Core
import React, { useCallback, useState } from 'react';
import { initialize } from 'redux-form';

// Styles
import styles from './ControlColumn.module.scss';

// Components
import { Icon, P, useModal, Menu } from 'react-lib';
import TenderModal from '@components/TenderModal/TenderModal';
import CreateTenderModal from '@src/components/CreateTenderModal/CreateTenderModal';

// Types
import { DocumentView } from '@typings/swagger/api';
import { useDispatch } from 'react-redux';

interface IControlColumnProps {
  data: DocumentView;
  onSet?: () => void;
  setId?: (id: number) => void;
  reload?: () => void;
}

const ControlColumn: React.FC<IControlColumnProps> = ({
  data,
  onSet,
  setId,
  reload,
}) => {
  const trigger = React.useMemo(
    () => (
      <div className={styles.button}>
        <i className='icon-more-circle' />
      </div>
    ),
    [],
  );
  const { openModal } = useModal();
  const dispatch = useDispatch();

  const handleClick = () => {
    openModal(TenderModal, { data, reload });
  };

  const initialStateForCopy = {
    aircraft: data?.aircraftReference,
    aircraftName: data?.aircraftName,
    company: data?.company,
    aircraftType: data?.aircraftType,
    customer: {
      ...data.customerReference,
      parentMasterCode: 'Customers',
    },
    customerReference: {
      ...data.customerReference,
      parentMasterCode: 'Customers',
    },
    flight: data?.items?.find(
      (item: any) => item.type === 'anyServiceFlight',
    )?.additionalInfo,
  };

  const openTenderModalOnExisting = () => {
    dispatch(initialize('TenderForm', initialStateForCopy));
    openModal(CreateTenderModal, { data, reload });
  };

  return (
    <Menu
      className={styles.menu}
      trigger={trigger}
      position='bottom right'
    >
      <Menu.Item
        icon={<Icon name='interactionList' />}
        className={styles.item}
        onClick={handleClick}
      >
        <P size='large'>Подробнее</P>{' '}
      </Menu.Item>

      {/* <Menu.Item
        icon={<Icon name='messageProfile' />}
        className={styles.item}
        onClick={handleClick}
      >
        {' '}
        <P size='large'>Уточнение</P>{' '}
      </Menu.Item> */}
      <Menu.Item
        icon={<Icon name='addCircle' />}
        className={styles.item}
        onClick={openTenderModalOnExisting}
      >
        {' '}
        <P size='large'>Добавить заявку к этому же ВС</P>{' '}
      </Menu.Item>
    </Menu>
  );
};

// Exports
export default ControlColumn;
