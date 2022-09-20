import React, { FC, useState } from "react"
import styles from "./ImgModal.module.scss"

import close from "@assets/images/close.svg"


interface ImgModalProps {
    open: boolean;
    setOpen: () => void
    img: any;
    text: string
}

const ImgModal: FC<ImgModalProps> = ({ open, setOpen, img, text }) => {

    return (
        <>
            {open ? (
                <div className={styles.root}>
                    <button
                        className={styles.close}
                        onClick={setOpen}
                    >
                        <img src={close} />
                    </button>
                    <div className={styles.imgWrapper}>
                        <img src={img} className={styles.rootImg} />
                        <p className={styles.description}>
                            {text}
                        </p>
                        <p className={styles.author}>
                            Петров А.В., 26.08.2021, 15:10
                        </p>
                    </div>
                </div>
            ) : null}
        </>
    )
}

export default ImgModal
