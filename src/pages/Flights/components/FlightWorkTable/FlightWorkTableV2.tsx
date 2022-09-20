//Core
import React, { useCallback, useMemo } from 'react';
import { useFlexLayout } from 'react-table';
import { useDispatch, useSelector } from 'react-redux';
import { flightsActions } from '@bus/flights/actions';
import {
  getFlights,
  getFlightsError,
  getFlightsLoading,
} from '@bus/flights/selectors';

//Components
import { useModal } from 'react-lib';

//Styles
import styles from './FlightWorkTable.module.scss';
import takeoff from '../../../../assets/icons/takeoff.svg';
import land from '../../../../assets/icons/land.svg';
import direction from '../../../../assets/icons/direction.svg';

//Dayjs
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ServicesModalV2 from '../ServicesModal/ServicesModalV2';
import TableInfiniteScroll from '@components/TableInfiniteScroll';
import useInfiniteContent from '@helpers/useInfiniteContent';
import { DictionaryFilterProps } from '@api/dictionaryApi';
import DayFilter from './DayFilter/DayFilter';
import { getFormValues } from 'redux-form';
import { format } from 'date-fns';
import moment from 'moment';

const FlightWorkTableV2: React.FC = () => {
  const { openModal } = useModal();

  const filterByDay: any = useSelector((state) =>
    getFormValues('FilterByDay')(state),
  );

  console.log(filterByDay);

  dayjs.extend(utc);
  dayjs.extend(customParseFormat);

  const openServicesModal = React.useCallback((flightData: any) => {
    console.log(flightData);
    openModal(ServicesModalV2, { flightData });
  }, []);

  const dispatch = useDispatch();

  let today = new Date();

  const fetch = useCallback(
    (takeSkip: DictionaryFilterProps) =>
      dispatch(
        flightsActions.fetch_flights_async({
          ...takeSkip,
          sortDirection: 1,
          sortField: 'St',
          flightDate: filterByDay?.flightDate
            ? filterByDay?.flightDate
            : format(today.setDate(today.getDate()), `yyyy-MM-dd`),
        }),
      ),
    [filterByDay?.flightDate, dispatch],
  );

  let { data, fetchMore, hasMore, reload } = useInfiniteContent(
    fetch,
    getFlights,
    flightsActions.reset_flights,
  );
  const isLoading = useSelector(getFlightsLoading);
  const isError = useSelector(getFlightsError);
  console.log(data);

  const valueWithoutZHandler = (value: any) => {
    let valueWithoutZ = null;
    if (value.charAt(value.length - 1) === 'Z') {
      valueWithoutZ = value.slice(0, -5);
      return new Date(valueWithoutZ);
    } else return new Date(value);
  };

  const columns = useMemo(
    () => [
      {
        accessor: 'direction',
        width: 20,
        Cell: (data: any) => {
          return (
            <div className={styles.airplane}>
              {data?.row?.original?.direction === '0' && (
                <img
                  src={takeoff}
                  width='20px'
                  height='25px'
                  alt='takeoff'
                />
              )}
              {data?.row?.original?.direction === '1' && (
                <img
                  src={land}
                  width='20px'
                  height='25px'
                  alt='land'
                />
              )}
            </div>
          );
        },
      },
      {
        Header: 'Дата рейса:',
        accessor: 'st',
        width: 60,
        Cell: ({ value }: any) => {
          return (
            <div className={styles.td}>
              {value
                ? format(valueWithoutZHandler(value), `dd.MM HH:mm`)
                : ''}
              {/* {value ? value : ''} */}
              {/* {value ? format(d, `dd.MM HH:mm`) : ''} */}
            </div>
          );
        },
      },
      {
        Header: '№ рейса:',
        accessor: 'flightNumber',
        width: 55,

        Cell: ({ value }: any) => {
          return <div className={styles.td}>{value}</div>;
        },
      },
      {
        Header: <img src={takeoff} alt='takeoff' />,
        accessor: 'departureAirport',
        width: 40,
        style: { color: 'red' },
        Cell: ({ value }: any) => {
          return <div className={styles.td}>{value}</div>;
        },
      },
      {
        Header: <img src={land} alt='land' />,
        accessor: 'arrivalAirport',
        width: 40,
        Cell: ({ value }: any) => {
          return <div className={styles.td}>{value}</div>;
        },
      },
      //test data
      {
        Header: 'АК:',
        accessor: 'company',
        width: 40,
        Cell: ({ value }: any) => {
          return <div className={styles.td}>{value}</div>;
        },
      },
      // {
      //   Header: 'Заказчик:',
      //   accessor: 'properties.company',
      //   width: 50,
      //   Cell: ({ value }: any) => {
      //     return <div className={styles.td}>{value}</div>;
      //   },
      // },
      {
        Header: 'Борт:',
        accessor: 'airplane',
        width: 50,
        Cell: ({ value }: any) => {
          return (
            <div
              // style={{ textAlign: 'center' }}
              className={styles.td}
            >
              {value}
            </div>
          );
        },
      },
      {
        Header: 'Статус:',
        accessor: 'status',
        width: 45,
        Cell: ({ value }: any) => {
          return <div className={styles.td}>{value}</div>;
        },
      },
      {
        Header: 'Тип:',
        accessor: 'handlingTypeID',
        width: 45,
        Cell: ({ value }: any) => {
          return <div className={styles.td}>{value}</div>;
        },
      },
      {
        Header: 'Катег:',
        accessor: 'flightCategory',
        width: 45,
        Cell: ({ value }: any) => {
          return <div className={styles.td}>{value}</div>;
        },
      },
      {
        Header: 'STD:',
        width: 50,
        Cell: (data: any) => {
          const flightDirection = data?.row?.original?.direction;
          const flsSt = data?.row?.original?.flsSt;
          return (
            <div className={styles.td}>
              {flightDirection === '0' && flsSt
                ? format(valueWithoutZHandler(flsSt), `HH:mm`)
                : flightDirection === '1' && data?.row?.original?.st
                ? format(
                    valueWithoutZHandler(data?.row?.original?.st),
                    `HH:mm`,
                  )
                : ''}
            </div>
          );
        },
      },
      {
        Header: 'ETD:',
        width: 50,
        Cell: (data: any) => {
          const flightDirection = data?.row?.original?.direction;
          const flsEt = data?.row?.original?.flsEt;
          return (
            <div className={styles.td}>
              {flightDirection === '0' && flsEt
                ? format(valueWithoutZHandler(flsEt), `HH:mm`)
                : flightDirection === '1' && data?.row?.original?.et
                ? format(
                    valueWithoutZHandler(data?.row?.original?.et),
                    `HH:mm`,
                  )
                : ''}
            </div>
          );
        },
      },
      {
        Header: 'ATD:',
        width: 50,
        Cell: (data: any) => {
          const flightDirection = data?.row?.original?.direction;
          const flsAt = data?.row?.original?.flsAt;
          return (
            <div className={styles.td}>
              {flightDirection === '0' && flsAt
                ? format(valueWithoutZHandler(flsAt), `HH:mm`)
                : flightDirection === '1' && data?.row?.original?.at
                ? format(
                    valueWithoutZHandler(data?.row?.original?.at),
                    `HH:mm`,
                  )
                : ''}
            </div>
          );
        },
      },
      {
        Header: 'STA:',
        width: 50,
        Cell: (data: any) => {
          const flightDirection = data?.row?.original?.direction;
          return (
            <div className={styles.td}>
              {flightDirection === '0' && data?.row?.original?.st
                ? format(
                    valueWithoutZHandler(data?.row?.original?.st),
                    `HH:mm`,
                  )
                : flightDirection === '1' &&
                  data?.row?.original?.flsSt
                ? format(
                    valueWithoutZHandler(data?.row?.original?.flsSt),
                    `HH:mm`,
                  )
                : ''}
            </div>
          );
        },
      },
      {
        Header: 'ETA:',
        width: 50,
        Cell: (data: any) => {
          const flightDirection = data?.row?.original?.direction;
          return (
            <div className={styles.td}>
              {flightDirection === '0' && data?.row?.original?.et
                ? format(
                    valueWithoutZHandler(data?.row?.original?.et),
                    `HH:mm`,
                  )
                : flightDirection === '1' &&
                  data?.row?.original?.flsEt
                ? format(
                    valueWithoutZHandler(data?.row?.original?.flsEt),
                    `HH:mm`,
                  )
                : ''}
            </div>
          );
        },
      },
      {
        Header: 'ATA:',
        width: 50,
        Cell: (data: any) => {
          const flightDirection = data?.row?.original?.direction;
          return (
            <div className={styles.td}>
              {flightDirection === '0' && data?.row?.original?.at
                ? format(
                    valueWithoutZHandler(data?.row?.original?.at),
                    `HH:mm`,
                  )
                : flightDirection === '1' &&
                  data?.row?.original?.flsAt
                ? format(
                    valueWithoutZHandler(data?.row?.original?.flsAt),
                    `HH:mm`,
                  )
                : ''}
            </div>
          );
        },
      },
      {
        Header: 'Тип ВС:',
        accessor: 'flightType',
        width: 65,
        Cell: ({ value }: any) => {
          return <div className={styles.td}>{value}</div>;
        },
      },
      {
        Header: 'Стоянка:',
        accessor: 'post',
        width: 65,
        Cell: ({ value }: any) => {
          return <div className={styles.td}>{value}</div>;
        },
      },
      {
        Header: 'Терм.:',
        accessor: 'terminal',
        width: 45,
        Cell: ({ value }: any) => {
          return <div className={styles.td}>{value}</div>;
        },
      },
      {
        Header: 'Выход:',
        accessor: 'exitgate',
        width: 65,
        Cell: ({ value }: any) => {
          return <div className={styles.td}>{value}</div>;
        },
      },

      {
        Header: 'ЗдАп:',
        accessor: 'delayCode',
        width: 40,
        Cell: ({ value }: any) => {
          return (
            <div className={styles.td}>
              {value.replace(/\D/g, '')}
            </div>
          );
        },
      },
    ],
    [],
  );

  return (
    <>
      <div className={styles.scroll}>
        {!data.length && isLoading ? (
          <div className={styles.flightSpinner}>
            <svg
              className={styles.svgCalLoader}
              xmlns='http://www.w3.org/2000/svg'
              width='230'
              height='230'
            >
              <path
                className={styles.calLoaderPath}
                d='M86.429 40c63.616-20.04 101.511 25.08 107.265 61.93 6.487 41.54-18.593 76.99-50.6 87.643-59.46 19.791-101.262-23.577-107.142-62.616C29.398 83.441 59.945 48.343 86.43 40z'
                fill='none'
                stroke='#0099cc'
                strokeWidth='4'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeDasharray='10 10 10 10 10 10 10 432'
                strokeDashoffset='77'
              />
              <path
                className={styles.calLoaderPlane}
                d='M141.493 37.93c-1.087-.927-2.942-2.002-4.32-2.501-2.259-.824-3.252-.955-9.293-1.172-4.017-.146-5.197-.23-5.47-.37-.766-.407-1.526-1.448-7.114-9.773-4.8-7.145-5.344-7.914-6.327-8.976-1.214-1.306-1.396-1.378-3.79-1.473-1.036-.04-2-.043-2.153-.002-.353.1-.87.586-1 .952-.139.399-.076.71.431 2.22.241.72 1.029 3.386 1.742 5.918 1.644 5.844 2.378 8.343 2.863 9.705.206.601.33 1.1.275 1.125-.24.097-10.56 1.066-11.014 1.032a3.532 3.532 0 0 1-1.002-.276l-.487-.246-2.044-2.613c-2.234-2.87-2.228-2.864-3.35-3.309-.717-.287-2.82-.386-3.276-.163-.457.237-.727.644-.737 1.152-.018.39.167.805 1.916 4.373 1.06 2.166 1.964 4.083 1.998 4.27.04.179.004.521-.076.75-.093.228-1.109 2.064-2.269 4.088-1.921 3.34-2.11 3.711-2.123 4.107-.008.25.061.557.168.725.328.512.72.644 1.966.676 1.32.029 2.352-.236 3.05-.762.222-.171 1.275-1.313 2.412-2.611 1.918-2.185 2.048-2.32 2.45-2.505.241-.111.601-.232.82-.271.267-.058 2.213.201 5.912.8 3.036.48 5.525.894 5.518.914 0 .026-.121.306-.27.638-.54 1.198-1.515 3.842-3.35 9.021-1.029 2.913-2.107 5.897-2.4 6.62-.703 1.748-.725 1.833-.594 2.286.137.46.45.833.872 1.012.41.177 3.823.24 4.37.085.852-.25 1.44-.688 2.312-1.724 1.166-1.39 3.169-3.948 6.771-8.661 5.8-7.583 6.561-8.49 7.387-8.702.233-.065 2.828-.056 5.784.011 5.827.138 6.64.09 8.62-.5 2.24-.67 4.035-1.65 5.517-3.016 1.136-1.054 1.135-1.014.207-1.962-.357-.38-.767-.777-.902-.893z'
                fill='#000033'
              />
            </svg>
          </div>
        ) : data.length ? (
          <div className={styles.tableDiv}>
            <TableInfiniteScroll
              handleClick={openServicesModal}
              next={fetchMore}
              hasMore={hasMore}
              className={styles.table}
              data={data}
              columns={columns}
              tableHooks={[useFlexLayout]}
              loading={isLoading}
            />
          </div>
        ) : isError ? (
          <h1>Что-то пошло не так</h1>
        ) : !data.length && !isLoading ? (
          <div>
            <h1>Ничего не найдено</h1>
          </div>
        ) : (
          <div>
            <h1>Что-то пошло не так</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default FlightWorkTableV2;
