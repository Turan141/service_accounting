// Core
import React from "react"

import { InjectedFormProps, reduxForm, destroy } from "redux-form"
import { useDispatch } from "react-redux"
import { Dispatch } from "redux"

// Components
import {
    Button,
    DateInput,
    Form,
    Icon,
    MultiSelect,
    Scrollbar,
    Select,
} from "react-lib"

// Styles
import styles from "./FlightSearchForm.module.scss"

interface CandidatesFilterProps {
    handleClose: () => void
    props: InjectedFormProps
    setSubmitted?: any
}

const onFormChange = (
    values: any,
    dispatch: Dispatch,
    _: any,
    prevValues: any
) => {}

const onFormSubmit = (e: any, dispatch: Dispatch, props: any) => {
    e.preventDefault()
}

const FlightSearchForm: React.FC<
    CandidatesFilterProps & InjectedFormProps
> = props => {
    const dispatch = useDispatch()
    const { handleClose, setSubmitted } = props

    console.log(setSubmitted)

    return (
        <div className={styles.wrapper}>
            <Form
                onSubmit={e => onFormSubmit(e, dispatch, { setSubmitted })}
                className={styles.form}
            >
                <Scrollbar className={styles.scrollBar}>
                    <div className={styles.row}>
                        <div className={styles.col}>
                            <DateInput.Redux label="От" name="from" />
                        </div>
                        <div className={styles.col}>
                            <DateInput.Redux label="До" name="to" />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.col}>
                            <Select.Redux label="№ рейса" name="flightNumber">
                                <Select.Option
                                    value={1}
                                    label="Первый вариант"
                                    selected={true}
                                />
                                <Select.Option
                                    value={2}
                                    label="Второй вариант"
                                />
                            </Select.Redux>
                        </div>
                        <div className={styles.col}>
                            <Select.Redux label="Направление" name="direction ">
                                <Select.Option
                                    value={1}
                                    label="Первый вариант"
                                    selected={true}
                                />
                                <Select.Option
                                    value={2}
                                    label="Второй вариант"
                                />
                            </Select.Redux>
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.col}>
                            <Select.Redux label="Маршрут" name="route">
                                <Select.Option
                                    value={1}
                                    label="Первый вариант"
                                    selected={true}
                                />
                                <Select.Option
                                    value={2}
                                    label="Второй вариант"
                                />
                            </Select.Redux>
                        </div>
                        <div className={styles.col}>
                            <Select.Redux label="Код АК" name="codeAC">
                                <Select.Option
                                    value={1}
                                    label="Первый вариант"
                                    selected={true}
                                />
                                <Select.Option
                                    value={2}
                                    label="Второй вариант"
                                />
                            </Select.Redux>
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.col}>
                            <Select.Redux label="Заказчик" name="customer">
                                <Select.Option
                                    value={1}
                                    label="Первый вариант"
                                    selected={true}
                                />
                                <Select.Option
                                    value={2}
                                    label="Второй вариант"
                                />
                            </Select.Redux>
                        </div>
                        <div className={styles.col}>
                            <Select.Redux label="Борт" name="bort">
                                <Select.Option
                                    value={1}
                                    label="Первый вариант"
                                    selected={true}
                                />
                                <Select.Option
                                    value={2}
                                    label="Второй вариант"
                                />
                            </Select.Redux>
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.col}>
                            <Select.Redux label="Статус" name="status">
                                <Select.Option
                                    value={1}
                                    label="Первый вариант"
                                    selected={true}
                                />
                                <Select.Option
                                    value={2}
                                    label="Второй вариант"
                                />
                            </Select.Redux>
                        </div>
                        <div className={styles.col}>
                            <Select.Redux label="Категория" name="category">
                                <Select.Option
                                    value={1}
                                    label="Первый вариант"
                                    selected={true}
                                />
                                <Select.Option
                                    value={2}
                                    label="Второй вариант"
                                />
                            </Select.Redux>
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.col}>
                            <Select.Redux label="Тип" name="type">
                                <Select.Option
                                    value={1}
                                    label="Первый вариант"
                                    selected={true}
                                />
                                <Select.Option
                                    value={2}
                                    label="Второй вариант"
                                />
                            </Select.Redux>
                        </div>
                        <div className={styles.col}>
                            <Select.Redux label="Обсл" name="service">
                                <Select.Option
                                    value={1}
                                    label="Первый вариант"
                                    selected={true}
                                />
                                <Select.Option
                                    value={2}
                                    label="Второй вариант"
                                />
                            </Select.Redux>
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.col}>
                            <Select.Redux label="Тип ВС" name="typeVC">
                                <Select.Option
                                    value={1}
                                    label="Первый вариант"
                                    selected={true}
                                />
                                <Select.Option
                                    value={2}
                                    label="Второй вариант"
                                />
                            </Select.Redux>
                        </div>
                        <div className={styles.col}>
                            <Select.Redux label="Стоянка" name="parking">
                                <Select.Option
                                    value={1}
                                    label="Первый вариант"
                                    selected={true}
                                />
                                <Select.Option
                                    value={2}
                                    label="Второй вариант"
                                />
                            </Select.Redux>
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.col}>
                            <Select.Redux label="Терминал" name="terminal">
                                <Select.Option
                                    value={1}
                                    label="Первый вариант"
                                    selected={true}
                                />
                                <Select.Option
                                    value={2}
                                    label="Второй вариант"
                                />
                            </Select.Redux>
                        </div>
                        <div className={styles.col}>
                            <Select.Redux label="Выход" name="exit">
                                <Select.Option
                                    value={1}
                                    label="Первый вариант"
                                    selected={true}
                                />
                                <Select.Option
                                    value={2}
                                    label="Второй вариант"
                                />
                            </Select.Redux>
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.col}>
                            <Select.Redux label="Инфо" name="info">
                                <Select.Option
                                    value={1}
                                    label="Первый вариант"
                                    selected={true}
                                />
                                <Select.Option
                                    value={2}
                                    label="Второй вариант"
                                />
                            </Select.Redux>
                        </div>
                        <div className={styles.col}>
                            <Select.Redux label="Ошибка" name="error">
                                <Select.Option
                                    value={1}
                                    label="Первый вариант"
                                    selected={true}
                                />
                                <Select.Option
                                    value={2}
                                    label="Второй вариант"
                                />
                            </Select.Redux>
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.col}>
                            <Select.Redux label="№ полный" name="fullNumber">
                                <Select.Option
                                    value={1}
                                    label="Первый вариант"
                                    selected={true}
                                />
                                <Select.Option
                                    value={2}
                                    label="Второй вариант"
                                />
                            </Select.Redux>
                        </div>
                        <div className={styles.col}>
                            <Select.Redux label="ЗдАп:" name="zdAP">
                                <Select.Option
                                    value={1}
                                    label="Первый вариант"
                                    selected={true}
                                />
                                <Select.Option
                                    value={2}
                                    label="Второй вариант"
                                />
                            </Select.Redux>
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.col}>
                            <Select.Redux label="ЗдUTG" name="zdUTG">
                                <Select.Option
                                    value={1}
                                    label="Первый вариант"
                                    selected={true}
                                />
                                <Select.Option
                                    value={2}
                                    label="Второй вариант"
                                />
                            </Select.Redux>
                        </div>
                        <div className={styles.col}>
                            <Select.Redux label="ПР" name="pr">
                                <Select.Option
                                    value={1}
                                    label="Первый вариант"
                                    selected={true}
                                />
                                <Select.Option
                                    value={2}
                                    label="Второй вариант"
                                />
                            </Select.Redux>
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.col}>
                            <Select.Redux label="M" name="m">
                                <Select.Option
                                    value={1}
                                    label="Первый вариант"
                                    selected={true}
                                />
                                <Select.Option
                                    value={2}
                                    label="Второй вариант"
                                />
                            </Select.Redux>
                        </div>
                        <div className={styles.col} />
                    </div>
                </Scrollbar>
                <div className={styles.buttons}>
                    <Button
                        onClick={() => {
                            dispatch(destroy("FlightSearchForm"))
                            handleClose()
                        }}
                        variant="text"
                    >
                        Отменить
                    </Button>
                    <Button
                        icon={<Icon name="done" />}
                        type={"submit"}
                        onClick={() => {
                            setTimeout(handleClose, 100)
                        }}
                    >
                        Применить
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default reduxForm({
    form: "FlightSearchForm",
    initialValues: {},
    destroyOnUnmount: false,
    onChange: onFormChange,
    onSubmit: onFormSubmit,
})(FlightSearchForm)
