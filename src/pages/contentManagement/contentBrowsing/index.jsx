import './index.scss'
import { Select, Input, Button, Tag, message } from 'antd';
import { useState, useEffect } from 'react';
import { activityList, updateActivity } from '../../../request/api/activity';
import TableView from '~components/Table'
import moment from 'moment'
import AddNewP from './addNew';
import DeleteActivityM from './deleteActivity';
import SeeData from './seeData';
import SeeDetails from './seeDetails';
import { useHistory } from 'react-router-dom';
const { Option } = Select;

const ContentBrowsing = () => {
    const searchTypeOp = [
        {
            val: 'title',
            name: '活动名称'
        },
        {
            val: 'activeId',
            name: '活动Id'
        }
    ]
    const columns = [
        {
            width: 120,
            title: '活动ID',
            render: (text, data, index) => {
                return index + 1
            }
        },
        {
            title: '活动',
            width: 240,
            render: (text, data) => {
                return (
                    <div className='titleBox'>
                        {
                            data.img && <div className='img'><img src={data.img} alt="" /></div>
                        }
                        <div className='text'>
                            <p>{data.title}</p>
                        </div>
                    </div>
                )
            }
        },
        {
            width: 120,
            title: '活动类型',
            dataIndex: 'typeName'
        },
        {
            width: 120,
            title: '活动状态',
            render: (text, data) => {
                if (data.status === '未开始') {
                    return (<div className='statusBox'>
                        <span className="line"></span>
                        <span>{data.status}</span>
                    </div>)
                }
                if (data.status === '进行中') {
                    return (<div className='statusBox'>
                        <span className="line inLine"></span>
                        <span className='in'>进行中</span>
                    </div>)
                }
                if (data.status === '已结束') {
                    return (<div className='statusBox'>
                        <span className="line endLine"></span>
                        <span className='end'>已结束</span>
                    </div>)
                }
            }
        },
        {
            width: 160,
            title: '开始时间',
            dataIndex: 'startTime',
            sorter: (a, b) => {
                return moment(a.startTime).format('x') - moment(b.startTime).format('x')
            }
        },
        {
            width: 240,
            title: '活动标签',
            render: (text, data) => {
                return (
                    <>
                        {
                            data.tags.length > 0 ?
                                data.tags.map(item => {
                                    return item.tag ? <Tag color="blue" key={item.tag.id}>{item.tag.name}</Tag> : '-'
                                }) : '-'
                        }
                    </>
                )
            }
        },
        {
            width: 200,
            fixed: 'right',
            title: '操作',
            render: (text, data) => {
                return (
                    <>
                        {
                            showFlag ?
                                <>
                                    <span className='actions' style={{ cursor: 'pointer' }} onClick={() => {
                                        data.startTime = moment(data.startTime, 'YYYY-MM-DD')
                                        editActive(data)
                                    }}>编辑</span>
                                    <span className='actions' style={{ cursor: 'pointer' }} onClick={() => clickSeeData(data)}>数据查看</span>
                                    <span className='actions' style={{ cursor: 'pointer' }} onClick={() => clickSeeDetails(data)}>详细数据</span>
                                    <span className='actions' style={{ cursor: 'pointer' }} onClick={() => clickRemind(data)}>提醒</span>
                                    {
                                        (data.status === '未开始' || data.status === '已结束') &&
                                        <span className='actions' style={{ cursor: 'pointer' }} onClick={() => in_outLine(data, 'goIn')}>上线</span>
                                    }
                                    {
                                        data.status === '进行中' &&
                                        <span className='actions' style={{ cursor: 'pointer' }} onClick={() => in_outLine(data, 'goOut')}>下线</span>
                                    }
                                    <span className='actions edit' style={{ cursor: 'pointer' }} onClick={() => openDeleteM(data)}>删除</span>
                                </> :
                                <>
                                    <span className='actions' style={{ cursor: 'pointer' }} onClick={() => clickSeeData(data)}>数据查看</span>
                                    <span className='actions' style={{ cursor: 'pointer' }} onClick={() => clickSeeDetails(data)}>详细数据</span>
                                    <span className='actions' style={{ cursor: 'pointer' }} onClick={() => clickRemind(data)}>提醒</span>
                                </>
                        }
                    </>
                )
            }
        },
    ];
    const [selectVal, setSelectVal] = useState('title')
    const [activityTableOption, setActivityTableOption] = useState({
        offset: 0,
        count: 10
    })
    const [inputVal, setInputVal] = useState()
    const [tableData, setTableData] = useState({
        total: 0,
        data: []
    })
    const [addNewFlag, setAddNewFlag] = useState(false)
    const [currentNode, setCurrentNode] = useState()
    const [deleteFlag, setDeleteFlag] = useState(false)
    const [seeDataFlag, setSeeDataFlag] = useState(false)
    const [seeDetailsFlag, setSeeDetailsFlag] = useState(false)
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const showFlag = !(userInfo?.role > 1)
    const history = useHistory()
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [batchFlag, setBatchFlag] = useState(false)


    useEffect(() => {
        getActivityList()
    }, [activityTableOption])

    /**
     * @method getActivityList
     * @description 获取活动列表
     */
    const getActivityList = async () => {
        let params = {
            ...activityTableOption
        }
        if (inputVal) {
            params[selectVal] = inputVal
        }
        let res = await activityList(params)
        if (res.code === 0) {
            let data = res.data.list
            let newData = data.map(item => {
                let nowTime =
                    moment().format('x')
                let startTime = moment(item.startTime).format('x')
                let endTime = item.endTime ? moment(item.endTime).format('x') : null
                let status = ''
                if (nowTime < startTime) {
                    status = '未开始'
                } else {
                    if ((endTime && nowTime < endTime) || !endTime) {
                        status = '进行中'
                    }
                    if (endTime && nowTime > endTime) {
                        status = '已结束'
                    }
                }
                return {
                    ...item,
                    status,
                    typeName: item.type?.title,
                    startTime: moment(item.startTime).format('YYYY-MM-DD kk:mm'),

                }
            })
            setTableData({
                total: res.data.count,
                data: newData
            })
        }
    }

    /**
     * @method clickRemind
     * @description 点击提醒
     */
    const clickRemind = (data) => {
        setCurrentNode(data)
        history.push({ pathname: '/app/contentManagement/materialBrowsing/remind', state: { currentNode: data } })
    }

    /**
     * @method deleteTag
     * @description 删除用户
     */
    const openDeleteM = (data) => {
        setCurrentNode(data)
        setBatchFlag(false)
        setDeleteFlag(true)
    }

     /**
     * @method batchDelete
     * @description 批量删除
     */
      const batchDelete = () => {
        if(selectedRowKeys.length === 0) {
            message.warning('请选择活动')
            return
        }
        setBatchFlag(true)
        setDeleteFlag(true)
    }

    /**
     * @method editActive
     * @param {*} data 
     * @description 编辑活动
     */

    const editActive = (data) => {
        setCurrentNode(data)
        setAddNewFlag(true)
    }

    /**
     * @method clickSeeData
     * @param data
     * @description 点击数据查看
     */
    const clickSeeData = (data) => {
        setCurrentNode(data)
        setSeeDataFlag(true)
    }

    /**
     * @method clickSeeData
     * @param data
     * @description 详细数据
     */
    const clickSeeDetails = (data) => {
        setCurrentNode(data)
        setSeeDetailsFlag(true)
    }

    /**
     * @method in_outLine
     * @description 上下线
     */
    const in_outLine = async (data, type) => {
        let params = {
            ...data
        }
        if (type === 'goIn') {
            params.startTime = moment().format('YYYY-MM-DD kk:mm')
            params.endTime = null
        } else if (type === 'goOut') {
            params.endTime = moment().format('YYYY-MM-DD kk:mm')
        }
        let res = await updateActivity({
            ...params
        })
        if (res.code === 0) {
            setActivityTableOption({
                ...activityTableOption
            })
        }
    }

    const onSelectChange = (selectedRowKeys, selectedRows) => {
        let arr = selectedRows.map(item => {
            return item.activeId
        })
        setSelectedRowKeys(arr)
    }

    return (
        <div className="contentBrowsing">
            {
                addNewFlag && <AddNewP {...{ addNewFlag, setAddNewFlag, currentNode, setCurrentNode, setActivityTableOption }}></AddNewP>
            }
            {
                deleteFlag && <DeleteActivityM {...{batchFlag, selectedRowKeys,setSelectedRowKeys, deleteFlag, setDeleteFlag, currentNode, setCurrentNode, getActivityList }}></DeleteActivityM>
            }
            {
                seeDataFlag && <SeeData {...{ seeDataFlag, setSeeDataFlag, currentNode, setCurrentNode }}></SeeData>
            }
            {
                seeDetailsFlag && <SeeDetails {...{ seeDetailsFlag, setSeeDetailsFlag, currentNode, setCurrentNode }}></SeeDetails>
            }
            <div className="topOptions">
                <div>
                    {
                        showFlag && 
                        <>
                            <Button
                            className='addNewP'
                            type="primary"
                            onClick={() => setAddNewFlag(true)}
                        >新增活动</Button>
                        <Button
                            className='addNewP'
                            type="primary"
                            onClick={batchDelete}
                        >批量删除</Button>
                        </>
                    }
                </div>
                <div>
                    <Select className='selectType' defaultValue={selectVal} onChange={(v) => setSelectVal(v)}>
                        {
                            searchTypeOp.map(item => {
                                return <Option key={item.val} value={item.val}>{item.name}</Option>
                            })
                        }
                    </Select>
                    <Input className='searchInput' placeholder='请输入活动名称' value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
                    <Button className='searchBtn' type="primary" onClick={() => setActivityTableOption({
                        offset: 0,
                        count: 10
                    })}>搜索</Button>
                </div>
            </div>
            <div className='tableBox'>
                <TableView
                    rowSelection={{
                        type: 'checkbox',
                        selectedRowKeys,
                        onChange: onSelectChange
                    }}
                    rowKey={tr => tr.activeId}
                    columns={columns}
                    data={tableData}
                    setPage={setActivityTableOption}
                />
            </div>
        </div>
    )
}

export default ContentBrowsing