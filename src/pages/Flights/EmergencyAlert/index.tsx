import React, { useCallback, useMemo } from 'react'
import { Button, Pagination, SearchField, Table, useModal } from 'react-lib';
import { useFlexLayout } from 'react-table';
import AllTaskSearch from '../AllTask/AllTaskSearch/AllTaskSearch';
import cls from './EmergencyAlert.module.scss';
import more from "@assets/images/more.svg";
import CreateEmergencyModal from './CreateEmergencyModal';
import ControlColumn from './ControlColumn';
import {checkAccess} from "@helpers/utils";

const EmergencyAlert = () => {
    const { openModal } = useModal()
    const showModal = useCallback(() => openModal(CreateEmergencyModal),[])

    const data = [
        {
            id: 1,
            emergencyText: 'Начался ураган!',
            creationDate: '08.06.2021',
            creationTime: '15:10',
            author: 'Шакуров П.А.'
        },
        {
            id: 2,
            emergencyText: 'Начался ураган!',
            creationDate: '08.06.2021',
            creationTime: '15:10',
            author: 'Шакуров П.А.'
        },
        {
            id: 3,
            emergencyText: 'Начался ураган!',
            creationDate: '08.06.2021',
            creationTime: '15:10',
            author: 'Шакуров П.А.'
        }
    ];

    const columns = useMemo(
        () => [
            {
                Header: "Текст оповещения",
                accessor: "emergencyText",
            },
            {
                Header: "Дата создания",
                accessor: "creationDate",
            },
            {
                Header: 'Время создания',
                accessor: 'creationTime'
            },
            {
                Header: "Автор",
                accessor: "author",
            },
            {
                accessor: "id",
                Cell: (data: any) => {
                    return <ControlColumn data={data?.row?.original} />
                },
            },
        ],
        []
    )

    return (
        <div className={cls.root}>
            <div className={cls.content_emergency}>
                <div className={cls.searchBlock}>
                    {checkAccess(['0', '4']) && (
                        <Button icon={<i className="icon-add" />} onClick={showModal}>
                            Создать оповещение
                        </Button>
                    )}
                    <div className={cls.search}>
                        <div>
                            <SearchField placeholder='Поиск'/>
                        </div>
                        <div>
                            <AllTaskSearch/>
                        </div>
                    </div>
                </div>
                <div className={cls.form_block}>
                    <Table
                        className={cls.table}
                        data={data}
                        columns={columns}
                        tableHooks={[useFlexLayout]}
                    />
                    <Pagination
                        className={cls.pagination}
                        total={5}
                        countInPage={5}
                        page={1}
                        setCountInPage={() => {}}
                        setPage={() => {}}
                    />
                </div>
            </div>
        </div>
    )
}

export default EmergencyAlert
