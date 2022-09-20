import React from "react"
import { Button, Icon, Modal, ModalComponentProps } from "react-lib"
import styles from "./AllTaskIncomingModal.module.scss"

const AllTaskIncomingModal: React.FC<ModalComponentProps> = ({
    isOpen,
    handleClose,
}) => {
    return (
        <Modal isOpen={isOpen} onClose={handleClose} style={{ width: "552px" }}>
            <div className={styles.modal}>
                <div className={styles.title}>
                    <h2>Передача работы</h2>
                </div>
                <div className={styles.text}>
                    <p>
                        Иванов В.А. просит вас принять в работу: ООП,
                        Буксировка, Предоставление автомашины для сопровождения
                        при буксировке ВС через ВПП
                    </p>
                </div>
                <div className={styles.controls}>
                    <Button variant={"text"} onClick={handleClose}>
                        Не принимать
                    </Button>
                    <Button onClick={handleClose}>
                        {" "}
                        <Icon name={"done"} /> Принять
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default AllTaskIncomingModal
