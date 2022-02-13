import './index.scss'
import { SearchOutlined, DownOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { Input, Popover, Button, Tabs, message } from 'antd'
import TableView from '~components/Table'
import AddNewP from './addNewP'
import BatchImport from './batchImport'
import { getUserList, activateUser, _deleteUser, _batchUser } from '~request/api/user'
import { getUserInfo } from '~request/api/base'
import { useDounced } from '~utils'
import DeleteUserM from './deleteUser'

const { TabPane } = Tabs;

const FieldManagement = () => {
    const columns = [
        {
            width: 150,
            title: '工号',
            dataIndex: 'jobId'
        },
        {
            width: 200,
            title: '姓名',
            dataIndex: 'name'
        },
        {
            width: 200,
            title: '手机号',
            dataIndex: 'phone',
        },
        {
            width: 240,
            title: '职称',
            dataIndex: 'title',
        },
        {
            title: '员工状态',
            width: 160,
            render: (_, data) => {
                if (data.status === '1') {
                    return (<div className='statusBox'>
                        <span className="line inLine"></span>
                        <span  className='in'>激活</span>
                    </div>)
                }else {
                    return (<div className='statusBox' style={{color: 'red'}}>
                        <span className="line endLine"></span>
                        <span className='end'>未激活</span>
                    </div>)
                }
            }
        },
        {
            width: 260,
            title: '机构名称',
            dataIndex: 'company',
        },
        {
            width: 140,
            title: '操作',
            render: (text, data) => {
                return (
                    <>
                        <span className='actions' style={{ cursor: 'pointer' }} onClick={() => updateUser(data)}>编辑</span>
                        <span className='actions' style={{ cursor: 'pointer' }} onClick={() => isActivateUser(data)}>{data.status === '0' ? '激活' : '停用'}</span>
                        <span className='actions edit' style={{ cursor: 'pointer' }} onClick={() => openDeleteM(data)}>删除</span>
                    </>
                )
            }
        },
    ];
    // const [isShrink, setIsShrink] = useState(false)
    const [addNewFlag, setAddNewFlag] = useState(false)
    const [batchImportFlag, setBatchImportFlag] = useState(false)
    const [outworkerData, setOutworkerData] = useState({
        data: [],
        total: 0
    })
    const [outworkerDataOptions, setOutworkerDataOptions] = useState({
        count: 10,
        offset: 0
    })
    const [officeworkerData, setOfficeworkerData] = useState({
        data: [],
        total: 0
    })
    const [officeworkerDataOptions, setOfficeworkerDataOptions] = useState({
        count: 10,
        offset: 0
    })
    const [currentRole, setCurrentRole] = useState(3)
    const [updateUserInfo, setUpdateUserInfo] = useState({})
    const [deleteUserFlag, setDeleteUserFlag] = useState(false)
    const [currentUser, setCurrentUser] = useState({})
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const showFlag = !(userInfo?.role > 1)
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [batchType, setBatchType] = useState('');
    const [batchFlag, setBatchFlag] = useState(false)
    
    if (!showFlag) {
        columns.pop()
    }

    useEffect(() => {
        initTable()
    }, [currentRole, outworkerDataOptions, officeworkerDataOptions])

    /**
     * @method handlerShrink
     * @description 点击是否隐藏左侧搜索
     */
    // const handlerShrink = () => {
    //     setIsShrink(!isShrink)
    // }

    /**
     * @method BatchOptions
     * @returns 批量操作的内容
     */
    const BatchOptions = () => {
        return (
            <div className='btnGroup'>
                <Button type="text" onClick={() => setBatchImportFlag(true)}>导入</Button>

                <Button type="text" onClick={() => openBatch('delete')}>删除</Button>

                <Button type="text" onClick={() => openBatch('active')}>激活</Button>

                <Button type="text" onClick={() => openBatch('stop')}>停用</Button>
            </div>
        )
    }

    /**
     * @method switchTab
     * @description 切换面板
     */
    const switchTab = async (key) => {
        setCurrentRole(key)
        setSelectedRowKeys([])
    }

    /**
     * @method searchUser
     * @description 用户搜索
     */
    const searchUser = async (e) => {
        let val = e.target.value
        if (val) {
            let res = await getUserInfo({
                jobId: val,
                role: currentRole
            })
            if (currentRole === 3) {
                setOutworkerData({
                    data: [res.data],
                    total: 1
                })
            } else {
                setOfficeworkerData({
                    data: [res.data],
                    total: 1
                })
            }
        } else {
            initTable()
        }
    }

    const dbSearchUser = useDounced(searchUser, 800)

    const onSelectChange = (selectedRowKeys, selectedRows) => {
        let arr = selectedRows.map(item => {
            return item.jobId
        })
        setSelectedRowKeys(arr)
    }

    /**
     * @method initTable
     * @description 初始化表格
     */
    const initTable = async () => {
        let params = {}
        if (userInfo?.role === 0 && localStorage.getItem('currentCompany')) {
            const currentCompany = JSON.parse(localStorage.getItem('currentCompany'))
            params.belongCompany = currentCompany.id
        }
        if (Number(currentRole) === 3) {
            params = {
                ...params,
                ...outworkerDataOptions,
                role: 3
            }
            // 外勤
            let res = await getUserList(params)
            setOutworkerData({
                data: res.data.list,
                total: res.data.count
            })
        } else {
            params = {
                ...params,
                ...officeworkerDataOptions,
                role: 2
            }
            // 内勤
            let res = await getUserList(params)
            setOfficeworkerData({
                data: res.data.list,
                total: res.data.count
            })
        }
    }

    /**
     * @method updateUser
     * @description 编辑用户
     */
    const updateUser = (data) => {
        setUpdateUserInfo(data)
        setAddNewFlag(true)
    }

    /**
     * @method isActivateUser
     * @description 激活或者停用客户
     */
    const isActivateUser = async (data) => {
        let res = await activateUser({
            jobId: data.jobId,
            status: data.status === '1' ? '0' : '1'
        })
        if (res.code === 0) {
            if (currentRole === 3) {
                let newData = outworkerData.data.map(item => {
                    if (item.jobId === data.jobId) {
                        item.status = data.status === '1' ? '0' : '1'
                    }
                    return item
                })
                setOutworkerData({
                    ...outworkerData,
                    data: newData
                })
            } else {
                let newData = officeworkerData.data.map(item => {
                    if (item.jobId === data.jobId) {
                        item.status = data.status === '1' ? '0' : '1'
                    }
                    return item
                })
                setOfficeworkerData({
                    ...officeworkerData,
                    data: newData
                })
            }
        }
    }

    /**
     * @method deleteUser
     * @description 删除用户
     */
    const openDeleteM = (data) => {
        setCurrentUser(data)
        setBatchFlag(false)
        setDeleteUserFlag(true)
    }
    const deleteUser = async () => {
        let res = await _deleteUser({
            jobId: currentUser.jobId
        })
        if (res.code === 0) {
            message.success('删除成功')
            setDeleteUserFlag(false)
            setSelectedRowKeys([])
            initTable()
        }
    }

    /**
     * @method openBatch
     * @description 批量操作
     */
    const openBatch = (type) => {
        if(selectedRowKeys.length === 0) {
            message.warning('请选择人员')
            return
        }
        setBatchFlag(true)
        setDeleteUserFlag(true)
        setBatchType(type)
    }
    const batchUser = async () => {
        let params = {
            jobIds: selectedRowKeys
        }
        let text = ''
        if(batchType === 'delete'){
            params.type = 0
            text = '删除'
        }else {
            params.type = 1
            if(batchType === 'active'){
                params.status = '1'
                text = '激活'
            }else {
                params.status = '0'
                text = '停用'
            }
        }
        let res = await _batchUser(params)
        if (res.code === 0) {
            message.success(`${text}成功`)
            setDeleteUserFlag(false)
            setSelectedRowKeys([])
            initTable()
        }
    }

    return (
        <div className='field'>
            {/* 添加新用户 */}
            {
                addNewFlag && <AddNewP {...{ updateUserInfo, setUpdateUserInfo, addNewFlag, setAddNewFlag, currentRole, setOutworkerDataOptions, setOfficeworkerDataOptions }}></AddNewP>
            }
            {/* 删除新用户 */}
            {
                deleteUserFlag && <DeleteUserM {...{batchFlag, batchType, selectedRowKeys, deleteUserFlag, setDeleteUserFlag, deleteUser, batchUser, currentUser }}></DeleteUserM>
            }
            {/* 批量导入新用户 */}
            {
                batchImportFlag && <BatchImport {...{ setBatchImportFlag, batchImportFlag, currentRole, setOutworkerDataOptions, setOfficeworkerDataOptions }} ></BatchImport>
            }
            {/* <div className={`${!isShrink ? 'left-search left-search-show' : 'left-search-hide'}`}>
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
            </div> */}
            <div className='right-table'>
                {/* <div
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
                </div> */}
                <Tabs defaultActiveKey="3" onChange={switchTab}>
                    <TabPane tab="外勤管理" key="3">
                        <div className='right-table-content'>
                            <div className="top-options">
                                <div className="left-button">
                                    {
                                        showFlag && <>
                                            <Button
                                                className='addNewP'
                                                type="primary"
                                                onClick={() => { setAddNewFlag(true); setUpdateUserInfo({}) }}
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
                                        </>

                                    }
                                </div>
                                <div className="right-search">
                                    <Input prefix={<SearchOutlined className='searchIcon' />} onChange={dbSearchUser} placeholder='请输入姓名或手机号' />
                                </div>
                            </div>
                            <div className='tableBox'>
                                <TableView
                                rowSelection={{
                                    type: 'checkbox',
                                    selectedRowKeys,
                                    onChange: onSelectChange
                                }}
                                rowKey={tr => tr.jobId}
                                    columns={columns}
                                    data={outworkerData}
                                    setPage={setOutworkerDataOptions}
                                />
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="内勤管理" key="2">
                        <div className='right-table-content'>
                            <div className="top-options">
                                <div className="left-button">
                                    {
                                        showFlag && <>
                                            <Button
                                                className='addNewP'
                                                type="primary"
                                                onClick={() => setAddNewFlag(true)}
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
                                        </>
                                    }

                                </div>
                                <div className="right-search">
                                    <Input prefix={<SearchOutlined className='searchIcon' />} placeholder='请输入姓名或手机号' />
                                </div>
                            </div>
                            <div className="tableBox">
                                <TableView
                                rowSelection={{
                                    type: 'checkbox',
                                    selectedRowKeys,
                                    onChange: onSelectChange
                                }}
                                rowKey={tr => tr.jobId}
                                    columns={columns}
                                    data={officeworkerData}
                                    setPage={setOfficeworkerDataOptions}
                                />
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}

export default FieldManagement