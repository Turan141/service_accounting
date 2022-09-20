import React from 'react';
import { DropDownList } from './DropDownList/DropDownList';
import styles from './ServiceModalLeft.module.scss';

export const ServicesModalLeft = ({ flightData }: any) => {
  console.log(flightData);
  return (
    <div className={styles.flightInfo}>
      <ul>
        <li
          style={{
            justifyContent: 'flex-start',
            borderBottom: 'none',
          }}
        >
          <DropDownList
            dataArray={[
              {
                header: 'Вылет',
                name: 'STD',
                value: flightData?.std,
              },
              {
                name: 'ETD',
                value: flightData?.etd,
              },
              {
                name: 'OBT (руление)',
                value: '',
              },
              {
                name: 'ATD',
                value: flightData?.atd,
              },
            ]}
          />
        </li>
        <li
          style={{
            justifyContent: 'flex-start',
            borderBottom: 'none',
          }}
        >
          <DropDownList
            dataArray={[
              {
                header: 'Прилет',
                name: 'STA',
                value: flightData?.sta,
              },
              {
                name: 'ETA',
                value: flightData?.eta,
              },
              {
                name: 'ATA',
                value: flightData?.ata,
              },
            ]}
          />
        </li>
        <li
          style={{
            justifyContent: 'flex-start',
            borderBottom: 'none',
          }}
        >
          <DropDownList
            dataArray={[
              {
                header: 'Регистрация, Посадка',
                name: 'Гот ПДС',
                value: flightData?.bt,
              },
            ]}
            haveNest
            dataForNest={[
              [
                {
                  header: 'Регистрация',
                  name: 'Начало',
                  value: flightData?.checkinSST,
                },
                {
                  name: 'Окончание',
                  value: flightData?.checkinSET,
                },
              ],
              [
                {
                  header: 'Посадка',
                  name: 'Начало',
                  value: flightData?.gateST,
                },
                {
                  name: 'Окончание',
                  value: '',
                },
              ],
            ]}
          />
        </li>
        <li
          style={{
            justifyContent: 'flex-start',
            borderBottom: 'none',
          }}
        >
          <DropDownList
            dataArray={[
              {
                header: 'Стоянка',
                name: 'Номер',
                value: flightData?.pos,
              },
              {
                name: 'Область на перроне',
                value: flightData?.parkingRegion,
              },
              {
                name: 'Электропитание',
                value: flightData?.parkingPowerSupply,
              },
              {
                name: 'Заземление',
                value: flightData?.parkingGrounding,
              },
              {
                name: 'Телетрап',
                value: flightData?.partkingTrap,
              },
            ]}
          />
        </li>
        <li
          style={{
            justifyContent: 'flex-start',
            borderBottom: 'none',
          }}
        >
          <DropDownList
            dataArray={[
              {
                header: 'Топливо tafeoff/taxi/sum',
                name: 'FUEL_ACTUAL_TAKEOFF_ATSS',
                value: flightData?.fuelTakeOff,
              },
              {
                name: 'FUEL_ACTUAL_TAXI_ATSS',
                value: flightData?.fuelTaxi,
              },
              {
                name: 'Суммарно',
                value: flightData?.fuelSum,
              },
            ]}
          />
        </li>
        <li
          style={{
            justifyContent: 'flex-start',
            borderBottom: 'none',
          }}
        >
          <DropDownList
            dataArray={[
              {
                header: 'Задержка',
                name: 'Код РПП',
                value: flightData?.delayCode,
              },
              {
                name: 'Длит РПП',
                value: flightData?.delayTime,
              },
              {
                name: 'Код IATA',
                value: flightData?.delayCodeIATA,
              },
              {
                name: 'Длит IATA',
                value: flightData?.deleyDurationIATA,
              },
              {
                name: 'Длит по отпр',
                value: '',
              },
              {
                name: 'Длит РПП',
                value: flightData?.delayTime,
              },
            ]}
          />
        </li>
        <li
          style={{
            justifyContent: 'flex-start',
            borderBottom: 'none',
          }}
        >
          <DropDownList
            dataArray={[
              {
                header: 'AODB',
                name: 'Борт N (AODB)',
                value: flightData?.airplane,
              },
              {
                name: 'Код АК (AODB)',
                value: flightData?.company,
              },
              {
                name: 'Тип ВС (AODB)',
                value: flightData?.flightType,
              },
              {
                name: 'АП вылета (AODB)',
                value: flightData?.flsID,
              },
              {
                name: 'АП прилета (AODB)',
                value: flightData?.flsID,
              },
            ]}
          />
        </li>
        <li
          style={{
            justifyContent: 'flex-start',
            borderBottom: 'none',
          }}
        >
          <DropDownList
            dataArray={[
              {
                header: 'Связи',
                // name: 'Гот ПДС',
                // value: flightData?.bt,
              },
            ]}
            haveNest
            dataForNest={[
              [
                {
                  header: 'Вылетной рейс (на рейсе по прилету)',
                  name: 'Дата/Время рейса',
                  value: flightData?.flightDate,
                },
                {
                  name: 'Маршрут',
                  value: flightData?.departureAirport,
                },
                {
                  name: 'Выход',
                  value: flightData?.exitgate,
                },
              ],
              [
                {
                  header: 'Прибывшие рейсы (на рейсе по вылету)',
                  name: 'Дата/Время рейса',
                  value: flightData?.flightDate,
                },
                {
                  name: 'Маршрут',
                  value: flightData?.arrivalAirport,
                },
                {
                  name: 'Выход',
                  value: flightData?.exitgate,
                },
              ],
            ]}
          />
        </li>
        <li
          style={{
            justifyContent: 'flex-start',
            borderBottom: 'none',
          }}
        >
          <DropDownList
            dataArray={[
              {
                header: 'Служебное',
                name: 'FC_PK',
                value: '',
              },
              {
                name: 'Аэропорт',
                value: '',
              },
              {
                name: 'Карточка создана',
                value: '',
              },
              {
                name: 'Карточка коррект',
                value: '',
              },
              {
                name: 'Пользователь',
                value: '',
              },
              {
                name: 'Экипаж',
                value: '',
              },
              {
                name: 'FLD_ID',
                value: flightData?.fltID,
              },
              {
                name: 'CALLSING',
                value: flightData?.callsign,
              },
              {
                name: 'FLT_ID_ROT',
                value: flightData?.fltIDRot,
              },
              {
                name: 'MASTER_FLT_ID',
                value: flightData?.masterFltID,
              },
            ]}
          />
        </li>
        <li>
          <p>Номер рейса</p>
          <p>{flightData?.flightNumber}</p>
        </li>
        <li>
          <p>Полный номер</p>
          <p>{flightData?.fullNumberOfFlight}</p>
        </li>
        <li>
          <p>Дата\Время рейса</p>
          <p>{flightData?.flightDate}</p>
        </li>
        <li>
          <p>Отменен</p>
          <p>{flightData?.status}</p>
        </li>
        <li>
          <p>Обслужить рейс</p>
          <p>{flightData?.serviceFlight}</p>
        </li>
        <li>
          <p>Оператор</p>
          <p>{flightData?.operator}</p>
        </li>
        <li>
          <p>Заказчик</p>
          <p>{flightData?.client}</p>
        </li>
        <li>
          <p>Набор услуг</p>
          <p>{flightData?.setOfServices}</p>
        </li>
        <li>
          <p>Спец тариф</p>
          <p>{flightData?.specialTariff}</p>
        </li>
        <li>
          <p>Статус рейса</p>
          <p>{flightData?.flightStatus}</p>
        </li>
        <li>
          <p>Категория рейса</p>
          <p>{flightData?.flightCategory}</p>
        </li>
        <li>
          <p>Тип рейса</p>
          <p>{flightData?.handlingTypeID}</p>
        </li>
        <li>
          <p>Авиакомпания</p>
          <p>{flightData?.company}</p>
        </li>
        <li>
          <p>ВС</p>
          <p>{flightData?.airplane}</p>
        </li>
        <li>
          <p>АП Вылет</p>
          <p>{flightData?.departureAirport}</p>
        </li>
        <li>
          <p>АП Прибытия</p>
          <p>{flightData?.arrivalAirport}</p>
        </li>
        <li>
          <p>Прилет</p>
          <p>{flightData?.arrivalAirport}</p>
        </li>
        {/* <li>
          <p>Стоянка</p>
          <p>{flightData?.arrivalAirport}</p>
        </li> */}
        <li>
          <p>Перрон</p>
          <p></p>
        </li>
        <li>
          <p>Терминал</p>
          <p>{flightData?.terminal}</p>
        </li>
        <li>
          <p>Выход</p>
          <p>{flightData?.exitgate}</p>
        </li>
        <li>
          <p>Пасс. факт</p>
          <p>{flightData?.passiveFact}</p>
        </li>
        <li>
          <p>Пасс AODB</p>
          <p>{flightData?.passiveAODB}</p>
        </li>
        <li>
          <p>Груз\Багаж факт</p>
          <p></p>
        </li>
        <li>
          <p>Топливо</p>
          <p>{flightData?.fuelTakeOff}</p>
        </li>
        <li>
          <p>Груз\Багаж AODB</p>
          <p></p>
        </li>
        <li>
          <p>АП информация</p>
          <p>{flightData?.fullNumberOfFlight}</p>
        </li>
        <li>
          <p>UTG информация</p>
          <p>{flightData?.informationUTG}</p>
        </li>
        <li>
          <p>Задержка</p>
          <p>{flightData?.delayCode}</p>
        </li>
        <li>
          <p>ППР</p>
          <p>{flightData?.ppr}</p>
        </li>
        <li>
          <p>Код задержки</p>
          <p></p>
        </li>
        <li>
          <p>Задержка мин.</p>
          <p>{flightData?.deleyDuration}</p>
        </li>
        <li>
          <p>Супервайзер</p>
          <p>{flightData?.superviser}</p>
        </li>
        <li>
          <p>Посл. корректировка</p>
          <p>{flightData?.afterEdit}</p>
        </li>
      </ul>
    </div>
  );
};
