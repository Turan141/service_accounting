import React, { useState } from "react"
import styles from "../Forms.module.scss"
import { Form, DateInput, Select, Input } from "react-lib"
import { InjectedFormProps, reduxForm } from "redux-form"

const BathroomService: React.FC<InjectedFormProps> = () => {
    const [edit, setEdit] = useState(false)
    const types = ["Комплекс", 'Заправка']
    return (
        <Form>
            <div className={styles.row}>
                <div className={styles.header}>
                    <p>Прилет / План: 23:41-23:45</p>
                </div>
            </div>
            <div className={styles.grid}>
                <DateInput.Redux
                    name="BathroomServiceArrivalStartWork"
                    label="Начало работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="BathroomServiceArrivalStartTime"
                    label="Время начала"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="BathroomServiceArrivalEndWork"
                    label="Окончание работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="BathroomServiceArrivalEndTime"
                    label="Время окончания"
                    disabled={edit}
                />
            </div>

            <div className={styles.grid}>
                <Select.Redux name="BathroomServiceArrivalType" label="Вид" disabled={edit}>
                    {types.map(value => (
                        <Select.Option value={value} label={value} />
                    ))}
                </Select.Redux>
            </div>
            <div className={styles.row}>
                <div className={styles.header}>
                    <p>Вылет / План: 23:41-23:45</p>
                </div>
            </div>
            <div className={styles.grid}>
                <DateInput.Redux
                    name="BathroomServiceDepartureStartWork"
                    label="Начало работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="BathroomServiceDepartureStartTime"
                    label="Время начала"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="BathroomServiceDepartureEndWork"
                    label="Окончание работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="BathroomServiceDepartureEndTime"
                    label="Время окончания"
                    disabled={edit}
                />
            </div>

            <div className={styles.grid}>
                <Select.Redux name="BathroomServiceDepartureType" label="Вид" disabled={edit}>
                    {types.map(value => (
                        <Select.Option value={value} label={value} />
                    ))}
                </Select.Redux>
            </div>
        </Form>
    )
}

export default reduxForm({
    form: "BathroomService",
    initialValues: {},
    destroyOnUnmount: false,
})(BathroomService)
