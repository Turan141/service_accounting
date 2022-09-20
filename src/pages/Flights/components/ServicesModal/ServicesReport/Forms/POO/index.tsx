import React, { useCallback, useEffect, useState } from "react"
import styles from "../Forms.module.scss"
import { Form, DateInput, Input } from "react-lib"
import { initialize, InjectedFormProps, reduxForm } from "redux-form"
import { useDispatch, useSelector } from "react-redux"
import { getReports, getReportsError, getReportsLoading } from "@src/bus/reports/selectors"

import dayjs from 'dayjs'
import utc from "dayjs/plugin/utc"
import customParseFormat from 'dayjs/plugin/customParseFormat'

const POO: React.FC<InjectedFormProps & { id?: number }> = ({ id }) => {

    dayjs.extend(utc)
    dayjs.extend(customParseFormat)

    const [edit, setEdit] = useState(true)
    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(
    //         servicesActions.fetch_services_async({
    //             url: "/clients/Service/GetReportByFlightId",
    //             method: "GET",
    //             params: {
    //                 Id: id,
    //             },
    //         })
    //     )
    // }, [])

    const { data }: any = useSelector(getReports)
    const isLoading = useSelector(getReportsLoading)
    const isError = useSelector(getReportsError)

    console.log(data?.result)

    useEffect(() => {
        dispatch(initialize('POO', {
            POOStartWork: dayjs(data?.result[0]?.startDate).format('DD.MM.YYYY'),
            POOStartTime: dayjs(data?.result[0]?.startDate).format('HH:mm'),
            POOEndWork: dayjs(data?.result[0]?.endDate).format('DD.MM.YYYY'),
            POOEndTime: dayjs(data?.result[0]?.endDate).format('HH:mm')
        }))
    }, [])

    const renderContent = useCallback(() => {
        if (data && !isLoading)
            return (
                <>
                    <div className={styles.row}>
                        <div>
                            <p>{`Прилет / План: ${dayjs(data?.result[0]?.startPlan).format('HH:mm')}-${dayjs(data?.result[0]?.endPlan).format('HH:mm')}`}</p>
                        </div>
                    </div>
                    <div className={styles.grid}>
                        <Input.Redux
                            name="POOStartWork"
                            label="Начало работ"
                            disabled={edit}
                        />

                        <Input.Redux
                            name="POOStartTime"
                            label="Время начала"
                            disabled={edit}
                        />

                        <Input.Redux
                            name="POOEndWork"
                            label="Окончание работ"
                            disabled={edit}
                        />

                        <Input.Redux
                            name="POOEndTime"
                            label="Время окончания"
                            disabled={edit}
                        />
                    </div>
                </>
            )
        if (isError)
            return (
                <div className={styles.row}>
                <span>Ошибка загрузки данных. Попробуйте снова.</span>
                </div>
            )
        if (!data)
            return (
                <div className={styles.row}>
                <span>Данные отсутствуют.</span>
                </div>
            )
        return <div className={styles.row}><span>Загрузка...</span></div>
    }, [data, isLoading, isError])

    return <Form>{renderContent()}</Form>
}

export default reduxForm<{}, any>({
    form: "POO",
    initialValues: {},
    destroyOnUnmount: false,
})(POO)
