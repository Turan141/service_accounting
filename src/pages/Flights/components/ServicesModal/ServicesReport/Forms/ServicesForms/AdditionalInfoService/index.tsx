import React, { useState } from "react"
import styles from "../../Forms.module.scss"
import { Form, Input } from "react-lib"
import { InjectedFormProps, reduxForm } from "redux-form"

const AdditionalInfoService: React.FC<InjectedFormProps> = () => {
    const [edit, setEdit] = useState(false)

    return (
        <Form>
            <div className={styles.row}>
                <div>
                    <p>Прилет / План: 23:41-23:45 </p>
                </div>
            </div>
            <div className={styles.grid}>
                <Input.Redux
                    className={styles.gridAll}
                    name="AdditionalInfoServiceArrival"
                    label="Доп. информация"
                    disabled={edit}
                />
            </div>
            <div className={styles.row}>
                <div>
                    <p>Прилет / План: 23:41-23:45 </p>
                </div>
            </div>
            <div className={styles.grid}>
                <Input.Redux
                    className={styles.gridAll}
                    name="AdditionalInfoServiceDeparture"
                    label="Доп. информация"
                    disabled={edit}
                />
            </div>
        </Form>
    )
}

export default reduxForm({
    form: "AdditionalInfoService",
    initialValues: {},
    destroyOnUnmount: false,
})(AdditionalInfoService)
