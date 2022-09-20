import { Icon, useDebounceSelector, useModal } from 'react-lib';
import sls from '@pages/Flights/Applications/ApplicationsTable/ApplicationsTable.module.scss';
import { useFlexLayout } from 'react-table';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import dayjs from 'dayjs';
import StatusColumn, {
  TaskStatusesEnum,
} from '@pages/Flights/components/StatusColumn/StatusColumn';
import ControlColumn from '@pages/Flights/Applications/ControlColumn';
import {
  getTenders,
  getTendersLoading,
} from '@bus/tenders/selectors';
import { tendersActions } from '@bus/tenders/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getFormValues } from 'redux-form';
import { DictionaryFilterProps } from '@api/dictionaryApi';
import TenderModal from '@components/TenderModal/TenderModal';
import { DocumentView } from '@typings/swagger/api';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { StatusChangeNotificitaion } from '@components/StatusChangeNotification/StatusChangeNotifiication';
import DocumentApi from '@src/api/documentApi';
import ConfirmModal from '@src/components/ConfirmModal/ConfirmModal';
import useInfiniteContent from '@helpers/useInfiniteContent';
import TableInfiniteScroll from '@components/TableInfiniteScroll';

interface changedDocumentData {
  documentNumber: string;
  status: string;
}

const ApplicationsTable: React.FC = ({}) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const { openModal } = useModal();

  const filterValues: any = useDebounceSelector((state) =>
    getFormValues('applicationsFilter')(state),
  );

  const search: any = useDebounceSelector(
    (state) => getFormValues('tendersSearch')(state),
    undefined,
    500,
  );

  const fetch = React.useCallback(
    (takeSkip: DictionaryFilterProps) => {
      const valuesRangeFilter = [];

      if (filterValues?.started) {
        valuesRangeFilter.push({
          name: 'started',
          from: new Date(filterValues?.started).valueOf().toString(),
          to: Date.now().valueOf().toString(),
        });
      }

      if (filterValues?.completed) {
        valuesRangeFilter.push({
          name: 'completed',
          from: '0',
          to: new Date(filterValues?.completed).valueOf().toString(),
        });
      }

      if (filterValues?.startPlan) {
        valuesRangeFilter.push({
          name: 'startPlan',
          from: new Date(filterValues?.startPlan)
            .valueOf()
            .toString(),
          to: Date.now().valueOf().toString(),
        });
      }

      if (filterValues?.endPlan) {
        valuesRangeFilter.push({
          name: 'endPlan',
          from: '0',
          to: new Date(filterValues?.endPlan).valueOf().toString(),
        });
      }

      const tendersFilter = {
        filter: {
          number: filterValues?.number,
          statuses: filterValues?.statuses,
          valuesFilter: {
            serviceName: search?.search || '',
            company: filterValues?.company ?? undefined,
            service: filterValues?.service ?? undefined,
            aircraft: filterValues?.aircraft ?? undefined,
            customer: filterValues?.customer ?? undefined,
          },
          valuesRangeFilter: valuesRangeFilter ?? undefined,
        },
      };
      dispatch(
        tendersActions.fetchTendersAsync({
          setIsLoading,
          filter: {
            ...takeSkip,
            ...tendersFilter,
          },
        }),
      );
    },
    [filterValues, search],
  );

  const fetchOne = useCallback(async (id: number) => {
    return await DocumentApi.getTenderById(id);
  }, []);

  const loading = useSelector(getTendersLoading);

  console.log(loading);

  let { data, fetchMore, hasMore, reload, reloadOne, totalItems } =
    useInfiniteContent(
      fetch,
      getTenders,
      tendersActions.resetTendersTable,
      fetchOne,
      isLoading,
    );

  const handleClick = (data: DocumentView) => {
    openModal(TenderModal, { data, reload, reloadOne });
  };

  useEffect(() => {
    dispatch(tendersActions.resetTendersTable());
    const hubConnection = new HubConnectionBuilder()
      .withUrl(`${process.env.API_URL}/clients/documenteventshub`)
      .withAutomaticReconnect()
      .build();

    hubConnection
      .start()
      .then(() => {
        console.log('Connected by DNS');

        hubConnection.on('DocumentStatusChanged', (message) => {
          setStatusIs({
            documentNumber: message.documentNumber,
            status: message.status,
          });
          setTimeout(() => {
            setStatusIs(null);
          }, 5000);
          reloadOne(message.documentId);
        });
        hubConnection.on('DocumentUpdatedById', (message) => {
          reloadOne(message.documentId);
        });
        hubConnection.on('DocumentUpdatedByIdEvent', (message) => {
          reloadOne(message.documentId);
        });

        hubConnection.on('DocumentCreated', (message) => {
          reload();
        });

        hubConnection.on('DocumentLocked', (message) => {
          console.log(message);
          reloadOne(message.documentId);
        });
        hubConnection.on('DocumentUnLocked', (message) => {
          reloadOne(message.documentId);
        });
      })
      .catch((e) => console.log('Connection failed: ', e));

    return () => {
      hubConnection.stop().then(() => {
        console.log('disconnected');
      });
      // reset();
    };
  }, []);

  // const WSURL =

  useEffect(() => {
    console.log(process.env.API_URL);
    if (
      process.env.API_URL === 'https://clients.test.utg.group' ||
      process.env.API_URL === 'https://195.209.129.25:44392'
    ) {
      const hubConnectionIP = new HubConnectionBuilder()
        .withUrl(
          `https://195.209.129.25:44392/clients/documenteventshub`,
        )
        .withAutomaticReconnect()
        .build();

      hubConnectionIP
        .start()
        .then(() => {
          console.log('Connected by IP');

          hubConnectionIP.on('DocumentStatusChanged', (message) => {
            setStatusIs({
              documentNumber: message.documentNumber,
              status: message.status,
            });
            setTimeout(() => {
              setStatusIs(null);
            }, 5000);
            reloadOne(message.documentId);
          });
          hubConnectionIP.on('DocumentUpdatedById', (message) => {
            reloadOne(message.documentId);
          });
          hubConnectionIP.on(
            'DocumentUpdatedByIdEvent',
            (message) => {
              reloadOne(message.documentId);
            },
          );

          hubConnectionIP.on('DocumentCreated', (message) => {
            reload();
          });

          hubConnectionIP.on('DocumentLocked', (message) => {
            console.log(message);
            reloadOne(message.documentId);
          });
          hubConnectionIP.on('DocumentUnLocked', (message) => {
            reloadOne(message.documentId);
          });
        })
        .catch((e) => console.log('Connection failed: ', e));

      return () => {
        hubConnectionIP.stop().then(() => {
          console.log('disconnected');
        });
        // reset();
      };
    }
  }, []);

  useEffect(() => {
    console.log(process.env.API_URL);
    if (
      process.env.API_URL === 'https://clients.utg.group' ||
      process.env.API_URL === 'https://10.162.0.70:44392'
    ) {
      const hubConnectionIP = new HubConnectionBuilder()
        .withUrl(
          `https://10.162.0.70:44392/clients/documenteventshub`,
        )
        .withAutomaticReconnect()
        .build();

      hubConnectionIP
        .start()
        .then(() => {
          console.log('Connected by IP');

          hubConnectionIP.on('DocumentStatusChanged', (message) => {
            setStatusIs({
              documentNumber: message.documentNumber,
              status: message.status,
            });
            setTimeout(() => {
              setStatusIs(null);
            }, 5000);
            reloadOne(message.documentId);
          });
          hubConnectionIP.on('DocumentUpdatedById', (message) => {
            reloadOne(message.documentId);
          });
          hubConnectionIP.on(
            'DocumentUpdatedByIdEvent',
            (message) => {
              reloadOne(message.documentId);
            },
          );

          hubConnectionIP.on('DocumentCreated', (message) => {
            reload();
          });

          hubConnectionIP.on('DocumentLocked', (message) => {
            console.log(message);
            reloadOne(message.documentId);
          });
          hubConnectionIP.on('DocumentUnLocked', (message) => {
            reloadOne(message.documentId);
          });
        })
        .catch((e) => console.log('Connection failed: ', e));

      return () => {
        hubConnectionIP.stop().then(() => {
          console.log('disconnected');
        });
        // reset();
      };
    }
  }, []);

  const unlockAndReload = (id: any) => {
    DocumentApi.confirmAndUnlock(id);
    reloadOne(id);
  };

  const confirmUnlock = (id: any) => {
    console.log(id);
    openModal(ConfirmModal, {
      mode: 'unlock',
      buttonPressCallback: () => unlockAndReload(id),
    });
  };

  const [statusIs, setStatusIs] =
    useState<changedDocumentData | null>(null);

  const columns = useMemo(
    () => [
      {
        Header: `Номер заявки`,
        accessor: 'number',
        shouldUnlock: false,
        Cell: (data: any) => (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'left',
            }}
          >
            {data.row.original.lockState === 'lock' ? (
              <div className={sls.just}>
                <div
                  onClick={() => {
                    confirmUnlock(data.row.original.id);
                  }}
                  className={sls.icon}
                  data-title='Открыть доступ?'
                >
                  <Icon name={'lock'} />
                </div>
              </div>
            ) : (
              <div className={sls.blank}></div>
            )}
            <div className={sls.number}>
              {data.row.original.number}
            </div>
          </div>
        ),
      },
      {
        Header: 'Заказчик',
        accessor: 'customer',
        Cell: (data: any) => (
          <span
            className={
              data.row.original.lockState === 'lock'
                ? sls.lockedDoc
                : sls.serviceName
            }
            onClick={() => {
              console.log(data);
              data.row.original.lockState !== 'lock' &&
                handleClick(data.row.original);
            }}
          >
            {
              data?.row?.original?.customerReference?.properties
                ?.nameRu
            }
          </span>
        ),
      },
      {
        Header: 'Наименование',
        accessor: 'serviceName',
        Cell: (data: any) => (
          <span
            className={
              data.row.original.lockState === 'lock'
                ? sls.lockedDoc
                : sls.serviceName
            }
            onClick={() => {
              console.log(data);
              data.row.original.lockState !== 'lock' &&
                handleClick(data.row.original);
            }}
          >
            {data.row.original.serviceName}
          </span>
        ),
      },
      {
        Header: 'Дата создания..',
        accessor: 'createdAt',
        Cell: ({ value }: any) =>
          dayjs(value).local().format('DD.MM.YYYY'),
      },
      {
        Header: 'Время создания..',
        accessor: 'createdAtTime',
        Cell: (data: any) =>
          dayjs(+data.row.original.createdAt)
            .local()
            .format('HH:mm'),
      },
      {
        Header: 'Дата работы..',
        accessor: 'startPlanDate',
        Cell: (data: any) => {
          return dayjs(+data.row.original.startPlan)
            .local()
            .format('DD.MM.YYYY');
        },
      },
      {
        Header: 'Время начала',
        accessor: 'startPlan',
        Cell: (data: any) => {
          return (
            <span
              style={{
                color:
                  Date.now().valueOf() >=
                    +data.row.original.startPlan &&
                  [
                    TaskStatusesEnum.New,
                    TaskStatusesEnum.Confirmed,
                  ].some(
                    (value) => value === data.row.original.status,
                  )
                    ? '#C7002C'
                    : 'inherit',
              }}
            >
              {' '}
              {dayjs(+data.row.original.startPlan)
                .local()
                .format('HH:mm')}
            </span>
          );
        },
      },
      {
        Header: 'Время окончания',
        accessor: 'endPlan',
        Cell: ({ value }: any) => {
          return dayjs(+value)
            .local()
            .format('HH:mm');
        },
      },
      {
        Header: 'Статус',
        accessor: 'status',
        Cell: (data: any) => {
          return (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <StatusColumn status={data.value} />
              <div className={sls.more}>
                <ControlColumn
                  reload={reload}
                  data={data.row.original}
                />
              </div>
            </div>
          );
        },
      },
    ],
    [],
  );

  return (
    <div className={sls.scroll}>
      {!data.length && isLoading ? (
        <div className={sls.flightSpinner}>
          <svg
            className={sls.svgCalLoader}
            xmlns='http://www.w3.org/2000/svg'
            width='230'
            height='230'
          >
            <path
              className={sls.calLoaderPath}
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
              className={sls.calLoaderPlane}
              d='M141.493 37.93c-1.087-.927-2.942-2.002-4.32-2.501-2.259-.824-3.252-.955-9.293-1.172-4.017-.146-5.197-.23-5.47-.37-.766-.407-1.526-1.448-7.114-9.773-4.8-7.145-5.344-7.914-6.327-8.976-1.214-1.306-1.396-1.378-3.79-1.473-1.036-.04-2-.043-2.153-.002-.353.1-.87.586-1 .952-.139.399-.076.71.431 2.22.241.72 1.029 3.386 1.742 5.918 1.644 5.844 2.378 8.343 2.863 9.705.206.601.33 1.1.275 1.125-.24.097-10.56 1.066-11.014 1.032a3.532 3.532 0 0 1-1.002-.276l-.487-.246-2.044-2.613c-2.234-2.87-2.228-2.864-3.35-3.309-.717-.287-2.82-.386-3.276-.163-.457.237-.727.644-.737 1.152-.018.39.167.805 1.916 4.373 1.06 2.166 1.964 4.083 1.998 4.27.04.179.004.521-.076.75-.093.228-1.109 2.064-2.269 4.088-1.921 3.34-2.11 3.711-2.123 4.107-.008.25.061.557.168.725.328.512.72.644 1.966.676 1.32.029 2.352-.236 3.05-.762.222-.171 1.275-1.313 2.412-2.611 1.918-2.185 2.048-2.32 2.45-2.505.241-.111.601-.232.82-.271.267-.058 2.213.201 5.912.8 3.036.48 5.525.894 5.518.914 0 .026-.121.306-.27.638-.54 1.198-1.515 3.842-3.35 9.021-1.029 2.913-2.107 5.897-2.4 6.62-.703 1.748-.725 1.833-.594 2.286.137.46.45.833.872 1.012.41.177 3.823.24 4.37.085.852-.25 1.44-.688 2.312-1.724 1.166-1.39 3.169-3.948 6.771-8.661 5.8-7.583 6.561-8.49 7.387-8.702.233-.065 2.828-.056 5.784.011 5.827.138 6.64.09 8.62-.5 2.24-.67 4.035-1.65 5.517-3.016 1.136-1.054 1.135-1.014.207-1.962-.357-.38-.767-.777-.902-.893z'
              fill='#000033'
            />
          </svg>
        </div>
      ) : data.length ? (
        <TableInfiniteScroll
          handleClick={handleClick}
          next={fetchMore}
          hasMore={hasMore}
          className={sls.table}
          data={data?.map((item: any) => ({
            ...item,
            ...item.properties,
          }))}
          columns={columns}
          tableHooks={[useFlexLayout]}
          loading={loading}
        />
      ) : !data.length ? (
        <>Ничего не найдено</>
      ) : (
        <></>
      )}

      {statusIs ? (
        <StatusChangeNotificitaion
          documentNumber={statusIs.documentNumber}
          status={statusIs.status}
        />
      ) : null}
    </div>
  );
};

export default ApplicationsTable;
