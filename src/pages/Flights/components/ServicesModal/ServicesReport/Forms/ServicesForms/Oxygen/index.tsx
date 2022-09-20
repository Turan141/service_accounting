import React, { useState } from "react"
import styles from "../../Forms.module.scss"
import { Form, DateInput, Input } from "react-lib"
import { InjectedFormProps, reduxForm } from "redux-form"

const Oxygen: React.FC<InjectedFormProps> = () => {
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
                    name="OxygenStartWork"
                    label="Начало работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="OxygenStartTime"
                    label="Время начала"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="OxygenEndWork"
                    label="Окончание работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="OxygenEndTime"
                    label="Время окончания"
                    disabled={edit}
                />
            </div>

            <div className={styles.grid}>
                <Input.Redux
                    name="OxygenOnePointOne"
                    label="Точка 1 литры"
                    disabled={edit}
                />
                <Input.Redux
                    name="OxygenOnePintTwo"
                    label="Точка 2 литры"
                    disabled={edit}
                />
            </div>
        </Form>
    )
}

export default reduxForm({
    form: "Oxygen",
    initialValues: {},
    destroyOnUnmount: false,
})(Oxygen)
