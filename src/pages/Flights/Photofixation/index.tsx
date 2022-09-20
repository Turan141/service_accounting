import React, { useMemo, FC, useState } from "react"
import { Pagination, SearchField, Table } from "react-lib"
import { useFlexLayout } from "react-table"
import AllTaskSearch from "../AllTask/AllTaskSearch/AllTaskSearch"
import styles from "./Photofixation.module.scss"
import air from "@assets/images/air.png"
import ImgModal from "../components/ServicesModal/ServicesReport/Components/ImgModal"
const Photofixations: FC = () => {
    const [open, setOpen] = useState(false)

    const data = [
        {
            id: 1,
            emergencyText: "72456663",
            creationDate: "08.06.2021",
            creationTime: "15:10",
            employee: "Петров А.В.",
            comment:
                "Перрон: Предоставление автомашины для сопровождения при буксировке ВС через ВПП…",
        },
        {
            id: 2,
            emergencyText: "72456663",
            imagePhotofixation: "№ фото",
            creationDate: "08.06.2021",
            creationTime: "15:10",
            employee: "Шакуров П.А.",
            comment: "Рейс",
        },
        {
            id: 3,
            emergencyText: "72456663",
            imagePhotofixation: "№ фото",
            creationDate: "08.06.2021",
            creationTime: "15:10",
            employee: "Петров А.В.",
            comment: "Рейс",
        },
        {
            id: 4,
            emergencyText: "72456663",
            imagePhotofixation: "№ фото",
            creationDate: "08.06.2021",
            creationTime: "15:10",
            employee: "Петров А.В.",
            comment: "Предоставление",
        },
        {
            id: 5,
            emergencyText: "72456663",
            imagePhotofixation: "№ фото",
            creationDate: "08.06.2021",
            creationTime: "15:10",
            employee: "Петров А.В.",
            comment: "Переполнена мусорка",
        },
        {
            id: 6,
            emergencyText: "72456663",
            imagePhotofixation: "№ фото",
            creationDate: "08.06.2021",
            creationTime: "15:10",
            employee: "Петров А.В.",
            comment: "Переполнена",
        },
        {
            id: 7,
            emergencyText: "72456663",
            imagePhotofixation: "№ фото",
            creationDate: "08.06.2021",
            creationTime: "15:10",
            employee: "Петров А.В.",
            comment: "Переполнена",
        },
        {
            id: 8,
            emergencyText: "72456663",
            imagePhotofixation: "№ фото",
            creationDate: "08.06.2021",
            creationTime: "15:10",
            employee: "Петров А.В.",
            comment:
                "Перрон: Предоставление автомашины для сопровождения при буксировке ВС",
        },
        {
            id: 9,
            emergencyText: "72456663",
            imagePhotofixation: "№ фото",
            creationDate: "08.06.2021",
            creationTime: "15:10",
            employee: "Петров А.В.",
            comment: "Предоставление автомашины для сопровождения",
        },
    ]

    const columns = useMemo(
        () => [
            {
                Header: "№ фото",
                accessor: "emergencyText",
            },
            {
                Header: "Фото",
                accessor: "id",
                Cell: ({ value }: any) => {
                    return (
                        <img
                            src={air}
                            className={styles.img}
                            alt="more"
                            onClick={() => setOpen(true)}
                        />
                    )
                },
            },
            {
                Header: "Дата создания",
                accessor: "creationDate",
            },
            {
                Header: "Время создания",
                accessor: "creationTime",
            },
            {
                Header: "Сотрудник",
                accessor: "employee",
            },
            {
                Header: "Коментарий",
                accessor: "comment",
            },
        ],
        []
    )

    return (
        <div className={styles.root}>
            {/* <div className={styles.content_emergency}> */}
            <div className={styles.searchBlock}>
                <div className={styles.search}>
                    <div>
                        <SearchField placeholder="Поиск" />
                    </div>
                    <div>
                        <AllTaskSearch />
                    </div>
                </div>
            </div>
            <div className={styles.form_block}>
                <Table
                    className={styles.table}
                    data={data}
                    columns={columns}
                    tableHooks={[useFlexLayout]}
                />
                <Pagination
                    className={styles.pagination}
                    total={5}
                    countInPage={5}
                    page={1}
                    setCountInPage={() => {}}
                    setPage={() => {}}
                />
            </div>
            {/* </div> */}
            <ImgModal
                img={air}
                open={open}
                setOpen={() => setOpen(false)}
                text="Перрон: Предоставление машины для буксировки. Валяется мусор."
            />
        </div>
    )
}
export default Photofixations
