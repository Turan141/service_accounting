
import React from "react"
import { Button, Icon, Modal, ModalComponentProps, Textarea } from "react-lib"
import styles from "./CreateEmergencyModal.module.scss"
import SendSelected from "./SendSelected"

const CreateEmergencyModal: React.FC<ModalComponentProps> = ({
    isOpen,
    handleClose,
}) => {
    return (
        <Modal isOpen={isOpen} onClose={handleClose} style={{ width: "700px" }}>
            <div className={styles.modal}>
                <h1 className={styles.title}>
                    Создание экстренного оповещения
                </h1>
                <Textarea
                    className={styles.textField}
                    placeholder="Текст оповещения"
                />
                <div className={styles.controls}>
                    {/* <Button
                        className={styles.controls_first_button}
                        variant={"text"}
                        onClick={handleClose}
                    >
                        Отправить выбранным
                    </Button> */}
                    <SendSelected
                        triggerElement={
                            <span className={styles.controls_first_button}>
                                Отправить выбранным
                            </span>
                        }
                        position={"bottom left"}
                        submitButton={"Добавить"}
                    />
                    <Button onClick={handleClose}>
                        {" "}
                        <Icon name={"done"} /> Отправить всем
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default CreateEmergencyModal
