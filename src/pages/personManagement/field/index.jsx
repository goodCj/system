import './index.scss'
import { CaretRightOutlined, CaretLeftOutlined, SearchOutlined, CaretDownOutlined, DownOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { Input, Tree, Popover, Button, Tabs, message } from 'antd'
import TableView from '~components/Table'
import AddNewP from './addNewP'
import BatchImport from './batchImport'
import { getUserList, activateUser, _deleteUser } from '~request/api/user'
import { getUserInfo } from '~request/api/base'
import { useDounced } from '~utils'
import DeleteUserM from './deleteUser'

const { TabPane } = Tabs;

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

const FieldManagement = () => {
    const columns = [
        {
            title: '工号',
            dataIndex: 'jobId'
        },
        {
            title: '姓名',
            dataIndex: 'name'
        },
        {
            title: '手机号',
            dataIndex: 'phone',
        },
        {
            title: '职称',
            dataIndex: 'title',
        },
        {
            title: '公司代码',
            dataIndex: 'companyId',
        },
        {
            title: '公司地址',
            dataIndex: 'company',
        },
        {
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
    const [isShrink, setIsShrink] = useState(false)
    const [selectionType, setSelectionType] = useState('checkbox');
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
    if(!showFlag){
        columns.pop()
    }

    useEffect(() => {
        initTable()
    }, [currentRole, outworkerDataOptions, officeworkerDataOptions])

    /**
     * @method handlerShrink
     * @description 点击是否隐藏左侧搜索
     */
    const handlerShrink = () => {
        setIsShrink(!isShrink)
    }

    /**
     * @method BatchOptions
     * @returns 批量操作的内容
     */
    const BatchOptions = () => {
        return (
            <div className='btnGroup'>
                <Button type="text" onClick={() => setBatchImportFlag(true)}>导入</Button>
            </div>
        )
    }

    /**
     * @method switchTab
     * @description 切换面板
     */
    const switchTab = async (key) => {
        setCurrentRole(key)
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

    /**
     * @method initTable
     * @description 初始化表格
     */
    const initTable = async () => {
        let params = {}
        if(userInfo?.role === 0 && localStorage.getItem('currentCompany')){
            const currentCompany =  JSON.parse(localStorage.getItem('currentCompany'))
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
        setDeleteUserFlag(true)
    }
    const deleteUser = async () => {
        let res = await _deleteUser({
            jobId: currentUser.jobId
        })
        if (res.code === 0) {
            message.success('删除成功')
            setDeleteUserFlag(false)
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
                deleteUserFlag && <DeleteUserM {...{ deleteUserFlag, setDeleteUserFlag, deleteUser, currentUser }}></DeleteUserM>
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
                                    type={selectionType}
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

                                </div>
                                <div className="right-search">
                                    <Input prefix={<SearchOutlined className='searchIcon' />} placeholder='请输入姓名或手机号' />
                                </div>
                            </div>
                            <div className="tableBox">
                                <TableView
                                    type={selectionType}
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