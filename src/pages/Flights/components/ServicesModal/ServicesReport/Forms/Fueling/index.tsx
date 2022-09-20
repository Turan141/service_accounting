import React, { useState } from "react"
import styles from "../Forms.module.scss"
import { Form, DateInput, Select, Input } from "react-lib"
import { InjectedFormProps, reduxForm } from "redux-form"
import ImgForm from "../../Components/ImgForm"

const Fueling: React.FC<InjectedFormProps> = () => {
    const [edit, setEdit] = useState(false)
    return (
        <Form>
            <div className={styles.row}>
                <div className={styles.header}>
                    <p>Прилет / План: 23:41-23:45</p>
                </div>
            </div>
            <div className={styles.grid}>
                <DateInput.Redux
                    name="FuelingArrivalStartWork"
                    label="Начало работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="FuelingArrivalStartTime"
                    label="Время начала"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="FuelingArrivalEndWork"
                    label="Окончание работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="FuelingArrivalEndTime"
                    label="Время окончания"
                    disabled={edit}
                />
            </div>

            <div className={styles.grid}>
                <Input.Redux name="FuelRemain" label="Остаток топлива" disabled={edit} />

                <Input.Redux
                    name="FuelingCount"
                    label="Кол-во заправленного топлива"
                    disabled={edit}
                />
                <Input.Redux
                    name="MainFuelingCount"
                    label="Общая заправка"
                    disabled={edit}
                />
            </div>

            <div className={styles.row}>
                <div className={styles.header}>
                    <p>Фото остатков по бакам</p>
                </div>
            </div>
            <div className={styles.row}>
                <ImgForm />
            </div>
        </Form>
    )
}

export default reduxForm({
    form: "Fueling",
    initialValues: {},
    destroyOnUnmount: false,
})(Fueling)
