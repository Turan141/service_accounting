import React, { useCallback, useState } from "react"
import { Button, Checkbox, Icon, RadioButton, SearchField, useModal } from "react-lib"
import styles from "./TransferFromModal.module.scss"
import AllTaskModal from "@pages/Flights/AllTask/AllTaskModal/AllTaskModal"

interface TransferFromModal {
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

const TransferFromModal: React.FC<TransferFromModal> = ({
    close,
}) => {
    let checkedEmployee: Number[] = []

    const [disabled, setDisabled] = useState(true)
    const [checkedValue, setChecked] = useState(employees.map((employee) => { return {id: employee.id, checked: false} }))

    const checked = (id: number, status: number) => {
        if (status === 1) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
        checkedEmployee.push(id)
    }

    const { openModal } = useModal()

    const showModal = useCallback(() => {
        openModal(AllTaskModal)
    }, [])

    return (
        <>
            <SearchField className={styles.search} placeholder='Поиск'/>
            <div className={styles.employeeList}>
                {employees.map((employee, index) => (
                    <div className={styles.employee} key={employee.id}>
                        <Checkbox
                            name={employee.id.toString()}
                            label={employee.name}
                            onChange={() =>
                                checked(employee.id, employee.status)
                            }
                        />
                        {employee.status === 1 ? (
                            <span className={styles.status}>
                                На рассмотрении
                            </span>
                        ) : null}
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
                            name={"add"}
                        />
                    }
                    type={"submit"}
                    onClick={showModal}
                    //disabled={disabled}
                >
                    Добавить
                </Button>
            </div>
        </>
    )
}

export default TransferFromModal
