import React, { useState } from "react"
import styles from "../Forms.module.scss"
import { Form, DateInput, Select, Input } from "react-lib"
import { InjectedFormProps, reduxForm } from "redux-form"

const DocumentsDelivery: React.FC<InjectedFormProps> = () => {
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
                    name="DocumentsDeliveryStartWork"
                    label="Начало работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="DocumentsDeliveryStartTime"
                    label="Время начала"
                    disabled={edit}
                />
            </div>
        </Form>
    )
}

export default reduxForm({
    form: "DocumentsDelivery",
    initialValues: {},
    destroyOnUnmount: false,
})(DocumentsDelivery)
