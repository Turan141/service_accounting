import React, { useCallback, useState } from "react"
import {
    Button,
    Checkbox,
    Icon,
    RadioButton,
    SearchField,
    useModal,
} from "react-lib"
import styles from "./SendSelectedList.module.scss"

interface SendSelectedListProps {
    close: () => void
}

type employeeType = {
    id: number
    name: string
    status: number
}

const employees: employeeType[] = [
    {
        id: 1,
        name: "Петров А.В.",
        status: 1,
    },
    {
        id: 2,
        name: "Сидоров А.В.",
        status: 2,
    },
    {
        id: 3,
        name: "Иванов А.В.",
        status: 3,
    },
    {
        id: 4,
        name: "Сомов А.В.",
        status: 2,
    },
    {
        id: 5,
        name: "Купатов А.В.",
        status: 1,
    },
]

const SendSelectedList: React.FC<SendSelectedListProps> = ({
    close,
}) => {
    let checkedEmployee: Number[] = []

    const [disabled, setDisabled] = useState(true)
    const [checkedValue, setChecked] = useState(
        employees.map(employee => {
            return { id: employee.id, checked: false }
        })
    )

    const { openModal } = useModal()


    return (
        <>
            <SearchField className={styles.search} placeholder="Поиск" />
            <div className={styles.employeeList}>
                {employees.map((employee, index) => (
                    <div className={styles.employee} key={employee.id}>
                        <Checkbox
                            name={employee.id.toString()}
                            label={employee.name}
                            id={employee.name}
                            checked={checkedValue[index].checked}
                        />
                    </div>
                ))}
            </div>
            <div className={styles.line} />
            <div className={styles.buttons}>
                <Button onClick={close} variant="text">
                    Закрыть
                </Button>
                <Button
                    icon={
                        <Icon
                            name={
                                "further"
                            }
                        />
                    }
                    type={"submit"}
                    onClick={close}
                >
                    Отправить
                </Button>
            </div>
        </>
    )
}

export default SendSelectedList
