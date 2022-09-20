import React, { useEffect, useMemo, useState } from 'react';
import styles from './ServicesModal.module.scss';
import {
  Modal,
  ModalComponentProps,
  Scrollbar,
  Table,
  Tabs,
  Form,
} from 'react-lib';
import { useFlexLayout } from 'react-table';
import ServicesStatus from '@pages/Flights/components/ServicesStatus/ServicesStatus';
import StatusColumn from '@pages/Flights/components/StatusColumn/StatusColumn';
import ServicesForm from './ServicesForm';
import ServicesReport from './ServicesReport';
import { useDispatch, useSelector } from 'react-redux';
import { flightActions } from '@bus/flight/actions';
import { usePagedContent } from '@helpers/usePagedContent';
import {
  getFlight,
  getFlightError,
  getFlightLoading,
} from '@bus/flight/selectors';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { ServicesModalLeft } from './ServicesModalTabs/ServicesModalLeftTab/ServicesModalLeft';
import { ServiceModalTenders } from './ServicesModalTabs/ServicesModalTendersTab/ServiceModalTenders';
import { ServiceModalLIR } from './ServicesModalTabs/ServicesModalLirTab/ServiceModalLIR';
import { ServiceModalReport } from './ServicesModalTabs/ServicesModalReportTab/ServiceModalReport';

interface ServiceModalProps {
  flightData?: any;
}

const ServicesModal: React.FC<
  ModalComponentProps & ServiceModalProps
> = ({ isOpen, handleClose, flightData }) => {
  // dayjs.extend(utc)
  // dayjs.extend(customParseFormat)

  const [tab, setSelectedTabs] = useState(1);

  const dispatch = useDispatch();
  // useEffect(() => {
  //     dispatch(
  //         flightActions.fetch_flight_async({
  //             url: "/clients/Flight/GetFlight",
  //             method: "GET",
  //             params: {
  //                 Id: id,
  //             },
  //         })
  //     )
  // }, [])

  // const { data }: any = useSelector(getFlight)
  // const isLoading = useSelector(getFlightLoading)
  // const isError = useSelector(getFlightError)

  // const mainData: any = {
  //     "Номер рейса": data?.numberOfFlight,
  //     "Полный номер": data?.fullNumberOfFlight,
  //     'Направление': data?.direction,
  //     "Дата/время рейса": data?.flightDate,
  //     'Отменен': data?.isCanceled,
  //     "Обслуживать рейс": data?.serviceFlight,
  //     'Оператор': data?.operator,
  //     'Заказчик': data?.client,
  //     "Набор услуг": data?.setOfServices,
  //     "Спец. тариф": data?.isSpecialTariff,
  //     "Статус рейса": data?.status,
  //     "Категория рейса": data?.flightCategory,
  //     "Тип рейса": data?.flightType,
  //     'Авиакомпания': data?.company,
  //     'ВС': data?.airplane,
  //     "АП Вылет": data?.departureAirport,
  //     "АП прибытие": data?.arrivalAirport,
  //     'Прилет': "",
  //     'Стоянка': "",
  //     'Перрон': data?.platform,
  //     'Терминал': data?.terminal,
  //     'Выход': data?.exit,
  //     "Пасс. факт": data?.passiveFact,
  //     "Пасс AODB": data?.passiveAODB,
  //     "Груз/багаж факт": data?.cargoFact,
  //     "Груз/багаж АО": data?.cargoAO,
  //     'Топливо': {
  //         fuleTaxi: data?.fuelTaxi,
  //         fuelTakeOff: data?.fuelTakeOff,
  //         fuelSum: data?.fuelSum,
  //     },
  //     "АП информация": data?.informationAP,
  //     "UTG информация": data?.informationUTG,
  //     'Задержка': {
  //         Задержка: data?.delay,
  //     },
  //     'ППР': data?.ppr,
  //     "Код задержки": data?.delayCode,
  //     "Задержка. мин": data?.delayTime,
  //     'Супервайзер': data?.superviser,
  //     "Посл.корректировки": data?.afterEdit,
  // }

  //   const fields = [
  //     'Номер рейса',
  //     'Полный номер',
  //     'Направление',
  //     'Дата/время рейса',
  //     'Отменен',
  //     'Обслуживать рейс',
  //     'Оператор',
  //     'Заказчик',
  //     'Набор услуг',
  //     'Спец. тариф',
  //     'Статус рейса',
  //     'Категория рейса',
  //     'Тип рейса',
  //     'Авиакомпания',
  //     'ВС',
  //     'АП Вылет',
  //     'АП прибытие',
  //     'Прилет',
  //     'Стоянка',
  //     'Перрон',
  //     'Терминал',
  //     'Выход',
  //     'Пасс. факт',
  //     'Пасс AODB',
  //     'Груз/багаж факт',
  //     'Груз/багаж АО',
  //     'Топливо',
  //     'АП информация',
  //     'UTG информация',
  //     'Задержка',
  //     'ППР',
  //     'Код задержки',
  //     'Задержка. мин',
  //     'Супервайзер',
  //     'Посл.корректировки',
  //   ];

  // const renderMainData = () => {
  //     if (data && !isLoading) {
  //         const values = [
  //             data?.numberOfFlight,
  //             data?.fullNumberOfFlight,
  //             data?.direction,
  //             dayjs.utc(data?.flightDate).format("DD.MM.YYYY"),
  //             data?.isCanceled,
  //             data?.serviceFlight,
  //             data?.operator,
  //             data?.client,
  //             data?.setOfServices,
  //             data?.isSpecialTariff,
  //             data?.status,
  //             data?.flightCategory,
  //             data?.flightType,
  //             data?.company,
  //             data?.airplane,
  //             data?.departureAirport,
  //             data?.arrivalAirport,
  //             "",
  //             "",
  //             data?.platform,
  //             data?.terminal,
  //             data?.exit,
  //             data?.passiveFact,
  //             data?.passiveAODB,
  //             data?.cargoFact,
  //             data?.cargoAO,
  //             {
  //                 fuleTaxi: data?.fuelTaxi,
  //                 fuelTakeOff: data?.fuelTakeOff,
  //                 fuelSum: data?.fuelSum,
  //             },
  //             data?.informationAP,
  //             {
  //                 Задержка: data?.delay,
  //             },
  //             data?.ppr,
  //             data?.delayCode,
  //             data?.delayTime,
  //             data?.superviser,
  //             data?.afterEdit,
  //         ]
  //         return fields.map((value, index) => (
  //             <ul key={value}>
  //                 <li className={styles.list}>
  //                     <span>{value}</span>
  //                     <span>
  //                         {typeof values[index] === "object"
  //                             ? null
  //                             : values[index]}
  //                     </span>
  //                 </li>
  //             </ul>
  //         ))
  //     }
  //     if (isError)
  //         return <span>Ошибка загрузки данных. Попробуйте еще раз.</span>
  //     return <span>Загрузка...</span>
  // }

  // const columnsHistory = useMemo(
  //     () => [
  //         {
  //             Header: "Статус",
  //             accessor: "status",
  //             Cell: ({ value }: any) => {
  //                 return <StatusColumn status={value} />
  //             },
  //         },
  //         {
  //             Header: "Дата получения статуса",
  //             accessor: "statusDate",
  //             Cell: ({ value }: any) => dayjs.utc(value).format("DD.MM.YYYY"),
  //         },
  //     ],
  //     []
  // )

  // const render = () => {
  //     if (selectedTabs === 1)
  //         return (
  //             <div className={styles.modal}>
  //                 <div className={styles.main}>
  //                     <div className={styles.col}>{renderMainData()}</div>
  //                     <div className={styles.colTable}>
  //                         <ServicesForm id={id} />
  //                         <div className={styles.statusHistory}>
  //                             <div>
  //                                 <h4 className={styles.historyTitle}>
  //                                     История статусов
  //                                 </h4>
  //                             </div>
  //                             <Table
  //                                 data={data?.historyStatus}
  //                                 columns={columnsHistory}
  //                                 tableHooks={[useFlexLayout]}
  //                             />
  //                         </div>
  //                     </div>
  //                     <ServicesStatus status={data?.status} executorName={data?.mainTKO?.fio} flight={data} />
  //                 </div>
  //             </div>
  //         )
  //     return <ServicesReport id={id}/>
  // }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      style={{
        minWidth: '50%',
        height: '800px',
        //display: 'block',
        justifyContent: 'center',
        backgroundColor: '#f5f9ff',
      }}
    >
      <div className={styles.header}>
        <span className={styles.title}>
          {flightData?.flightNumber}
        </span>
        <div className={styles.tabWrapper}>
          <Tabs
            onChange={setSelectedTabs}
            value={tab}
            className={styles.tabs}
          >
            <Tabs.Tab value={1} label='LIR' />
            {/* <Tabs.Tab value={2} label='Услуги' />
            <Tabs.Tab value={3} label='Отчет' /> */}
          </Tabs>
        </div>
      </div>
      {/* {data && !isLoading ? <Scrollbar>{render()}</Scrollbar> : null} */}
      <div className={styles.body}>
        <div className={styles.ServicesModalLeft}>
          <ServicesModalLeft flightData={flightData} />
        </div>

        <div className={styles.tabsPanelMain}>
          <Tabs.Panel value={tab} index={3}>
            <div className={styles.ServicesModalV3}>
              <ServiceModalTenders />
            </div>
          </Tabs.Panel>

          <Tabs.Panel value={tab} index={2}>
            <ServiceModalReport />
          </Tabs.Panel>

          <Tabs.Panel value={tab} index={1}>
            <div className={styles.ServicesModalLIR}>
              <ServiceModalLIR flightCode={flightData?.flightCode} />
            </div>
          </Tabs.Panel>
        </div>
      </div>
    </Modal>
  );
};

export default ServicesModal;
