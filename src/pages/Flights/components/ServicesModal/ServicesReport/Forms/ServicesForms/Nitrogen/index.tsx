import React, { useState } from "react"
import styles from "../../Forms.module.scss"
import { Form, DateInput, Input } from "react-lib"
import { InjectedFormProps, reduxForm } from "redux-form"

const Nitrogen: React.FC<InjectedFormProps> = () => {
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
                    name="NitrogenStartWork"
                    label="Начало работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="NitrogenStartTime"
                    label="Время начала"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="NitrogenEndWork"
                    label="Окончание работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="NitrogenEndTime"
                    label="Время окончания"
                    disabled={edit}
                />
            </div>

            <div className={styles.grid}>
                <Input.Redux
                    name="NitrogenGarageNumber"
                    label="Гаражный номер"
                    disabled={edit}
                />
                <Input.Redux
                    name="NitrogenPointsCount"
                    label="Кол-во точек заправки"
                    disabled={edit}
                />
            </div>
        </Form>
    )
}

export default reduxForm({
    form: "Nitrogen",
    initialValues: {},
    destroyOnUnmount: false,
})(Nitrogen)
