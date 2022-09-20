import React, { useState } from "react"
import styles from "../Forms.module.scss"
import { Form, DateInput, Select, Input } from "react-lib"
import { InjectedFormProps, reduxForm } from "redux-form"

const Mail: React.FC<InjectedFormProps> = () => {
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
                    name="MailArrivalStartWork"
                    label="Начало работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="MailArrivalStartTime"
                    label="Время начала"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="MailArrivalEndWork"
                    label="Окончание работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="MailArrivalEndTime"
                    label="Время окончания"
                    disabled={edit}
                />
            </div>

            <div className={styles.grid}>
                <Select.Redux name="TypeOfMail1" label="Вид">
                    {["Груз", "Почта", "Дип. почта"].map(value => (
                        <Select.Option value={value} label={value} />
                    ))}
                </Select.Redux>
                <Input.Redux label="Масса" name="ArrivalMassOfMail1" />
                <Input.Redux label="Мест" name="ArrivalPlaceOfMail1" />
            </div>

            <div className={styles.grid}>
                <Select.Redux name="TypeOfMail2" label="Вид">
                    {["Груз", "Почта", "Командирская почта"].map(value => (
                        <Select.Option value={value} label={value} />
                    ))}
                </Select.Redux>
                <Input.Redux label="Масса" name="ArrivalMassOfMail2" />
                <Input.Redux label="Мест" name="ArrivalPlaceOfMail2" />
            </div>
            <div className={styles.row}>
                <div className={styles.header}>
                    <p>Вылет / План: 23:41-23:45</p>
                </div>
            </div>
            <div className={styles.grid}>
                <DateInput.Redux
                    name="MailDepartureStartWork"
                    label="Начало работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="MailDepartureStartTime"
                    label="Время начала"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="MailDepartureEndWork"
                    label="Окончание работ"
                    disabled={edit}
                />

                <DateInput.Redux
                    name="MailDepartureEndTime"
                    label="Время окончания"
                    disabled={edit}
                />
            </div>

            <div className={styles.grid}>
                <Select.Redux name="TypeOfMail1" label="Вид">
                    {["Груз", "Почта", "Дип. почта"].map(value => (
                        <Select.Option value={value} label={value} />
                    ))}
                </Select.Redux>
                <Input.Redux label="Масса" name="DepartureMassOfMail1" />
                <Input.Redux label="Мест" name="DeparturePlaceOfMail1" />
            </div>

            <div className={styles.grid}>
                <Select.Redux name="TypeOfMail2" label="Вид">
                    {["Груз", "Почта", "Командирская почта"].map(value => (
                        <Select.Option value={value} label={value} />
                    ))}
                </Select.Redux>
                <Input.Redux label="Масса" name="DepartureMassOfMail2" />
                <Input.Redux label="Мест" name="DeparturePlaceOfMail2" />
            </div>

            <div className={styles.row}>
                <div className={styles.header}>
                    <p>Возврат груза/почты 1</p>
                </div>
            </div>
            <div className={styles.grid}>
                <Input.Redux
                    name="ReturnMail1"
                    label="№ авианакладной"
                    disabled={edit}
                />

                <Input.Redux
                    name="ReturnMailPlacesCount1"
                    label="Кол-во мест по накла.."
                    disabled={edit}
                />

                <Input.Redux
                    name="ReturnMailPlaces1"
                    label="Кол-во снятых мест"
                    disabled={edit}
                />

                <Input.Redux
                    name="ReturnMailMass1"
                    label="Вес"
                    disabled={edit}
                />
            </div>
            <div className={styles.grid}>
                <Input.Redux
                    name="ReturnReason1"
                    label="Причина возврата"
                    classname={styles.gridAll}
                />
            </div>
            <div className={styles.row}>
                <div className={styles.header}>
                    <p>Возврат груза/почты 2</p>
                </div>
            </div>
            <div className={styles.grid}>
                <Input.Redux
                    name="ReturnMail2"
                    label="№ авианакладной"
                    disabled={edit}
                />

                <Input.Redux
                    name="ReturnMailPlacesCount2"
                    label="Кол-во мест по накла.."
                    disabled={edit}
                />

                <Input.Redux
                    name="ReturnMailPlaces2"
                    label="Кол-во снятых мест"
                    disabled={edit}
                />

                <Input.Redux
                    name="ReturnMailMass2"
                    label="Вес"
                    disabled={edit}
                />
            </div>
            <div className={styles.grid}>
                <Input.Redux
                    name="ReturnReason2"
                    label="Причина возврата"
                    className={styles.gridAll}
                />
            </div>
        </Form>
    )
}

export default reduxForm({
    form: "Mail",
    initialValues: {},
    destroyOnUnmount: false,
})(Mail)
