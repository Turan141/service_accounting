import React, { useState } from "react"
import styles from "../../Forms.module.scss"
import { Form, DateInput, Input } from "react-lib"
import { InjectedFormProps, reduxForm } from "redux-form"

const Heating: React.FC<InjectedFormProps> = () => {
    const [edit, setEdit] = useState(false)

    return (
        <Form>
            <div className={styles.grid}>
                <div className={styles.gridOne}>
                    <p>Прилет / Салон (План: 23:41-23:45) </p>
                </div>

                <div className={styles.gridTwo}>
                    <p>Вылет / Люк БГО 1 (План: 23:41-23:45) </p>
                </div>
            </div>
            <div className={styles.grid}>
                <DateInput.Redux
                    name="HeatingSalonStartWork"
                    label="Начало работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="HeatingSalonStartTime"
                    label="Время начала"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="HeatingLukeBGO1StartWork"
                    label="Начало работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="HeatingLukeBGO1StartTime"
                    label="Время начала"
                    disabled={edit}
                />
            </div>
            <div className={styles.grid}>
                <div className={styles.gridOne}>
                    <p>Прилет / Люк БГО 2  (План: 23:41-23:45) </p>
                </div>

                <div className={styles.gridTwo}>
                    <p>Вылет / Люк панели обслуживания водяной.. (План: 23:41-23:45) </p>
                </div>
            </div>
            <div className={styles.grid}>
                <DateInput.Redux
                    name="HeatingLukeBGO2StartWork"
                    label="Начало работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="HeatingLukeBGO2StartTime"
                    label="Время начала"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="HeatingLukeWaterServiceStartWork"
                    label="Начало работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="HeatingLukeWaterServiceStartTime"
                    label="Время начала"
                    disabled={edit}
                />
            </div>
            <div className={styles.grid}>
                <div className={styles.gridOne}>
                    <p>Прилет / Люк панели обслуживания туалетной..  (План: 23:41-23:45) </p>
                </div>

                <div className={styles.gridTwo}>
                    <p>Вылет / Иное (двигатель) (План: 23:41-23:45) </p>
                </div>
            </div>
            <div className={styles.grid}>
                <DateInput.Redux
                    name="HeatingToiletServiceStartWork"
                    label="Начало работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="HeatingToiletServiceStartTime"
                    label="Время начала"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="HeatingEngineStartWork"
                    label="Начало работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="HeatingEngineStartTime"
                    label="Время начала"
                    disabled={edit}
                />
            </div>
        </Form>
    )
}

export default reduxForm({
    form: "Heating",
    initialValues: {},
    destroyOnUnmount: false,
})(Heating)
