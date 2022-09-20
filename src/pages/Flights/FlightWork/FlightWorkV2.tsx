import React, { FC } from 'react';
import styles from './FlightWork.module.scss';
import { SearchField } from 'react-lib';
import FlightSearch from '@pages/Flights/FlightWork/FlightSearch/FlightSearch';
import FlightWorkTableV2 from '../components/FlightWorkTable/FlightWorkTableV2';
import DayFilter from '../components/FlightWorkTable/DayFilter/DayFilter';

const FlightWorkV2: FC = () => {
  return (
    <div>
      <DayFilter />
      {/* <div className={styles.searchBlock}>
                <div className={styles.search}>
                    <SearchField placeholder='Поиск'/>
                    <FlightSearch />
                </div>
            </div> */}
      {/* V2 = без классификаторов */}
      <FlightWorkTableV2 />
    </div>
  );
};

export default FlightWorkV2;
