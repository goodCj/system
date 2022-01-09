import './index.scss'
import { Select, Input, Button, Tag, Drawer } from 'antd';
import { useState, useEffect } from 'react';
import { activityList, updateActivity } from '../../../request/api/activity';
import TableView from '~components/Table'
import moment from 'moment'
import AddNewP from './addNew';
import DeleteActivityM from './deleteActivity';
import SeeData from './seeData';
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
            title: '活动ID',
            dataIndex: 'activeId'
        },
        {
            title: '直播',
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
            title: '活动类型',
            dataIndex: 'typeName'
        },
        {
            title: '直播状态',
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
            title: '开始时间',
            dataIndex: 'startTime',
            sorter: (a, b) => {
                return moment(a.startTime).format('x') - moment(b.startTime).format('x')
            }
        },
        {
            title: '活动标签',
            render: (text, data) => {
                return (
                    <>
                        {
                            data.tags.length > 0 ?
                                data.tags.map(item => {
                                    return <Tag color="blue" key={item.tag.id}>{item.tag.name}</Tag>
                                }) : '-'
                        }
                    </>
                )
            }
        },
        {
            title: '操作',
            render: (text, data) => {
                return (
                    <>
                        <span className='actions' style={{ cursor: 'pointer' }} onClick={() => {
                            data.startTime = moment(data.startTime, 'YYYY-MM-DD')
                            editActive(data)
                        }}>编辑</span>
                        <span className='actions' style={{ cursor: 'pointer' }}>提醒</span>
                        <span className='actions' style={{ cursor: 'pointer' }} onClick={() => clickSeeData(data)}>数据查看</span>
                        {
                            (data.status === '未开始' || data.status === '已结束') &&
                            <span className='actions' style={{ cursor: 'pointer' }} onClick={() => in_outLine(data, 'goIn')}>上线</span>
                        }
                        {
                            data.status === '进行中' &&
                            <span className='actions' style={{ cursor: 'pointer' }} onClick={() => in_outLine(data, 'goOut')}>下线</span>
                        }
                        <span className='actions edit' style={{ cursor: 'pointer' }} onClick={() => openDeleteM(data)}>删除</span>
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
     * @method deleteTag
     * @description 删除用户
     */
    const openDeleteM = (data) => {
        setCurrentNode(data)
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

    return (
        <div className="contentBrowsing">
            {
                addNewFlag && <AddNewP {...{ addNewFlag, setAddNewFlag, currentNode,setCurrentNode, setActivityTableOption }}></AddNewP>
            }
            {
                deleteFlag && <DeleteActivityM {...{ deleteFlag, setDeleteFlag, currentNode,setCurrentNode, getActivityList }}></DeleteActivityM>
            }
            {
                seeDataFlag && <SeeData {...{ seeDataFlag, setSeeDataFlag,currentNode,setCurrentNode }}></SeeData>
            }
            <div className="topOptions">
                <div>
                    <Button
                        className='addNewP'
                        type="primary"
                        onClick={() => setAddNewFlag(true)}
                    >新增活动</Button>
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
                    columns={columns}
                    data={tableData}
                    setPage={setActivityTableOption}
                />
            </div>
        </div>
    )
}

export default ContentBrowsing