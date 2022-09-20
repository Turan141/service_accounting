import React, { useState } from "react"
import styles from "../Forms.module.scss"
import { Form, DateInput, Select, Input } from "react-lib"
import { InjectedFormProps, reduxForm } from "redux-form"

const Ladder: React.FC<InjectedFormProps> = () => {
    const [edit, setEdit] = useState(false)
    const traps = ["Телескопический", "Прицепной", "Самоходный"]
    return (
        <Form>
            <div className={styles.row}>
                <div className={styles.header}>
                    <p>Прилет / Трап1 (План: 23:41-23:45)</p>
                </div>
            </div>
            <div className={styles.grid}>
                <DateInput.Redux
                    name="TrapOneArrivalStartWork"
                    label="Начало работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="TrapOneArrivalStartTime"
                    label="Время начала"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="TrapOneArrivalEndWork"
                    label="Окончание работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="TrapOneArrivalEndTime"
                    label="Время окончания"
                    disabled={edit}
                />
            </div>

            <div className={styles.grid}>
                <Select.Redux name="ladderOneArrivalType" label="Тип" disabled={edit}>
                    {traps.map(value => (
                        <Select.Option value={value} label={value} />
                    ))}
                </Select.Redux>
                <Select.Redux name="ladderOneArrivalNumber" label="№" disabled={edit}>
                    {[1, 2, 3, 4].map(value => (
                        <Select.Option value={value} label={value.toString()} />
                    ))}
                </Select.Redux>
            </div>

            <div className={styles.row}>
                <div className={styles.header}>
                    <p>Прилет / Трап2 (План: 23:41-23:45)</p>
                </div>
            </div>
            <div className={styles.grid}>
                <DateInput.Redux
                    name="TrapTwoArrivalStartWork"
                    label="Начало работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="TrapTwoArrivalStartTime"
                    label="Время начала"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="TrapTwoArrivalEndWork"
                    label="Окончание работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="TrapTwoArrivalEndTime"
                    label="Время окончания"
                    disabled={edit}
                />
            </div>

            <div className={styles.grid}>
                <Select.Redux name="ladderTwoArrivalType" label="Тип" disabled={edit}>
                    {traps.map(value => (
                        <Select.Option value={value} label={value} />
                    ))}
                </Select.Redux>
                <Select.Redux name="ladderTwoArrivalNumber" label="№" disabled={edit}>
                    {[1, 2, 3, 4].map(value => (
                        <Select.Option value={value} label={value.toString()} />
                    ))}
                </Select.Redux>
            </div>

            <div className={styles.row}>
                <div className={styles.header}>
                    <p>Прилет / Телетрап (План: 23:41-23:45)</p>
                </div>
            </div>
            <div className={styles.grid}>
                <DateInput.Redux
                    name="TeleTrapArrivalStartWork"
                    label="Начало работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="TeleTrapArrivalStartTime"
                    label="Время начала"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="TeleTrapArrivalEndWork"
                    label="Окончание работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="TeleTrapArrivalEndTime"
                    label="Время окончания"
                    disabled={edit}
                />
            </div>
            <div className={styles.row}>
                <div className={styles.header}>
                    <p>Вылет / Трап1 (План: 23:41-23:45)</p>
                </div>
            </div>
            <div className={styles.grid}>
                <DateInput.Redux
                    name="TrapOneDepartureStartWork"
                    label="Начало работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="TrapOneDepartureStartTime"
                    label="Время начала"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="TrapOneDepartureEndWork"
                    label="Окончание работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="TrapOneDepartureEndTime"
                    label="Время окончания"
                    disabled={edit}
                />
            </div>

            <div className={styles.grid}>
                <Select.Redux name="ladderOneDepartureType" label="Тип" disabled={edit}>
                    {traps.map(value => (
                        <Select.Option value={value} label={value} />
                    ))}
                </Select.Redux>
                <Select.Redux name="ladderOneDepartureNumber" label="№" disabled={edit}>
                    {[1, 2, 3, 4].map(value => (
                        <Select.Option value={value} label={value.toString()} />
                    ))}
                </Select.Redux>
            </div>

            <div className={styles.row}>
                <div className={styles.header}>
                    <p>Вылет / Трап2 (План: 23:41-23:45)</p>
                </div>
            </div>
            <div className={styles.grid}>
                <DateInput.Redux
                    name="TrapTwoDepartureStartWork"
                    label="Начало работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="TrapTwoDepartureStartTime"
                    label="Время начала"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="TrapTwoDepartureEndWork"
                    label="Окончание работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="TrapTwoDepartureEndTime"
                    label="Время окончания"
                    disabled={edit}
                />
            </div>

            <div className={styles.grid}>
                <Select.Redux name="ladderTwoDepartureType" label="Тип" disabled={edit}>
                    {traps.map(value => (
                        <Select.Option value={value} label={value} />
                    ))}
                </Select.Redux>
                <Select.Redux name="ladderTwoDepartureNumber" label="№" disabled={edit}>
                    {[1, 2, 3, 4].map(value => (
                        <Select.Option value={value} label={value.toString()} />
                    ))}
                </Select.Redux>
            </div>

            <div className={styles.row}>
                <div className={styles.header}>
                    <p>Вылет / Телетрап (План: 23:41-23:45)</p>
                </div>
            </div>
            <div className={styles.grid}>
                <DateInput.Redux
                    name="TeleTrapDepartureStartWork"
                    label="Начало работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="TeleTrapDepartureStartTime"
                    label="Время начала"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="TeleTrapDepartureEndWork"
                    label="Окончание работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="TeleTrapDepartureEndTime"
                    label="Время окончания"
                    disabled={edit}
                />
            </div>
        </Form>
    )
}

export default reduxForm({
    form: "Ladder",
    initialValues: {},
    destroyOnUnmount: false,
})(Ladder)
