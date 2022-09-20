import React, { useState } from "react"
import styles from "../Forms.module.scss"
import { Form, DateInput, Select, Input } from "react-lib"
import { InjectedFormProps, reduxForm } from "redux-form"

const Electro: React.FC<InjectedFormProps> = () => {
    const [edit, setEdit] = useState(false)
    const traps = ["Стационарный", 'Передвижной']
    return (
        <Form>
            <div className={styles.row}>
                <div className={styles.header}>
                    <p>Прилет / План: 23:41-23:45</p>
                </div>
            </div>
            <div className={styles.grid}>
                <DateInput.Redux
                    name="ElectroArrivalStartWork"
                    label="Начало работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="ElectroArrivalStartTime"
                    label="Время начала"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="ElectroArrivalEndWork"
                    label="Окончание работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="ElectroArrivalEndTime"
                    label="Время окончания"
                    disabled={edit}
                />
            </div>

            <div className={styles.grid}>
                <Select.Redux name="ElectroArrivalType" label="Вид" disabled={edit}>
                    {traps.map(value => (
                        <Select.Option value={value} label={value} />
                    ))}
                </Select.Redux>
                <Select.Redux name="ElectroArrivalNumber" label="Передвижной №" disabled={edit}>
                    {[1, 2, 3, 4].map(value => (
                        <Select.Option value={value} label={value.toString()} />
                    ))}
                </Select.Redux>
                <Select.Redux name="ElectroArrivalNumber" label="Источник элект.." disabled={edit}>
                    {[1, 2, 3, 4].map(value => (
                        <Select.Option value={value} label={value.toString()} />
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
                    name="ElectroDepartureStartWork"
                    label="Начало работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="ElectroDepartureStartTime"
                    label="Время начала"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="ElectroDepartureEndWork"
                    label="Окончание работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="ElectroDepartureEndTime"
                    label="Время окончания"
                    disabled={edit}
                />
            </div>

            <div className={styles.grid}>
                <Select.Redux name="ElectroDepartureType" label="Вид" disabled={edit}>
                    {traps.map(value => (
                        <Select.Option value={value} label={value} />
                    ))}
                </Select.Redux>
                <Select.Redux name="ElectroDepartureNumber" label="Передвижной №" disabled={edit}>
                    {[1, 2, 3, 4].map(value => (
                        <Select.Option value={value} label={value.toString()} />
                    ))}
                </Select.Redux>
                <Select.Redux name="ElectroDepartureNumber" label="Источник элект.." disabled={edit}>
                    {[1, 2, 3, 4].map(value => (
                        <Select.Option value={value} label={value.toString()} />
                    ))}
                </Select.Redux>
            </div>
        </Form>
    )
}

export default reduxForm({
    form: "Electro",
    initialValues: {},
    destroyOnUnmount: false,
})(Electro)
