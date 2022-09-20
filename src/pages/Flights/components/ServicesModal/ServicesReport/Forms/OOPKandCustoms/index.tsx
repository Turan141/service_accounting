import React, { useState } from "react"
import styles from "../Forms.module.scss"
import { Form, DateInput } from "react-lib"
import { InjectedFormProps, reduxForm } from "redux-form"

const OOPKandCustoms: React.FC<InjectedFormProps> = () => {
    const [edit, setEdit] = useState(false)

    return (
        <Form>
            <div className={styles.row}>
                <div>
                    <p>Прилет / План: 23:41-23:45 </p>
                </div>
            </div>
            <div className={styles.grid}>
                <DateInput.Redux
                    name="OOPKandCustomsStartWork"
                    label="Начало работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="OOPKandCustomsStartTime"
                    label="Время начала"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="OOPKandCustomsEndWork"
                    label="Окончание работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="OOPKandCustomsEndTime"
                    label="Время окончания"
                    disabled={edit}
                />
            </div>
        </Form>
    )
}

export default reduxForm({
    form: "OOPKandCustoms",
    initialValues: {},
    destroyOnUnmount: false,
})(OOPKandCustoms)
