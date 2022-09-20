import React, { useCallback, useState } from "react"
import { AsyncSelect, Button, Form, Icon, Select } from "react-lib"
import styles from "./ChangeButtonList.module.scss"
import AllTaskModal from "@pages/Flights/AllTask/AllTaskModal/AllTaskModal"
import { getFormValues, InjectedFormProps, reduxForm } from "redux-form"
import { useDispatch, useSelector } from "react-redux"
import { executorsActions } from "@src/bus/executors/actions"
import { usePagedContent } from "@src/helpers/usePagedContent"
import {
    getExecutors,
    getExecutorsError,
    getExecutorsLoading,
} from "@src/bus/executors/selectors"
import executorsApi from "@src/api/executorsApi"

interface ChangeButtonListProps {
    handleClose: () => void
    submitButton: "Добавить" | "Выбрать"
    props: InjectedFormProps
}

const ChangeButtonList: React.FC<ChangeButtonListProps & InjectedFormProps> = ({
    handleClose,
    submitButton,
    handleSubmit
}) => {
    const dispatch = useDispatch()

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

    const formValues = useSelector(getFormValues('ChangeExecutor'))

    const submit = () => {
        console.log(formValues)
        handleClose()
    }

    const renderContent = () => {
        if (data && !isLoading)
            return (
                <Form onSubmit={handleSubmit(submit)}>
                    <div className={styles.container}>
                        <div className={styles.row}>
                            <div className={styles.col}>
                                {/* <AsyncSelect.Redux
                                    label="Изменить исполнителя рейса на вылет"
                                    name="changeExecutor"
                                    id="changeExecutor"
                                    fetch={executorsApi.asyncRequest({
                                        url: "/clients/TKO/GetTKOs",
                                        method: "GET",
                                        params: {},
                                    })}
                                    dataToValue={(value: any) => value?.fio}
                                    dataToRender={(value: any) => value?.fio}
                                /> */}
                                <Select.Redux
                                    label={
                                        "Изменить исполнителя рейса на вылет"
                                    }
                                    name="changeExecutor"
                                >
                                    {data?.map((elem: any) => (
                                        <Select.Option
                                            value={elem?.id}
                                            key={elem}
                                            label={elem?.fio}
                                        />
                                    ))}
                                </Select.Redux>
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.col}>
                                <Select.Redux
                                    label={
                                        "Изменить исполнителя дополнительного рейса на вылет"
                                    }
                                    name="changeExecutor1"
                                >
                                    {data?.map((elem: any) => (
                                        <Select.Option
                                            value={elem?.id}
                                            key={elem}
                                            label={elem?.fio}
                                        />
                                    ))}
                                </Select.Redux>
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.col}>
                                <Select.Redux
                                    label={
                                        "Изменить исполнителя дополнительного рейса на вылет"
                                    }
                                    name="changeExecutor2"
                                >
                                    {data?.map((elem: any) => (
                                        <Select.Option
                                            value={elem?.id}
                                            key={elem}
                                            label={elem?.fio}
                                        />
                                    ))}
                                </Select.Redux>
                            </div>
                        </div>
                    </div>
                    <div className={styles.line} />
                    <div className={styles.buttons}>
                        <Button onClick={handleClose} variant="text">
                            Отменить
                        </Button>
                        <Button
                            icon={
                                <Icon
                                    name={
                                        submitButton === "Выбрать"
                                            ? "further"
                                            : "add"
                                    }
                                />
                            }
                            type={"submit"}
                        >
                            Изменить
                        </Button>
                    </div>
                </Form>
            )
        if (isError)
            return <span>Ошибка загрузки данных. Попробуйте снова.</span>
        return <div className={styles.loading}><span>Загрузка...</span></div>
    }

    return <>{renderContent()}</>
}

export default reduxForm<any, any>({
    form: "ChangeExecutor",
    initialValues: {},
    destroyOnUnmount: true,
})(ChangeButtonList)
