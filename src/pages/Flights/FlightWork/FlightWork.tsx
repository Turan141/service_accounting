import React, { FC } from "react"
import styles from "./FlightWork.module.scss"
import { SearchField } from "react-lib"
import FlightWorkTable from "@pages/Flights/components/FlightWorkTable/FlightWorkTable"
import FlightSearch from "@pages/Flights/FlightWork/FlightSearch/FlightSearch"



const FlightWork: FC = () => {

    return (
        <div>
            <div className={styles.searchBlock}>
                <div className={styles.search}>
                    <SearchField placeholder='Поиск'/>
                    <FlightSearch />
                </div>
            </div>
            <FlightWorkTable />
        </div>
    )
}

export default FlightWork
