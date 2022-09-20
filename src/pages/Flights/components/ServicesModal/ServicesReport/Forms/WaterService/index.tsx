import React, { useState } from "react"
import styles from "../Forms.module.scss"
import { Form, DateInput, Select, Input } from "react-lib"
import { InjectedFormProps, reduxForm } from "redux-form"

const WaterService: React.FC<InjectedFormProps> = () => {
    const [edit, setEdit] = useState(false)
    const types = ["Заправка", 'Слив']
    return (
        <Form>
            <div className={styles.row}>
                <div className={styles.header}>
                    <p>Прилет / План: 23:41-23:45</p>
                </div>
            </div>
            <div className={styles.grid}>
                <DateInput.Redux
                    name="WaterServiceArrivalStartWork"
                    label="Начало работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="WaterServiceArrivalStartTime"
                    label="Время начала"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="WaterServiceArrivalEndWork"
                    label="Окончание работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="WaterServiceArrivalEndTime"
                    label="Время окончания"
                    disabled={edit}
                />
            </div>

            <div className={styles.grid}>
                <Select.Redux name="WaterServiceArrivalType1" label="Вид" disabled={edit}>
                    {types.map(value => (
                        <Select.Option value={value} label={value} />
                    ))}
                </Select.Redux>
                <Select.Redux name="WaterServiceArrivalType2" label="Вид" disabled={edit}>
                    {types.map(value => (
                        <Select.Option value={value} label={value} />
                    ))}
                </Select.Redux>
            </div>
            <div className={styles.row}>
                <div className={styles.header}>
                    <p>Вылет / План: 23:41-23:45</p>
                </div>
            </div>
            <div className={styles.grid}>
                <DateInput.Redux
                    name="WaterServiceDepartureStartWork"
                    label="Начало работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="WaterServiceDepartureStartTime"
                    label="Время начала"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="WaterServiceDepartureEndWork"
                    label="Окончание работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="WaterServiceDepartureEndTime"
                    label="Время окончания"
                    disabled={edit}
                />
            </div>

            <div className={styles.grid}>
                <Select.Redux name="WaterServiceDepartureType1" label="Вид" disabled={edit}>
                    {types.map(value => (
                        <Select.Option value={value} label={value} />
                    ))}
                </Select.Redux>
                <Select.Redux name="WaterServiceDepartureType2" label="Вид" disabled={edit}>
                    {types.map(value => (
                        <Select.Option value={value} label={value} />
                    ))}
                </Select.Redux>
            </div>
        </Form>
    )
}

export default reduxForm({
    form: "WaterService",
    initialValues: {},
    destroyOnUnmount: false,
})(WaterService)
