import { Table } from 'antd'
import { useEffect, useRef } from 'react'
import { useState } from 'react'
import './index.scss'


const TableView = (props) => {
    const { columns, data, type, setPage } = props
    const [tableScrollHeight, setTableScrollHeight] = useState(500)
    const tableRef = useRef(null)

    const showTotal = (total) => {
        return `共${total}条记录`
    }

    useEffect(() => {
        if (setPage && data.data.length > 0) {
            let scrollHeight = tableRef.current.clientHeight - 24 - 55 - 32
            setTableScrollHeight(scrollHeight)
        }
        if(!setPage){
            let scrollHeight = tableRef.current.clientHeight - 55
            setTableScrollHeight(scrollHeight)
        }
    }, [data])

    const pageChange = (page, pageSize) => {
        setPage({
            count: pageSize,
            offset: pageSize * (page - 1)
        })
    }

    return (
        <>
            <Table
                className='table'
                ref={tableRef}
                pagination={setPage ? {
                    position: ['bottomRight'],
                    className: 'pageination',
                    size: "small",
                    total: data.total,
                    showTotal: showTotal,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    onChange: pageChange
                }: false}
                rowSelection={type ? {
                    type: type
                } : null}
                rowKey={tr => tr.id}
                columns={columns}
                dataSource={data.data}
                scroll={{ y: tableScrollHeight, scrollToFirstRowOnChange: true }}
            />
        </>
    )
}

export default TableView