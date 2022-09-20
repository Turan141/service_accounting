import React, { FC } from 'react'
import styles from './Message.module.scss'
 
interface MessageProps {
    type: 'Incoming' | 'Outgoing'
    message: string
    time: string
}

const Message: FC<MessageProps> = ({ type, message, time }) => {
    return (
        <div className={type === 'Incoming'? styles.rootIncoming : styles.rootOutgoing}>
            <div className={styles.messageContainer}>
                <div className={type === 'Incoming'? styles.messageIncomingWrapper : styles.messageOutgoingWrapper}>
                    <p className={type === 'Incoming'? styles.incomingText : styles.outgoingText}>{message}</p>
                </div>
            </div>
            <div className={styles.timeContainer}>
                <p className={styles.time}>{time}</p>
            </div>
        </div>
    )
}

export default Message