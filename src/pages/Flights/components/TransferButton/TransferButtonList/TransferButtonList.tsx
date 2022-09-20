import React, { useCallback, useState } from "react"
import { Button, Icon, RadioButton, SearchField, useModal } from "react-lib"
import styles from "./TransferButtonList.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { executorsActions } from "@src/bus/executors/actions"
import { usePagedContent } from "@src/helpers/usePagedContent"
import { getExecutors, getExecutorsError, getExecutorsLoading } from "@src/bus/executors/selectors"

interface TransferButtonListProps {
    close: () => void
    submitButton?: "Добавить" | "Выбрать"
    flight?: any
}

const TransferButtonList: React.FC<TransferButtonListProps> = ({ close, submitButton, flight }) => {

    const [checkedValue, setChecked] = useState<number | null>(null)
    const dispatch = useDispatch()

    const { openModal } = useModal()
    const showModal = useCallback(() => {
        close && close()
        // openModal(AllTaskModal, { executorId: checkedValue, flight })
        dispatch(executorsActions.add_flight_executor_async({
            url: '/clients/Flight/AddTkoInFlight',
            method: 'POST',
            params: {},
            body: {
                flightId: flight?.id,
                tkoId: checkedValue
            }
        }))
    }, [checkedValue])

    const fetch = useCallback(
        () =>
            dispatch(
                executorsActions.fetch_executors_async({
                    url: "/clients/TKO/GetTKOs",
                    method: "GET",
                    params: {},
                })
            ),
        []
    )

    const { data } = usePagedContent(fetch, getExecutors)
    const isLoading = useSelector(getExecutorsLoading)
    const isError = useSelector(getExecutorsError)

    const renderExecutors = useCallback(() => {
        if (data && !isLoading)
            return (
                data?.map((employee: any) => (
                    <div className={styles.employee} key={employee.id}>
                        <RadioButton
                            name={employee?.fio}
                            label={employee.fio}
                            id={employee.id}
                            checked={checkedValue === employee?.id}
                            onChange={() => setChecked(employee?.id)}
                        />
                    </div>
                ))
            )
        if (isError)
            return <span>Ошибка загрузки. Попробуйте снова.</span>
        return <span>Загрузка...</span>
        }, [data, isLoading, isError, checkedValue])

    return (
        <>
            <SearchField className={styles.search} placeholder='Поиск'/>
            <div className={styles.employeeList}>
                { renderExecutors() }
            </div>
            <div className={styles.line} />
            <div className={styles.buttons}>
                <Button onClick={close} variant="text">
                    Закрыть
                </Button>
                <Button
                    icon={
                        <Icon
                            name={
                                submitButton === "Выбрать" ? "further" : "add"
                            }
                        />
                    }
                    type={"submit"}
                    onClick={showModal}
                    disabled={checkedValue === null}
                >
                    {submitButton}
                </Button>
            </div>
        </>
    )
}

export default TransferButtonList
