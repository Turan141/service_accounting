import React, { useState } from "react"
import styles from "../Forms.module.scss"
import { Form, DateInput, Select, Input } from "react-lib"
import { InjectedFormProps, reduxForm } from "redux-form"
import ImgForm from "../../Components/ImgForm"
import air from "@assets/images/air.png"

const Baggage: React.FC<InjectedFormProps> = () => {
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
                    name="BaggageArrivalStartWork"
                    label="Начало работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="BaggageArrivalStartTime"
                    label="Время начала"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="BaggageArrivalEndWork"
                    label="Окончание работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="BaggageArrivalEndTime"
                    label="Время окончания"
                    disabled={edit}
                />
            </div>

            <div className={styles.grid}>
                <Input.Redux
                    name="BaggageArrivalMass"
                    label="Эконом"
                    disabled={edit}
                />

                <Input.Redux
                    name="BaggageArrivalCount"
                    label="Бизнес"
                    disabled={edit}
                />
            </div>

            <div className={styles.row}>
                <div className={styles.header}>
                    <p>Фото поврежденного багажа</p>
                </div>
            </div>
            <div className={styles.grid}>
                <Input.Redux
                    name="BaggageDestroyedNumber"
                    label="Номер багажной бирки"
                    disabled={edit}
                />
            </div>
            <div className={styles.row}>
                <ImgForm date='29.02.2019' img={air}/>
            </div>

            <div className={styles.row}>
                <div className={styles.header}>
                    <p>Вылет / План: 23:41-23:45</p>
                </div>
            </div>
            <div className={styles.grid}>
                <DateInput.Redux
                    name="BaggageDepartureStartWork"
                    label="Начало работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="BaggageDepartureStartTime"
                    label="Время начала"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="BaggageDepartureEndWork"
                    label="Окончание работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="BaggageDepartureEndTime"
                    label="Время окончания"
                    disabled={edit}
                />
            </div>

            <div className={styles.grid}>
                <Input.Redux
                    name="BaggageDepartureMass"
                    label="Масса"
                    disabled={edit}
                />

                <Input.Redux
                    name="BaggageDeparturePlace"
                    label="Мест"
                    disabled={edit}
                />
                <Input.Redux
                    name="BaggageDepartureLabel"
                    label="Бирка"
                    disabled={edit}
                />
                <Input.Redux
                    name="BaggageDepartureLabel"
                    label="Бирка"
                    disabled={edit}
                />
            </div>
            <div className={styles.grid}>
                <Input.Redux
                    name="BaggageDepartureLabel"
                    label="Бирка"
                    disabled={edit}
                />
            </div>
        </Form>
    )
}

export default reduxForm({
    form: "Baggage",
    initialValues: {},
    destroyOnUnmount: false,
})(Baggage)
