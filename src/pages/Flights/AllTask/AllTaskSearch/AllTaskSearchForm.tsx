// Core
import React from "react"

import { InjectedFormProps, reduxForm, destroy } from "redux-form"
import { useDispatch } from "react-redux"
import { Dispatch } from "redux"

// Components
import { Button, DateInput, Form, Icon, MultiSelect, Select } from "react-lib"

// Styles
import styles from "./SearchForm.module.scss"

// Shapes
import { usersShape } from "@bus/users/shapes"

type ShapeType = typeof usersShape.contacts.shape

interface CandidatesFilterProps {
    handleClose: () => void
    props: InjectedFormProps
    setSubmitted?: any
}

const onFormChange = (
    values: any,
    dispatch: Dispatch,
    _: any,
    prevValues: any
) => {}

const onFormSubmit = (e: any, dispatch: Dispatch, props: any) => {
    e.preventDefault()
}

const AllTaskSearchForm: React.FC<
    CandidatesFilterProps & InjectedFormProps<ShapeType>
> = props => {
    const optionsGroup: string[] = [
        "Название подразделения 1",
        "Название подразделения 2",
    ]

    const dispatch = useDispatch()
    const { handleClose, setSubmitted } = props

    console.log(setSubmitted)

    return (
        <Form
            onSubmit={e => onFormSubmit(e, dispatch, { setSubmitted })}
            className={styles.form}
        >
            <div className={styles["form-row"]}>
                <div className={styles["form-control-division"]}>
                    <MultiSelect.Redux label="Подразделение" name="division">
                        <MultiSelect.OptGroup>
                            {optionsGroup.map(option => (
                                <MultiSelect.Option
                                    key={option}
                                    value={option}
                                    label={option}
                                />
                            ))}
                        </MultiSelect.OptGroup>
                    </MultiSelect.Redux>
                </div>
            </div>
            <div className={styles["form-row"]}>
                <div className={styles["form-control-position"]}>
                    <Select.Redux label="Должность" name="position">
                        <Select.Option
                            value={1}
                            label="Первый вариант"
                            selected={true}
                        />
                        <Select.Option value={2} label="Второй вариант" />
                    </Select.Redux>
                </div>
            </div>
            <div className={styles["form-row"]}>
                <div className={styles["form-control-from"]}>
                    <DateInput.Redux label="От" name="from" />
                </div>
                <div className={styles["form-control-before"]}>
                    <DateInput.Redux label="До" name="before" />
                </div>
            </div>

            <div className={styles.buttons}>
                <Button
                    onClick={() => {
                        dispatch(destroy("personsFilter"))
                        handleClose()
                    }}
                    variant="text"
                >
                    Отменить
                </Button>
                <Button
                    icon={<Icon name="done" />}
                    type={"submit"}
                    onClick={() => {
                        setTimeout(handleClose, 100)
                    }}
                >
                    Применить
                </Button>
            </div>
        </Form>
    )
}

export default reduxForm({
    form: "AllTaskSearchForm",
    initialValues: {},
    destroyOnUnmount: false,
    onChange: onFormChange,
    onSubmit: onFormSubmit,
})(AllTaskSearchForm)
