import React, { FC, useEffect, useState } from "react"
import styles from "./Signature.module.scss"
import baseApi from "@src/api/baseApi"
import { AxiosRequestConfig } from "axios"

import { useSelector } from "react-redux"
import { getServices } from "@src/bus/services/selectors"

interface SignatureProps {
    img?: any
    date?: string
    label?: string
}

const Signature: FC<SignatureProps> = ({ img, date, label }) => {

    const stop = (e: React.MouseEvent<HTMLDivElement>) => e.preventDefault()

    const [image, setImage] = useState<any>()
    const [signInfo, setSignInfo] = useState<any>()

    const services: any = useSelector(getServices)?.data
    // console.log(`services.data: `, services)



    useEffect(() => {
        if (services) {
            // поиск id ТКО для получения подписи
            let pooId = 0;
            services.result.forEach((service: any) => {
                if (service.taskType === 'DeicingTreatment') pooId = service.id
            })
            const request = baseApi.getClient()
            const options: AxiosRequestConfig = {
                url: '/clients/Treatment/GetSignedImageByTreatmentId',
                method: 'GET',
                params: {
                    TreatmentId: pooId
                }
            }
            request(options).then(response => setImage(response))
            const info: AxiosRequestConfig = {
                url: '/clients/Treatment/GetDeIcingTreatmentById',
                method: 'GET',
                params: {
                    TreatmentId: pooId
                }
            }
            request(options).then(response => setImage(response))
            request(info).then(response => setSignInfo(response))
        }
    }, [services])

    return (
        <>
            {
                image && signInfo?
                    <div className={styles.container}>
                        <p className={styles.text}>Подпись заказчика</p>
                        <img src={'data:image/png;base64,'+image?.data?.url} alt='signature' />
                        <div className={styles.line} />
                        <p className={styles.name}>{signInfo?.data?.signedFIO}</p>
                    </div>
                : <span>Подпись отсутствует.</span>
            }
        </>
    )
}

export default Signature
