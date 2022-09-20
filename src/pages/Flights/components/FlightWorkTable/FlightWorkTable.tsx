//Core
import React, { useCallback, useMemo } from 'react';
import { useFlexLayout } from 'react-table';
import { useDispatch, useSelector } from 'react-redux';
import { flightsActions } from '@bus/flights/actions';
import { usePagedContent } from '@helpers/usePagedContent';
import {
  getFlights,
  getFlightsError,
  getFlightsLoading,
} from '@bus/flights/selectors';

//Components
import { Icon, Pagination, Table, TablePreloader, useModal } from 'react-lib';
import TransferButton from '@pages/Flights/components/TransferButton/TransferButton';
import ServicesModal from '@pages/Flights/components/ServicesModal/ServicesModal';
import Tko from '@pages/Flights/FlightWork/TKO/TKO';

//Styles
import styles from './FlightWorkTable.module.scss';

//Dayjs
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { checkAccess } from '@helpers/utils';

const FlightWorkTable: React.FC = () => {
  const { openModal } = useModal();

  dayjs.extend(utc);
  dayjs.extend(customParseFormat);

  const openServicesModal = React.useCallback((id: number) => {
    openModal(ServicesModal, { id });
  }, []);

  const dispatch = useDispatch();
  const fetch = useCallback(
    () =>
      dispatch(
        flightsActions.fetch_flights_async({
          url: '/clients/References/Flights/Find',
          method: 'POST',
          params: {},
        }),
      ),
    [],
  );

  const { data, page, total, setCountInPage, setPage, countInPage } =
    usePagedContent(fetch, getFlights);
  const isLoading = useSelector(getFlightsLoading);
  const isError = useSelector(getFlightsError);

  const renderContent = () => {
    if (data && !isLoading)
    console.log(data)
      return (
        <>
          {data?.items?.map((item: any) => (
            <div key={item.id} className={styles.executor}>
              <div className={styles.header}>
                <span className={styles.id}>ID {item.id}</span>

                <span className={styles.assign}>
                  <Icon name={'addCircle'} /> Виды ТКО
                </span>
                {checkAccess(['0', '4']) && item?.mainTKO ? (
                  <TransferButton
                    triggerElement={
                      <span className={styles.assign}>
                        <Icon className={styles.agreed} name={'agreed'} />{' '}
                        Изменить исполнителя
                      </span>
                    }
                    flight={item}
                    position={'bottom left'}
                    submitButton={'Добавить'}
                    isChange={true}
                  />
                ) : (
                  <TransferButton
                    triggerElement={
                      <span className={styles.assign}>
                        <Icon className={styles.agreed} name={'agreed'} />{' '}
                        Назначить исполнителя
                      </span>
                    }
                    flight={item}
                    position={'bottom left'}
                    submitButton={'Добавить'}
                  />
                )}
                {checkAccess(['0']) && (
                  <Tko
                    triggerElement={
                      <span className={styles.assign}>
                        <Icon name={'addCircle'} /> Добавить ТКО
                      </span>
                    }
                    flight={item}
                  />
                )}
              </div>
              <div
                onClick={() => openServicesModal(item?.id)}
                className={styles.entry}
              >
                <Table
                  className={styles.table}
                  data={[item]}
                  columns={columns}
                  tableHooks={[useFlexLayout]}
                />
                <Table
                  className={styles.table}
                  data={[item]}
                  columns={column2}
                  tableHooks={[useFlexLayout]}
                />
                <Table
                  className={styles.table}
                  data={[item]}
                  columns={column3}
                  tableHooks={[useFlexLayout]}
                />
              </div>
            </div>
          ))}
          {/* <Pagination
            total={total}
            countInPage={countInPage}
            page={page}
            setCountInPage={setCountInPage}
            setPage={setPage}
          /> */}
        </>
      );
    if (isError)
      return <span>{'Ошибка загрузки данных. Попробуйте снова.'}</span>;
    return <TablePreloader columns={5} />;
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Дата рейса:',
        accessor: 'flightDate',
        Cell: ({ value }: any) => dayjs.utc(value).format('DD.MM.YYYY'),
      },
      {
        Header: '№ рейса:',
        accessor: 'numberOfFlight',
      },
      {
        Header: 'Направление:',
        accessor: 'direction',
      },
      {
        Header: 'Маршрут:',
        accessor: 'route',
      },

      {
        Header: 'Код АК:',
        accessor: 'codeAC',
      },
      {
        Header: 'Заказчик:',
        accessor: 'client',
      },
      {
        Header: 'Борт:',
        accessor: 'airplane',
      },
      {
        Header: 'Статус:',
        accessor: 'historyStatus',
      },
      {
        Header: 'Категория',
        accessor: 'flightCategory',
      },
      {
        Header: 'Тип',
        accessor: 'flightType',
      },
    ],
    [],
  );

  const column2 = useMemo(
    () => [
      {
        Header: 'Обслуживание:',
        accessor: 'serviceFlight',
      },
      {
        Header: 'STD:',
        accessor: 'std',
        Cell: ({ value }: any) => dayjs.utc(value).format('DD.MM.YYYY'),
      },
      {
        Header: 'ETD:',
        accessor: 'etd',
        Cell: ({ value }: any) => dayjs.utc(value).format('DD.MM.YYYY'),
      },
      {
        Header: 'ATD:',
        accessor: 'atd',
        Cell: ({ value }: any) => dayjs.utc(value).format('DD.MM.YYYY'),
      },
      {
        Header: 'ETA:',
        accessor: 'eta',
        Cell: ({ value }: any) => dayjs.utc(value).format('DD.MM.YYYY'),
      },
      {
        Header: 'ATA:',
        accessor: 'ata',
        Cell: ({ value }: any) => dayjs.utc(value).format('DD.MM.YYYY'),
      },
      {
        Header: 'ТИП ВС:',
        accessor: 'airplaneType',
      },
      {
        Header: 'Стоянка:',
        accessor: 'parkingNumber',
      },
      {
        Header: 'Терминал:',
        accessor: 'platform',
      },
      {
        Header: 'Выход:',
        accessor: 'exit',
      },
    ],
    [],
  );

  const column3 = useMemo(
    () => [
      {
        Header: 'Инфо:',
        accessor: 'informationUTG',
      },
      {
        Header: 'Ошибка:',
        accessor: 'error',
      },
      {
        Header: '№ полный:',
        accessor: 'fullNumberOfFlight',
      },
      {
        Header: 'ЗдАп:',
        accessor: 'zdUp',
      },

      {
        Header: 'ЗдUTG:',
        accessor: 'zdUtg',
      },
      {
        Header: 'ПР:',
        accessor: 'PR',
      },
      {
        Header: 'M:',
        accessor: 'm',
      },
    ],
    [],
  );

  return renderContent();
};

export default FlightWorkTable;
