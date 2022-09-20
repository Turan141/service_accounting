import React, { FC } from "react"
import styles from "./Chat.module.scss"
import Message from "./components/Message"
import profile from "@assets/images/profile.png"
import { Input, Scrollbar } from "react-lib"
import send from '@assets/images/send.svg'

const Chat: FC = () => {
    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <img className={styles.avatar} src={profile} alt="profileImg" />
                <div className={styles.nameWrapper}>
                    <p>Диспетчер</p>
                    <p>Анна Кот</p>
                </div>
            </div>
            <div className={styles.line} />
            <Scrollbar className={styles.scrollBar}>
                <div className={styles.dateContainer}>
                    <p className={styles.dateHeader}>14 июня 2021г.</p>
                    <Message type="Incoming" message="Привет!" time="15:30" />
                    <Message
                        type="Incoming"
                        message="Я диспетчер!"
                        time="15:30"
                    />
                    <Message type="Outgoing" message="Привет!" time="15:30" />
                </div>
                <div className={styles.dateContainer}>
                    <p className={styles.dateHeader}>14 июня 2021г.</p>
                    <Message type="Incoming" message="Привет!" time="15:30" />
                    <Message
                        type="Incoming"
                        message="Есть ли возможность осуществить буксировку в 16:00?"
                        time="15:30"
                    />
                    <Message
                        type="Outgoing"
                        message="Для этого необходимо создать заявку"
                        time="15:30"
                    />
                </div>
            </Scrollbar>
            <div className={styles.line} />
            <div className={styles.sendField}>
                <input type='text' className={styles.send} placeholder='Введите сообщение...' />
                <img src={send} className={styles.sendButton} alt='send'/>       
            </div>
        </div>
    )
}
export default Chat
