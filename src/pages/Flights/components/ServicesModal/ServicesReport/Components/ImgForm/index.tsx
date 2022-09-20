import React, { FC, useState } from "react"
import styles from "./ImgForm.module.scss"

import download from "@assets/images/download.svg"
import photoZoom from "@assets/images/photoZoom.svg"
import ImgModal from "../ImgModal"


interface ImgFormProps {
    img?: any
    date?: string
    label?: string
}

const ImgForm: FC<ImgFormProps> = ({ img, date, label }) => {
    const [show, setShow] = useState(false)
    const handlerClose = () => {
        setShow(false)
    }

    const stop = (e: React.MouseEvent<HTMLDivElement>) => e.preventDefault()

    return (
        <>
            <div className={styles.container}>
                <div className={styles.imgContainer}>
                    <img src={img} className={styles.img} />
                </div>
                <div className={styles.controls}>
                    <a href={img} download>
                        <img src={download}></img>
                    </a>
                    <button
                        onClick={() => setShow(!show)}
                        className={styles.zoom}
                    >
                        <img src={photoZoom}></img>
                    </button>
                </div>
                {label ? (
                    <div className={styles.label}>
                        <p>{label}</p>
                    </div>
                ) : null}
                <div className={styles.date}>
                    <p>{date}</p>
                </div>
                <div className={styles.comment}>
                    <p>Комментарий</p>
                </div>
            </div>
            <ImgModal open={show} setOpen={() => setShow(false)} img={img} text=''/>
        </>
    )
}

export default ImgForm
