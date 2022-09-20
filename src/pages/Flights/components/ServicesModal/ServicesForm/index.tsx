import React, { useCallback, useMemo } from "react"
import styles from "./ServicesForm.module.scss"
import { Table, Form, Checkbox } from "react-lib"
import { Field, InjectedFormProps, reduxForm } from "redux-form"
import { useFlexLayout } from "react-table"
import { servicesActions } from "@src/bus/services/actions"
import { getServices, getServicesError, getServicesLoading } from "@src/bus/services/selectors"

import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { useDispatch, useSelector } from "react-redux"
import { usePagedContent } from "@src/helpers/usePagedContent"

interface FormProps {
    id: number
}

const ServicesForm: React.FC<InjectedFormProps & FormProps> = ({ id }) => {
    dayjs.extend(utc)

    const dispatch = useDispatch()
    const fetch = useCallback(
        () =>
            dispatch(
                servicesActions.fetch_services_async({
                    url: "/clients/Service/GetServicesByFlightId",
                    method: "GET",
                    params: {
                        Id: id,
                    },
                })
            ),
        []
    )

    const { data } = usePagedContent(fetch, getServices)
    const isLoading = useSelector(getServicesLoading)
    const isError = useSelector(getServicesError)

    const renderContent = useCallback(() => {
        if (data && !isLoading)
            return (
                <Table
                    className={styles.table}
                    data={data}
                    columns={columns}
                    tableHooks={[useFlexLayout]}
                />
            )
        if (isError)
            return <span>Ошибка загрузки данных. Попробуйте снова.</span>
        return <span>Загрузка...</span>
    }, [data, isError, isLoading])


    const columns = useMemo(
        () => [
            {
                Header: "№",
                accessor: "number",
            },
            {
                Header: "Название",
                accessor: "title",
            },
            {
                Header: "Кол-во",
                accessor: "count",
                Cell: ({value}: any) => value? value : '-'
            },
            {
                Header: "Комментарий",
                accessor: "comment",
                Cell: ({value}: any) => value? value : '-'
            },
            {
                Header: "Ответственный",
                accessor: "responsible",
                Cell: ({value}: any) => value? value : '-'
            },
            {
                accessor: "id",
                Cell: (data: any) => {
                    return (
                        <Field
                            component={'input'}
                            type='checkbox'
                            name={data.row.original?.name}
                            label={data.row.original?.name}
                            //disabled={true}
                        />
                    )
                },
            },
        ],
        []
    )

    return (
        <Form>
            {renderContent()}
        </Form>
    )
}

export default reduxForm<{}, any>({
    form: "ServicesForm",
    initialValues: {},
    destroyOnUnmount: false,
})(ServicesForm)
