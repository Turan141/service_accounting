import React, { useState } from "react"
import styles from "../../Forms.module.scss"
import { Form, DateInput, Select, Input } from "react-lib"
import { InjectedFormProps, reduxForm } from "redux-form"

const UVZ: React.FC<InjectedFormProps> = () => {
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
                    name="UVZArrivalStartWork"
                    label="Начало работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="UVZArrivalStartTime"
                    label="Время начала"
                    disabled={edit}
                />
                <Input.Redux name="TowNumber" label="Тягач №" />
            </div>
        </Form>
    )
}

export default reduxForm({
    form: "UVZ",
    initialValues: {},
    destroyOnUnmount: false,
})(UVZ)
