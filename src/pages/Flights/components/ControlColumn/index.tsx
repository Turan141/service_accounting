// Core
import React from 'react';

// Styles
import styles from './ControlColumn.module.scss';

// Components
import { Icon, Menu, P } from 'react-lib';

interface IControlColumnProps {
  data: any;
  onSet?: () => void;
  setId?: (id: number) => void;
}

const ControlColumn: React.FC<IControlColumnProps> = ({
  data,
  onSet,
  setId,
}) => {
  const trigger = React.useMemo(
    () => (
      <span className={styles.button}>
        {' '}
        <i className='icon-more-circle' />{' '}
      </span>
    ),
    [],
  );

  const handleClick = () => {
    setId && setId(data?.userProfileId);
    onSet && onSet();
  };

  return (
    <Menu trigger={trigger} position='bottom right'>
      <Menu.Item
        icon={<Icon name='edit' />}
        className={styles.item}
        onClick={handleClick}
      >
        {' '}
        <P size='large'>Подписать</P>{' '}
      </Menu.Item>
      <Menu.Item
        icon={<Icon name='interactionList' />}
        className={styles.item}
        onClick={handleClick}
      >
        {' '}
        <P size='large'>Подробнее</P>{' '}
      </Menu.Item>
      <Menu.Item
        icon={<Icon name='download' />}
        className={styles.item}
        // onClick={handleEdit}
      >
        {' '}
        <P size='large'>Уточнение</P>{' '}
      </Menu.Item>
    </Menu>
  );
};

// Exports
export default ControlColumn;
