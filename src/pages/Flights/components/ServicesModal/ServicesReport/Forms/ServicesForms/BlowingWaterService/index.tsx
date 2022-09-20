import React, { useState } from "react"
import styles from "../../Forms.module.scss"
import { Form, DateInput, Select, Input } from "react-lib"
import { InjectedFormProps, reduxForm } from "redux-form"

const BlowingWaterService: React.FC<InjectedFormProps> = () => {
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
                    name="BlowingWaterServiceArrivalStartWork"
                    label="Начало работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="BlowingWaterServiceArrivalStartTime"
                    label="Время начала"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="BlowingWaterServiceArrivalEndWork"
                    label="Окончание работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="BlowingWaterServiceArrivalEndTime"
                    label="Время окончания"
                    disabled={edit}
                />
            </div>
            <div className={styles.row}>
                <div className={styles.header}>
                    <p>Прилет / План: 23:41-23:45 </p>
                </div>
            </div>
            <div className={styles.grid}>
                <DateInput.Redux
                    name="BlowingWaterServiceDepartureStartWork"
                    label="Начало работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="BlowingWaterServiceDepartureStartTime"
                    label="Время начала"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="BlowingWaterServiceDepartureEndWork"
                    label="Окончание работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="BlowingWaterServiceDepartureEndTime"
                    label="Время окончания"
                    disabled={edit}
                />
            </div>
        </Form>
    )
}

export default reduxForm({
    form: "BlowingWaterService",
    initialValues: {},
    destroyOnUnmount: false,
})(BlowingWaterService)
