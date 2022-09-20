import React, { FC, useCallback, useMemo } from 'react';
import { H4, Table } from 'react-lib';
import styles from './ServicesReport.module.scss';
import Spoiler from './Spoiler';
import air from '@assets/images/air.png';
import label from '@assets/images/label.png';

//dayjs
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';

//Forms
import Towing from './Forms/Towing';
import InstallAConMC from './Forms/InstallAConMC';
import Pads from './Forms/Pads';
import WorkSAB from './Forms/WorkSAB';
import OOPKandCustoms from './Forms/OOPKandCustoms';
import Ladder from './Forms/Ladder';
import Electro from './Forms/Electro';
import Passengers from './Forms/Passengers';
import Baggage from './Forms/Baggage';
import Mail from './Forms/Mail';
import OnBoardFood from './Forms/OnBoardFood';
import CleaningAC from './Forms/CleaningAC';
import Fueling from './Forms/Fueling';
import BathroomService from './Forms/BathroomService';
import WaterService from './Forms/WaterService';
import CrewArrival from './Forms/CrewArrival';
import PreliminarilyReady from './Forms/PreliminarilyReady';
import ACLandingReady from './Forms/ACLandingReady';
import DocumentsDelivery from './Forms/DocumentsDelivery';
import ACDeparture from './Forms/ACDeparture';
import ITS from './Forms/ITS';
import POO from './Forms/POO';
import AdditionalInfo from './Forms/AdditionalInfo';
import Oxygen from './Forms/ServicesForms/Oxygen';
import Nitrogen from './Forms/ServicesForms/Nitrogen';
import Heating from './Forms/ServicesForms/Heating';
import Cooling from './Forms/ServicesForms/Cooling';
import UVZ from './Forms/ServicesForms/UVZ';
import BlowingWaterService from './Forms/ServicesForms/BlowingWaterService';
import FuelDrain from './Forms/ServicesForms/FuelDrain';
import AdditionalInfoService from './Forms/ServicesForms/AdditionalInfoService';
import ImgForm from './Components/ImgForm';
import Signature from './Components/Signature';
import { useFlexLayout } from 'react-table';
import StatusColumn from '../../StatusColumn/StatusColumn';
import { useDispatch, useSelector } from 'react-redux';
import { usePagedContent } from '@src/helpers/usePagedContent';
import { reportsActions } from '@src/bus/reports/actions';
import {
  getReports,
  getReportsError,
  getReportsLoading,
} from '@src/bus/reports/selectors';
import {
  getFlight,
  getFlightError,
  getFlightLoading,
} from '@src/bus/flight/selectors';

const ServicesReport: FC<{ id?: number }> = ({ id }) => {
  dayjs.extend(utc);
  dayjs.extend(customParseFormat);

  const TKONames = [
    'Буксировка',
    'Установка ВС на МС',
    'Колодки',
    'Работа САБ',
    'Работа ООПК, таможни',
    'Трап',
    'Электропитание',
    'Пассажиры',
    'Багаж',
    'Груз / почта',
    'Бортпитание',
    'Уборка ВС',
    'Заправка топливом',
    'Обслуживание санузлов',
    'Обслуживание водянной системы',
    'Прибытие экипажа',
    'Предварительная готовность',
    'Готовность ВС к посадке',
    'Доставка документов',
    'Отправление ВС',
    'Работа ИТС',
    'ПОО',
    'Дополнительная информация',
  ];

  const servicesNames = [
    'Кислород',
    'Азот',
    'Подогрев',
    'Охлаждение',
    'УВЗ',
    'Продувка водянной системы',
    'Слив топлива',
    'Дополнительная информация',
  ];

  const TKOforms: any = {
    '0': <Towing />,
    '1': <InstallAConMC />,
    '2': <Pads />,
    '3': <WorkSAB />,
    '4': <OOPKandCustoms />,
    '5': <Ladder />,
    '6': <Electro />,
    '7': <Passengers />,
    '8': <Baggage />,
    '9': <Mail />,
    '10': <OnBoardFood />,
    '11': <CleaningAC />,
    '12': <Fueling />,
    '13': <BathroomService />,
    '14': <WaterService />,
    '15': <CrewArrival />,
    '16': <PreliminarilyReady />,
    '17': <ACLandingReady />,
    '18': <DocumentsDelivery />,
    '19': <ACDeparture />,
    '20': <ITS />,
    '748': <POO id={id} />,
    '22': <AdditionalInfo />,
  };

  const servicesForms = [
    <Oxygen />,
    <Nitrogen />,
    <Heating />,
    <Cooling />,
    <UVZ />,
    <BlowingWaterService />,
    <FuelDrain />,
    <AdditionalInfoService />,
  ];

  const dispatch = useDispatch();

  const flightData: any = useSelector(getFlight);
  const isLoading = useSelector(getFlightLoading);
  const isError = useSelector(getFlightError);
  const fetchTKO = useCallback(() => {
    dispatch(
      reportsActions.fetch_reports_async({
        url: '/clients/Service/GetReportByFlightId',
        method: 'GET',
        params: {
          Id: id,
        },
      }),
    );
  }, [id]);

  const fetchServices = useCallback(() => {
    dispatch(
      reportsActions.fetch_reports_async({
        url: '',
        method: 'GET',
        params: {
          Id: id,
        },
      }),
    );
  }, []);

  const { data } = usePagedContent(fetchTKO, getReports);
  const isLoadingServices = useSelector(getReportsLoading);
  const isErrorServices = useSelector(getReportsError);
  console.log(data);
  const columnsHistory = useMemo(
    () => [
      {
        Header: 'Статус',
        accessor: 'status',
        Cell: ({ value }: any) => {
          return <StatusColumn status={value} />;
        },
      },
      {
        Header: 'Дата получения статуса',
        accessor: 'statusDate',
        Cell: ({ value }: any) =>
          dayjs.utc(value).format('DD.MM.YYYY'),
      },
    ],
    [],
  );

  console.log(`reports: ${data}`);

  const renderTKO = () => {
    if (
      data &&
      typeof data !== 'string' &&
      data !== '' &&
      !isLoadingServices
    )
      return (
        <>
          {data?.map((value: any) => (
            <Spoiler
              name={value?.title}
              form={TKOforms[value?.code]}
            />
          ))}
        </>
      );
    if (isErrorServices)
      return <span>Ошибка загрузки данных. Попробуйте снова.</span>;
    return <span>Загрузка...</span>;
  };

  return (
    <div className={styles.root}>
      <H4 className={styles.part}>ТКО</H4>
      <div className={styles.flexFormRows}>{renderTKO()}</div>
      {/* <H4 className={styles.part}>Услуги</H4>
            <div className={styles.flexFormRows}>
                {renderServices()}
            </div> */}
      <H4 className={styles.part}>Внешний осмотр</H4>

      <div className={styles.outsideView}>
        {[0, 1, 2, 3, 4].map((value, index) => (
          <ImgForm
            key={value}
            date='Люки БГО'
            label={'Прилет'}
            img={label}
          />
        ))}
      </div>
      <div className={styles.outsideView}>
        {[0, 1].map((value, index) => (
          <ImgForm
            key={value}
            date='29.03.2020'
            label={'Фото поврежденного багажа'}
            img={air}
          />
        ))}
      </div>
      <H4 className={styles.part}>Подпись:</H4>
      <Signature />
      <H4 className={styles.part}>История статусов</H4>
      <Table
        data={flightData?.historyStatus}
        className={styles.table}
        columns={columnsHistory}
        tableHooks={[useFlexLayout]}
      />
    </div>
  );
};

export default ServicesReport;
