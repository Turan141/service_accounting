import React, { useState } from "react"
import styles from "../../Forms.module.scss"
import { Form, DateInput, Select, Input } from "react-lib"
import { InjectedFormProps, reduxForm } from "redux-form"

const Cooling: React.FC<InjectedFormProps> = () => {
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
                    name="CoolingArrivalStartWork"
                    label="Начало работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="CoolingArrivalStartTime"
                    label="Время начала"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="CoolingArrivalEndWork"
                    label="Окончание работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="CoolingArrivalEndTime"
                    label="Время окончания"
                    disabled={edit}
                />
            </div>

            <div className={styles.grid}>
                <Select.Redux
                    name="CoolingTypeOne"
                    label="Эконом"
                    disabled={edit}
                >
                    {["Стационарный", "Передвижной"].map(value => (
                        <Select.Option value={value} label={value.toString()} />
                    ))}
                </Select.Redux>
                <Select.Redux
                    name="CoolingTypeTwo"
                    label="Бизнес"
                    disabled={edit}
                >
                    {["Стационарный", "Передвижной"].map(value => (
                        <Select.Option value={value} label={value.toString()} />
                    ))}
                </Select.Redux>
                <Input.Redux name="CoolingNumber" label="№" />
            </div>
        </Form>
    )
}

export default reduxForm({
    form: "Cooling",
    initialValues: {},
    destroyOnUnmount: false,
})(Cooling)
