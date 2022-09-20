import React, { useState } from "react"
import styles from "./Spoiler.module.scss"
import { H4 } from "react-lib"

interface SpoilerProps {
    name: string
    form: React.ReactElement
}

const Spoiler: React.FC<SpoilerProps> = ({ name, form }) => {
    const [style, setStyle] = useState(false)
    const [edit, setEdit] = useState(true)

    const renderForm = () => (
        <div className={styles.containerForm}>
            <div className={styles.wrapperForm}>
                {form}
            </div>
        </div>
    )

    const renderContent = () => {
        return (
            <div className={!style ? styles.rootMin : styles.root}>
                <div className={styles.container}>
                    <div
                        className={styles.wrapper}
                        onClick={() => setStyle(!style)}
                    >
                        <div className={styles.header}>
                            <H4 className={styles.spoilerName}>{name}</H4>
                            {!style ? null : (
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={() => setEdit(!edit)}
                                >
                                    <path
                                        d="M3.89645 11.9164C3.80268 12.0101 3.75 12.1373 3.75 12.2699V13.75C3.75 14.0261 3.97386 14.25 4.25 14.25H5.73009C5.8627 14.25 5.98987 14.1973 6.08364 14.1036L12.388 7.79923L10.2008 5.61203L3.89645 11.9164ZM14.0794 6.1078C14.3069 5.88033 14.3069 5.51288 14.0794 5.28541L12.7146 3.9206C12.4871 3.69313 12.1197 3.69313 11.8922 3.9206L10.8249 4.98795L13.012 7.17515L14.0794 6.1078Z"
                                        fill="#3964D8"
                                    />
                                </svg>
                            )}
                        </div>
                        <div className={styles.spoilerArrow}>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle
                                    opacity="0.2"
                                    cx="12"
                                    cy="12"
                                    r="9"
                                    fill="#9CB1C7"
                                />
                                <path
                                    d="M9.35355 10.1464C9.15829 9.95118 8.84171 9.95118 8.64645 10.1464C8.45118 10.3417 8.45118 10.6583 8.64645 10.8536L11.6462 13.8533C11.8414 14.0485 12.1583 14.0488 12.3536 13.8536L15.3536 10.8536C15.5488 10.6583 15.5488 10.3417 15.3536 10.1464C15.1583 9.95118 14.8417 9.95118 14.6464 10.1464L12 12.7929L9.35355 10.1464Z"
                                    fill="#131D2D"
                                />
                            </svg>
                        </div>
                    </div>
                    {!style ? null : renderForm()}
                </div>
            </div>
        )
    }

    return <>{renderContent()}</>
}

export default Spoiler
