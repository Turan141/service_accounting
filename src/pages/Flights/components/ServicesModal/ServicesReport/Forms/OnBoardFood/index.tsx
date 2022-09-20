import React, { useState } from "react"
import styles from "../Forms.module.scss"
import { Form, DateInput, Select, Input } from "react-lib"
import { InjectedFormProps, reduxForm } from "redux-form"

const OnBoardFood: React.FC<InjectedFormProps> = () => {
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
                    name="OnBoardFoodArrivalStartWork"
                    label="Начало работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="OnBoardFoodArrivalStartTime"
                    label="Время начала"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="OnBoardFoodArrivalEndWork"
                    label="Окончание работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="OnBoardFoodArrivalEndTime"
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
                    name="OnBoardFoodDepartureStartWork"
                    label="Начало работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="OnBoardFoodDepartureStartTime"
                    label="Время начала"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="OnBoardFoodDepartureEndWork"
                    label="Окончание работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="OnBoardFoodDepartureEndTime"
                    label="Время окончания"
                    disabled={edit}
                />
            </div>
        </Form>
    )
}

export default reduxForm({
    form: "OnBoardFood",
    initialValues: {},
    destroyOnUnmount: false,
})(OnBoardFood)
