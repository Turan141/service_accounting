import React, { useState } from "react"
import styles from "../Forms.module.scss"
import { Form, DateInput, Select, Input } from "react-lib"
import { InjectedFormProps, reduxForm } from "redux-form"

const Passengers: React.FC<InjectedFormProps> = () => {
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
                    name="PassengersArrivalStartWork"
                    label="Начало работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="PassengersArrivalStartTime"
                    label="Время начала"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="PassengersArrivalEndWork"
                    label="Окончание работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="PassengersArrivalEndTime"
                    label="Время окончания"
                    disabled={edit}
                />
            </div>

            <div className={styles.grid}>
                <Select.Redux
                    name="PassengersArrivalEco"
                    label="Эконом"
                    disabled={edit}
                >
                    {[1,2,3,4].map(value => (
                        <Select.Option value={value} label={value.toString()} />
                    ))}
                </Select.Redux>
                <Select.Redux
                    name="PassengersArrivalBusiness"
                    label="Бизнес"
                    disabled={edit}
                >
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
                    name="PassengersDepartureStartWork"
                    label="Начало работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="PassengersDepartureStartTime"
                    label="Время начала"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="PassengersDepartureEndWork"
                    label="Окончание работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="PassengersDepartureEndTime"
                    label="Время окончания"
                    disabled={edit}
                />
            </div>

            <div className={styles.grid}>
                <Select.Redux
                    name="PassengersDepartureEco"
                    label="Эконом"
                    disabled={edit}
                >
                    {[1,2,3,4].map(value => (
                        <Select.Option value={value} label={value.toString()} />
                    ))}
                </Select.Redux>
                <Select.Redux
                    name="PassengersDepartureBusiness"
                    label="Бизнес"
                    disabled={edit}
                >
                    {[1, 2, 3, 4].map(value => (
                        <Select.Option value={value} label={value.toString()} />
                    ))}
                </Select.Redux>
            </div>
        </Form>
    )
}

export default reduxForm({
    form: "Passengers",
    initialValues: {},
    destroyOnUnmount: false,
})(Passengers)
