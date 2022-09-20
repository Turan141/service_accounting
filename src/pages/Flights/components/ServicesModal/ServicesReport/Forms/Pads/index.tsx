import React, { useState } from "react"
import styles from "../Forms.module.scss"
import { Form, DateInput } from "react-lib"
import { InjectedFormProps, reduxForm } from "redux-form"

const Pads: React.FC<InjectedFormProps> = () => {
    const [edit, setEdit] = useState(false)

    return (
        <Form>
            <div className={styles.grid}>

                    <div className={styles.gridOne}>
                        <p>Прилет / План: 23:41-23:45 </p>
                    </div>


                    <div className={styles.gridTwo}>
                        <p>Вылет / План: 23:41-23:45 </p>
                    </div>

            </div>
            <div className={styles.grid}>

                    <DateInput.Redux
                        name="PadsStartWork"
                        label="Начало работ"
                        disabled={edit}
                    />


                    <DateInput.Redux
                        name="PadsStartTime"
                        label="Время начала"
                        disabled={edit}
                    />


                    <DateInput.Redux
                        name="PadsEndWork"
                        label="Окончание работ"
                        disabled={edit}
                    />


                    <DateInput.Redux
                        name="PadsEndTime"
                        label="Время окончания"
                        disabled={edit}
                    />

            </div>
        </Form>
    )
}

export default reduxForm({
    form: "Pads",
    initialValues: {},
    destroyOnUnmount: false,
})(Pads)
