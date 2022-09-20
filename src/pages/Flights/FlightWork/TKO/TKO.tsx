import React, { useCallback, useState } from "react"
import { Button, Icon, RadioButton, useDropdown } from "react-lib"
import { Transition } from "react-transition-group"
import gsap from "gsap"
import styles from "./TKO.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { executorsActions } from "@src/bus/executors/actions"
import { usePagedContent } from "@src/helpers/usePagedContent"
import {
    getExecutors,
    getExecutorsError,
    getExecutorsLoading,
} from "@src/bus/executors/selectors"

interface TkoProps {
    triggerElement: React.ReactNode
    flight?: any
}

const Tko: React.FC<TkoProps> = ({ triggerElement, flight }) => {
    const trigger = React.useRef<any>()

    const { Dropdown, isOpen, open, close } = useDropdown({
        ref: trigger,
        position: "bottom left",
        closeOnClickOutside: false,
    })

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

    const onClose = () => {
        setChecked(null)
        setRadioType(null)
        close()
    }

    const onSubmit = useCallback(() => {
        dispatch(executorsActions.add_flight_tko_async({
            url: '/clients/Flight/AddSecondaryTkoInFlight',
            method: 'POST',
            params: {},
            body: {
                flightId: flight?.id,
                tkoIds: [
                    checkedValue
                ],
                direction: radioType === "arrival" ? 2 : 3
            }
        }))
        setChecked(null)
        setRadioType(null)
        close()
    }, [radioType, checkedValue])

    const renderContent = useCallback(() => {
        if (data && !isLoading)
            return (
                <div>
                    <div className={styles.main}>
                        <div className={styles.type}>
                            <h4 className={styles.title}>Тип ТКО</h4>
                            <div className={styles.row}>
                                {radioType === "arrival" ||
                                radioType === null ? (
                                    <div className={styles.col}>
                                        <RadioButton
                                            className={styles.radioEmployee}
                                            name="arrival"
                                            label="Прилет"
                                            checked={radioType === "arrival"}
                                            onChange={() =>
                                                setRadioType("arrival")
                                            }
                                        />
                                    </div>
                                ) : null}

                                {radioType === "departure" ||
                                radioType === null ? (
                                    <div className={styles.col}>
                                        <RadioButton
                                            className={styles.radioEmployee}
                                            name="departure"
                                            label="Вылет"
                                            checked={radioType === "departure"}
                                            onChange={() =>
                                                setRadioType("departure")
                                            }
                                        />
                                    </div>
                                ) : null}
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
                                                checked={
                                                    checkedValue === value?.id
                                                }
                                                onChange={() =>
                                                    setChecked(value?.id)
                                                }
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles.line} />
                        <div className={styles.buttons}>
                            <Button onClick={onClose} variant="text">
                                Закрыть
                            </Button>
                            <Button
                                icon={<Icon name={"further"} />}
                                type={"submit"}
                                onClick={onSubmit}
                                disabled={radioType === null || checkedValue === null}
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

    return (
        <div>
            <div ref={trigger} onClick={open}>
                {triggerElement}
            </div>
            <Transition
                in={isOpen}
                timeout={200}
                mountOnEnter
                unmountOnExit
                addEndListener={(node, done) => {
                    gsap.to(node, 200 / 1000, {
                        autoAlpha: isOpen ? 1 : 0,
                        y: isOpen ? 6 : 0,
                        onComplete: done,
                    })
                }}
            >
                <Dropdown
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: 478,
                        padding: 0,
                        borderRadius: 4,
                        zIndex: 9999,
                        backgroundColor: "#fff",
                        boxShadow:
                            "0 0 14.7754px rgba(17, 82, 99, 0.075), 0 0 7.84712px rgba(17, 82, 99, 0.0605839), 0 0 3.26536px rgba(17, 82, 99, 0.0421718)",
                    }}
                >
                    {renderContent()}
                </Dropdown>
            </Transition>
        </div>
    )
}

export default Tko
