import React from "react"
import { Button, Icon, Modal, ModalComponentProps } from "react-lib"
import styles from "./AllTaskModal.module.scss"

const AllTaskModal: React.FC<ModalComponentProps> = ({
    isOpen,
    handleClose,
}) => {
    return (
        <Modal isOpen={isOpen} onClose={handleClose} style={{ width: "420px" }}>
            <div className={styles.modal}>
                <div className={styles.title}>
                    <h2> Работа передана Сидорову В.С.</h2>
                </div>
                <Button onClick={handleClose}>
                    {" "}
                    <Icon name={"done"} />
                    Вернуть работу
                </Button>
            </div>
        </Modal>
    )
}

export default AllTaskModal
