import React, { useState } from "react"
import styles from "../../Forms.module.scss"
import { Form, DateInput, Select, Input } from "react-lib"
import { InjectedFormProps, reduxForm } from "redux-form"

const FuelDrain: React.FC<InjectedFormProps> = () => {
    const [edit, setEdit] = useState(false)

    return (
        <Form>
            <div className={styles.row}>
                <div className={styles.header}>
                    <p>Прилет / План: 23:41-23:45 </p>
                </div>
            </div>
            <div className={styles.grid}>
                <DateInput.Redux
                    name="FuelDrainArrivalStartWork"
                    label="Начало работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="FuelDrainArrivalStartTime"
                    label="Время начала"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="FuelDrainArrivalEndWork"
                    label="Окончание работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="FuelDrainArrivalEndTime"
                    label="Время окончания"
                    disabled={edit}
                />
            </div>
            <div className={styles.grid}>
                <Input.Redux
                    name="FuelDrainCount"
                    label="Кол-во литров"
                    disabled={edit}
                />
            </div>
        </Form>
    )
}

export default reduxForm({
    form: "FuelDrain",
    initialValues: {},
    destroyOnUnmount: false,
})(FuelDrain)
