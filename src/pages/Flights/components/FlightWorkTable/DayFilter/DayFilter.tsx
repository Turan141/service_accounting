import { format } from 'date-fns';
import React, { useState } from 'react';
import { Icon } from 'react-lib';
import { useDispatch } from 'react-redux';
import { change, reduxForm } from 'redux-form';
import styles from './DayFilter.module.scss';

const DayFilter = () => {
  const [actualDay, setActualDay] = useState('Сегодня');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const getRequiredDate = (day: any) => {
    let today = new Date();
    let exactDay = new Date(today) as any;
    switch (day) {
      case 'Все':
        exactDay = ' ';
        break;
      case 'Вчера':
        exactDay = format(
          exactDay.setDate(exactDay.getDate() - 1),
          `yyyy-MM-dd`,
        );
        break;
      case 'Сегодня':
        exactDay = format(
          exactDay.setDate(exactDay.getDate()),
          `yyyy-MM-dd`,
        );
        break;
      case 'Завтра':
        exactDay = format(
          exactDay.setDate(exactDay.getDate() + 1),
          `yyyy-MM-dd`,
        );
        break;
      case 'Послезавтра':
        exactDay = format(
          exactDay.setDate(exactDay.getDate() + 2),
          `yyyy-MM-dd`,
        );
        break;
      default:
        exactDay = '';
        break;
    }
    return exactDay;
  };

  const changeActualDay = (day: any) => {
    setIsLoading(true);
    dispatch(
      change(
        'FilterByDay',
        'flightDate',
        getRequiredDate(day),
        false,
        false,
      ),
    );
    setActualDay(day);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };
  return (
    <>
      {isLoading ? (
        <div className={styles.spinner}>
          <div className={styles.bounce1}></div>
          <div className={styles.bounce2}></div>
          <div className={styles.bounce3}></div>
        </div>
      ) : (
        <div className={styles.MainButtons}>
          <div className={styles.first}>
            <p>{actualDay}</p>
            <Icon name='chevronRight' />
          </div>
          <div className={styles.second}>
            <button onClick={() => changeActualDay('Все')}>
              Все
            </button>
            <button onClick={() => changeActualDay('Вчера')}>
              Вчера
            </button>
            <button onClick={() => changeActualDay('Сегодня')}>
              Сегодня
            </button>
            <button onClick={() => changeActualDay('Завтра')}>
              Завтра
            </button>
            <button onClick={() => changeActualDay('Послезавтра')}>
              Послезавтра
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default reduxForm({
  form: 'FilterByDay',
  initialValues: {},
  destroyOnUnmount: true,
  // onChange: onChange,
})(DayFilter);
