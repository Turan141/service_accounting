import React from "react"
import classNames from "classnames"
import { Icon } from "react-lib"
import TransferButton from "@pages/Flights/components/TransferButton/TransferButton"
import styles from "./ServicesStatus.module.scss"

interface servicesStatusProps {
    status: string
    executorName?: string
    flight: any
}

const ServicesStatus: React.FC<servicesStatusProps> = ({
    status,
    executorName,
    flight
}) => {
    switch (status) {
        case "Await":
            return (
                <div className={styles.status}>
                    <div
                        className={classNames(styles.statusHeader, styles.blue)}
                    >
                        <Icon className={styles.clock} name={"statusClock"} />{" "}
                        <span>Ожидает распределения</span>
                    </div>
                    <div className={styles.executorStatusBlock}>
                        <span className={styles.executorTitle}>
                            Исполнитель
                        </span>
                        <div className={styles.executorStatus}>
                            <svg
                                width="22"
                                height="22"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle cx="11" cy="11" r="11" fill="#D7E0E9" />
                                <path
                                    d="M10.9992 11.0002C11.9108 11.0002 12.6492 10.2618 12.6492 9.3502C12.6492 8.43857 11.9108 7.7002 10.9992 7.7002C10.0876 7.7002 9.34922 8.43857 9.34922 9.3502C9.34922 10.2618 10.0876 11.0002 10.9992 11.0002ZM10.9992 11.8252C9.89784 11.8252 7.69922 12.3779 7.69922 13.4752V14.1002C7.69922 14.2107 7.78876 14.3002 7.89922 14.3002H14.0992C14.2097 14.3002 14.2992 14.2107 14.2992 14.1002V13.4752C14.2992 12.3779 12.1006 11.8252 10.9992 11.8252Z"
                                    fill="#9CB1C7"
                                />
                            </svg>
                            <span className={styles.name}>
                                {executorName
                                    ? executorName
                                    : "Еще не назначен"}
                            </span>
                        </div>
                    </div>
                    {executorName ? (
                        <TransferButton
                            //isFromModal={true}
                            flight={flight}
                            isChange={true}
                            submitButton={"Выбрать"}
                            position={"bottom right"}
                            triggerElement={
                                <span className={styles.assignBtn}>
                                    <Icon name={"agreed"} /> Изменить
                                    исполнителя{" "}
                                </span>
                            }
                        />
                    ) : (
                        <TransferButton
                            //isFromModal={true}
                            flight={flight}
                            submitButton={"Выбрать"}
                            position={"bottom right"}
                            triggerElement={
                                <span className={styles.assignBtn}>
                                    <Icon name={"agreed"} /> Назначить
                                    исполнителя{" "}
                                </span>
                            }
                        />
                    )}
                </div>
            )
        case "Pending":
            return (
                <div className={styles.status}>
                    <div
                        className={classNames(styles.statusHeader, styles.grey)}
                    >
                        <Icon
                            className={styles.statusUser}
                            name={"statusUser"}
                        />{" "}
                        <span>Взято в работу</span>
                    </div>
                    <div className={styles.executorStatusBlock}>
                        <span className={styles.executorTitle}>
                            Исполнитель
                        </span>
                        <div className={styles.executorStatus}>
                            <svg
                                width="22"
                                height="22"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle cx="11" cy="11" r="11" fill="#D7E0E9" />
                                <path
                                    d="M10.9992 11.0002C11.9108 11.0002 12.6492 10.2618 12.6492 9.3502C12.6492 8.43857 11.9108 7.7002 10.9992 7.7002C10.0876 7.7002 9.34922 8.43857 9.34922 9.3502C9.34922 10.2618 10.0876 11.0002 10.9992 11.0002ZM10.9992 11.8252C9.89784 11.8252 7.69922 12.3779 7.69922 13.4752V14.1002C7.69922 14.2107 7.78876 14.3002 7.89922 14.3002H14.0992C14.2097 14.3002 14.2992 14.2107 14.2992 14.1002V13.4752C14.2992 12.3779 12.1006 11.8252 10.9992 11.8252Z"
                                    fill="#9CB1C7"
                                />
                            </svg>
                            <span className={styles.name}>{executorName}</span>
                            <Icon
                                className={styles.message}
                                name={"messageProfile"}
                            />
                        </div>
                    </div>
                    <TransferButton
                        submitButton={"Добавить"}
                        position={"bottom right"}
                        triggerElement={
                            <span className={styles.assignBtn}>
                                <Icon name={"agreed"} /> Изменить исполнителя{" "}
                            </span>
                        }
                    />
                </div>
            )
        case "InProgress":
            return (
                <div className={styles.status}>
                    <div
                        className={classNames(
                            styles.statusHeader,
                            styles.orange
                        )}
                    >
                        <Icon className={styles.draft} name={"statusDraft"} />{" "}
                        <span>Приступили к выполнению</span>
                    </div>
                    <div className={styles.executorStatusBlock}>
                        <span className={styles.executorTitle}>
                            Исполнитель
                        </span>
                        <div className={styles.executorStatus}>
                            <svg
                                width="22"
                                height="22"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle cx="11" cy="11" r="11" fill="#D7E0E9" />
                                <path
                                    d="M10.9992 11.0002C11.9108 11.0002 12.6492 10.2618 12.6492 9.3502C12.6492 8.43857 11.9108 7.7002 10.9992 7.7002C10.0876 7.7002 9.34922 8.43857 9.34922 9.3502C9.34922 10.2618 10.0876 11.0002 10.9992 11.0002ZM10.9992 11.8252C9.89784 11.8252 7.69922 12.3779 7.69922 13.4752V14.1002C7.69922 14.2107 7.78876 14.3002 7.89922 14.3002H14.0992C14.2097 14.3002 14.2992 14.2107 14.2992 14.1002V13.4752C14.2992 12.3779 12.1006 11.8252 10.9992 11.8252Z"
                                    fill="#9CB1C7"
                                />
                            </svg>
                            <span className={styles.name}>{executorName}</span>
                            <Icon
                                className={styles.message}
                                name={"messageProfile"}
                            />
                        </div>
                    </div>
                </div>
            )
        case "Done":
            return (
                <div className={styles.status}>
                    <div
                        className={classNames(
                            styles.statusHeader,
                            styles.green
                        )}
                    >
                        <Icon className={styles.done} name={"statusDraft"} />{" "}
                        <span>Выполнено</span>
                    </div>
                    <div className={styles.executorStatusBlock}>
                        <span className={styles.executorTitle}>
                            Исполнитель
                        </span>
                        <div className={styles.executorStatus}>
                            <svg
                                width="22"
                                height="22"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle cx="11" cy="11" r="11" fill="#D7E0E9" />
                                <path
                                    d="M10.9992 11.0002C11.9108 11.0002 12.6492 10.2618 12.6492 9.3502C12.6492 8.43857 11.9108 7.7002 10.9992 7.7002C10.0876 7.7002 9.34922 8.43857 9.34922 9.3502C9.34922 10.2618 10.0876 11.0002 10.9992 11.0002ZM10.9992 11.8252C9.89784 11.8252 7.69922 12.3779 7.69922 13.4752V14.1002C7.69922 14.2107 7.78876 14.3002 7.89922 14.3002H14.0992C14.2097 14.3002 14.2992 14.2107 14.2992 14.1002V13.4752C14.2992 12.3779 12.1006 11.8252 10.9992 11.8252Z"
                                    fill="#9CB1C7"
                                />
                            </svg>
                            <span className={styles.name}>{executorName}</span>
                            <Icon
                                className={styles.message}
                                name={"messageProfile"}
                            />
                        </div>
                    </div>
                </div>
            )
        default:
            return <span>Исполнитель отсутствует</span>
    }
}

export default ServicesStatus
