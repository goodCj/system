import { useEffect, useState } from 'react'
import TableView from '~components/Table'
import { materialList } from '~request/api/material'
import { Select, Input, Button, Tag } from 'antd';
import moment from 'moment'
import './index.scss'
import AddNewP from './addNew';
import DeleteMaterialM from './deleteMaterial';
const { Option } = Select;

const MaterialBrowsing = () => {
    const searchTypeOp = [
        {
            val: 'fodderId',
            name: '素材ID'
        },
        {
            val: 'title',
            name: '素材名称'
        }
    ]
    const columns = [
        {
            title: '素材ID',
            dataIndex: 'fodderId'
        },
        {
            title: '素材名称',
            dataIndex: 'title'
        },
        {
            title: '素材内容',
            dataIndex: 'content'
        },
        {
            title: '素材标签',
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
            title: '更新时间',
            dataIndex: 'updatedAt',
            sorter: (a, b) => {
                return moment(a.updatedAt).format('x') - moment(b.updatedAt).format('x')
            }
        },
        {
            title: '操作',
            render: (text, data) => {
                return (
                    <>
                    <span className='actions' style={{ cursor: 'pointer' }}onClick={() => {
                            data.updatedAt = moment(data.updatedAt, 'YYYY-MM-DD')
                            editMaterial(data)
                        }}>编辑</span>
                        <span className='actions edit' style={{ cursor: 'pointer' }} onClick={() => openDeleteM(data)}>删除</span>
                    </>
                )
            }
        },
    ];
    const [addNewFlag, setAddNewFlag] = useState(false)
    const [currentNode, setCurrentNode] = useState()
    const [inputVal, setInputVal] = useState()
    const [tableData, setTableData] = useState({
        total: 0,
        data: []
    })
    const [materialTableOption, setMaterialTableOption] = useState({
        offset: 0,
        count: 10
    })
    const [selectVal, setSelectVal] = useState('title')
    const [deleteFlag, setDeleteFlag] = useState(false)
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const showFlag = !(userInfo.role > 1)
    if(!showFlag){
        columns.pop()
    }


    useEffect(() => {
        getMaterialList()
    }, [materialTableOption])

    /**
     * @method editActive
     * @param {*} data 
     * @description 编辑活动
     */

     const editMaterial = (data) => {
        setCurrentNode(data)
        setAddNewFlag(true)
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
     * @method getMaterialList
     * @description 获取素材列表
     */
     const getMaterialList = async () => {
        let params = {
            ...materialTableOption
        }
        if (inputVal) {
            params[selectVal] = inputVal
        }
        let res = await materialList(params)
        if (res.code === 0) {
            let data = res.data.list
            console.log(data)
            let newData = data.map(item => {
                return {
                    ...item,
                    updatedAt: moment(item.updatedAt).format('YYYY-MM-DD kk:mm'),

                }
            })
            setTableData({
                total: res.data.count,
                data: newData
            })
        }
    }

    return (
        <div className="material">
            {
                addNewFlag && <AddNewP {...{ addNewFlag, setAddNewFlag, currentNode,setCurrentNode, setMaterialTableOption }}></AddNewP>
            }
            {
                deleteFlag && <DeleteMaterialM {...{ deleteFlag, setDeleteFlag, currentNode,setCurrentNode, getMaterialList }}></DeleteMaterialM>
            }
            <div className="topOptions">
                <div>
                    {
                        showFlag && <Button
                        className='addNewP'
                        type="primary"
                        onClick={() => setAddNewFlag(true)}
                    >新增素材</Button>
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
                    <Button className='searchBtn' type="primary" onClick={() => setMaterialTableOption({
                        offset: 0,
                        count: 10
                    })}>搜索</Button>
                </div>
            </div>
            <div className='tableBox'>
                <TableView
                    columns={columns}
                    data={tableData}
                    setPage={setMaterialTableOption}
                />
            </div>
        </div>
    )
}

export default MaterialBrowsing