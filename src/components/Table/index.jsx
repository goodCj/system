import { Table, Pagination } from 'antd'
import './index.scss'


const TableView = (props) => {
    const { columns, data, type } = props
    const showTotal = (total) => {
        return `共${total}条记录`
    }

    return (
        <>
            <Table
                className='table'
                pagination={false}
                rowSelection={type ? {
                    type: type
                } : null}
                columns={columns}
                dataSource={data}
            />
            <Pagination
                    className='pageination'
                    size="small"
                    total={50}
                    showTotal={showTotal}
                    showSizeChanger
                    showQuickJumper
                />
        </>
    )
}

export default TableView