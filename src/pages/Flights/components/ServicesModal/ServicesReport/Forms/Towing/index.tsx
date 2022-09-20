import React, { useState } from "react"
import styles from "../Forms.module.scss"
import { Form, DateInput, Select, Input } from "react-lib"
import { InjectedFormProps, reduxForm } from "redux-form"

const Towing: React.FC<InjectedFormProps> = () => {
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
                    name="arrivalStartWork"
                    label="Начало работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="arrivalStartTime"
                    label="Время начала"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="arrivalEndWork"
                    label="Окончание работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="arrivalEndTime"
                    label="Время окончания"
                    disabled={edit}
                />
            </div>
            <div className={styles.grid}>
                <Select.Redux
                    name="arrivalTowNumber"
                    label="Тягач №"
                    disabled={edit}
                >
                    {[1, 2, 3, 4, 5].map(value => (
                        <Select.Option
                            label={value.toString()}
                            value={value}
                            key={value}
                        />
                    ))}
                </Select.Redux>

                <Input.Redux
                    className={styles.gridAlt}
                    name="arrivalAdditionalInfo"
                    label="Дополнительная информация"
                    disabled={edit}
                />
            </div>
            <div className={styles.row}>
                <p>Прилет / План: 23:41-23:45 </p>
            </div>
            <div className={styles.grid}>
                <DateInput.Redux
                    name="departureStartWork"
                    label="Начало работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="departureStartTime"
                    label="Время начала"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="departureEndWork"
                    label="Окончание работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="departureEndTime"
                    label="Время окончания"
                    disabled={edit}
                />
            </div>
            <div className={styles.grid}>
                <Select.Redux
                    name="departureTowNumber"
                    label="tow"
                    disabled={edit}
                >
                    {[1, 2, 3, 4, 5].map(value => (
                        <Select.Option
                            label={value.toString()}
                            value={value}
                            key={value}
                        />
                    ))}
                </Select.Redux>

                <Input.Redux
                    className={styles.gridAlt}
                    name="departureAdditionalInfo"
                    label="Доп. информация"
                    disabled={edit}
                />
            </div>
        </Form>
    )
}

export default reduxForm({
    form: "Towing",
    initialValues: {},
    destroyOnUnmount: false,
})(Towing)
