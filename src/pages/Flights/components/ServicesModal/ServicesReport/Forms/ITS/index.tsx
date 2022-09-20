import React, { useState } from "react"
import styles from "../Forms.module.scss"
import { Form, DateInput, Select, Input } from "react-lib"
import { InjectedFormProps, reduxForm } from "redux-form"

const ITS: React.FC<InjectedFormProps> = () => {
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
                    name="ITSArrivalStartWork"
                    label="Начало работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="ITSArrivalStartTime"
                    label="Время начала"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="ITSArrivalEndWork"
                    label="Окончание работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="ITSArrivalEndTime"
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
                    name="ITSDepartureStartWork"
                    label="Начало работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="ITSDepartureStartTime"
                    label="Время начала"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="ITSDepartureEndWork"
                    label="Окончание работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="ITSDepartureEndTime"
                    label="Время окончания"
                    disabled={edit}
                />
            </div>
        </Form>
    )
}

export default reduxForm({
    form: "ITS",
    initialValues: {},
    destroyOnUnmount: false,
})(ITS)
