import { Table } from 'antd'
import { useEffect } from 'react'
import { useState } from 'react/cjs/react.development'
import './index.scss'


const TableView = (props) => {
    const { columns, data, type } = props
    const [tableScrollHeight, setTableScrollHeight] = useState(500)

    const showTotal = (total) => {
        return `共${total}条记录`
    }

    useEffect(() => {
        let scrollHeight = document.getElementsByClassName('table')[0].offsetHeight - document.getElementsByClassName('pageination')[0].offsetHeight - document.getElementsByClassName('ant-table-thead')[0].offsetHeight -32
        console.log(scrollHeight)
        setTableScrollHeight(scrollHeight)
    }, [])

    return (
        <>
            <Table
                className='table'
                pagination={{
                    position: ['bottomRight'],
                    className: 'pageination',
                    size: "small",
                    total: data.length,
                    showTotal: showTotal,
                    showSizeChanger: true,
                    showQuickJumper: true
                }}
                rowSelection={type ? {
                    type: type
                } : null}
                columns={columns}
                dataSource={data}
                scroll={{ y: tableScrollHeight, scrollToFirstRowOnChange: true }}
            />
        </>
    )
}

export default TableView