import './index.scss'
import { CaretRightOutlined, CaretLeftOutlined, SearchOutlined, CaretDownOutlined, DownOutlined } from '@ant-design/icons'
import { useState } from 'react/cjs/react.development'
import { Input, Tree, Popover, Button } from 'antd'
import TableView from '~components/Table'
import AddNewP from './addNewP'
import BatchImport from './batchImport'

const FieldManagement = () => {
    const [isShrink, setIsShrink] = useState(false)

    const treeData = [
        {
            title: '保险场景运营',
            key: '0-0',
            children: [
                {
                    title: '客户体验',
                    key: '0-0-0'
                }
            ],
        },
        {
            title: '保险场景运营',
            key: '1-0',
            children: [
                {
                    title: '客户体验',
                    key: '1-0-0'
                }
            ],
        },
    ];

    /**
     * @method handlerShrink
     * @description 点击是否隐藏左侧搜索
     */
    const handlerShrink = () => {
        setIsShrink(!isShrink)
    }

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: '手机号',
            dataIndex: 'age',
        },
        {
            title: '所属部门',
            dataIndex: 'address',
        },
        {
            title: '状态',
            dataIndex: 'address',
        },
        {
            title: '职级',
            dataIndex: 'address',
        },
        {
            title: '所属部门',
            dataIndex: 'address',
        },
        {
            title: '操作',
            render: (data) => {
                return (
                    <>
                        <span className='actions'>编辑</span>
                        <span className='actions'>激活</span>
                        <span className='actions edit'>删除</span>
                    </>
                )
            }
        },
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
        {
            key: '4',
            name: 'Disabled User',
            age: 99,
            address: 'Sidney No. 1 Lake Park',
        },
        {
            key: '5',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '6',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '7',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
        {
            key: '8',
            name: 'Disabled User',
            age: 99,
            address: 'Sidney No. 1 Lake Park',
        },
        {
            key: '9',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '10',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '11',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
        {
            key: '12',
            name: 'Disabled User',
            age: 99,
            address: 'Sidney No. 1 Lake Park',
        }
    ];
    const [selectionType, setSelectionType] = useState('checkbox');

    /**
     * @method BatchOptions
     * @returns 批量操作的内容
     */
    const BatchOptions = () => {
        return (
            <div className='btnGroup'>
                <Button type="text" onClick={ () => setBatchImportFlag(true) }>导入</Button>
                <Button type="text">导出</Button>
            </div>
        )
    }
    
    const [addNewFlag, setAddNewFlag] = useState(false)
    const [batchImportFlag, setBatchImportFlag] = useState(false)

    return (
        <div className='field'>
            <AddNewP addNewFlag={ addNewFlag } setAddNewFlag={ setAddNewFlag }></AddNewP>
            <BatchImport batchImportFlag={ batchImportFlag } setBatchImportFlag={ setBatchImportFlag }></BatchImport>
            <div className={`${!isShrink ? 'left-search left-search-show' : 'left-search-hide'}`}>
                {
                    !isShrink &&
                    <div className="search-container">
                        <div className="top-search">
                            <Input prefix={<SearchOutlined className='searchIcon' />} placeholder='搜索部门' />
                        </div>
                        <div className='bottom-content'>
                            <Tree
                                switcherIcon={<CaretDownOutlined  />}
                                className='searchTree'
                                defaultExpandAll
                                treeData={treeData}
                            />
                        </div>
                    </div>
                }
            </div>
            <div className='right-table'>
                <div
                    className={`shrink ${!isShrink ? 'hideIcon' : 'showIcon'}`}
                    onClick={handlerShrink}
                >
                    {
                        isShrink ?
                            <CaretRightOutlined />
                            :
                            <>
                                <CaretLeftOutlined />
                                <div className='line'></div>
                            </>
                    }
                </div>
                <div className='right-table-content'>
                    <div className="top-options">
                        <div className="left-button">
                            <Button
                            className='addNewP'
                            type="primary"
                            onClick={ () =>  setAddNewFlag(true)}
                            >新增员工</Button>
                            <Popover
                                placement="bottom"
                                content={<BatchOptions />}
                                arrowPointAtCenter
                                trigger="hover">
                                <Button className='batch'>
                                    批量操作<DownOutlined className='arrow' />
                                </Button>
                            </Popover>

                        </div>
                        <div className="right-search">
                            <Input prefix={<SearchOutlined className='searchIcon' />} placeholder='请输入姓名或手机号' />
                        </div>
                    </div>
                    <TableView
                        type={selectionType}
                        columns={columns}
                        data={data}
                    />
                </div>
            </div>
        </div>
    )
}

export default FieldManagement