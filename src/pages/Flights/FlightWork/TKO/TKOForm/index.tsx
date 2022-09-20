import React, { useCallback, useState, FC } from "react"
import { Button, Icon, RadioButton } from "react-lib"
import styles from "../TKO.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { executorsActions } from "@src/bus/executors/actions"
import { usePagedContent } from "@src/helpers/usePagedContent"
import {
    getExecutors,
    getExecutorsError,
    getExecutorsLoading,
} from "@src/bus/executors/selectors"

interface TKOFormProps {
    flight: any
    close: any
}

const TKOForm: FC<TKOFormProps> = ({ flight, close }) => {

    const [checkedValue, setChecked] = useState<number | null>(null)
    const [radioType, setRadioType] = useState<string | null>(null)

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

    const renderContent = useCallback(() => {
        if (data && !isLoading)
            return (
                <div>
                    <div className={styles.main}>
                        <div className={styles.type}>
                            <h4 className={styles.title}>Тип ТКО</h4>
                            <div className={styles.row}>
                                <div className={styles.col}>
                                    {
                                        radioType === 'arrival' || radioType === null?
                                        <RadioButton
                                            className={styles.radioEmployee}
                                            name="arrival"
                                            label="Прилет"
                                            checked={radioType === "arrival"}
                                            onChange={() => setRadioType("arrival")}
                                        /> : null
                                    }
                                </div>
                                <div className={styles.col}>
                                    {
                                        radioType === 'departure' || radioType === null?
                                        <RadioButton
                                            className={styles.radioEmployee}
                                            name="departure"
                                            label="Вылет"
                                            checked={radioType === "departure"}
                                            onChange={() => setRadioType("departure")}
                                        /> : null
                                    }
                                </div>
                            </div>

                            <h4 className={styles.title}>Выбор исполнителя</h4>
                            <div className={styles.executor}>
                                {data?.map((value: any) => (
                                    <div className={styles.elem}>
                                        <div className={styles.col}>
                                            <RadioButton
                                                className={styles.radioEmployee}
                                                name={value?.fio}
                                                label={value?.fio}
                                                checked={checkedValue === value?.id}
                                                onChange={() => setChecked(value?.id)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles.line} />
                        <div className={styles.buttons}>
                            <Button onClick={close} variant="text">
                                Закрыть
                            </Button>
                            <Button
                                icon={<Icon name={"further"} />}
                                type={"submit"}
                            >
                                Отправить исполнителю
                            </Button>
                        </div>
                    </div>
                </div>
            )
        if (isError) return <span>Ошибка. Попробуйте снова.</span>
        return <span>Загрузка...</span>
    }, [data, isLoading, isError, checkedValue, radioType])

    return <>{renderContent}</>
}

export default TKOForm
