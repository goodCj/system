import './index.scss'
import { CaretRightOutlined, CaretLeftOutlined, PlusCircleOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react';
import { Tree, Input, message, Button } from 'antd'
import { tagList } from '~request/api/tag';
import _ from 'lodash'
import { addTag, _deleteTag } from '~request/api/tag';
import TableView from '~components/Table'
import moment from 'moment'
import AddNewP from './addNew'
import DeleteTagM from './deleteTag'
let newTagValue = ''
let newTreeData = []

const TagManagement = () => {
    const columns = [
        {
            title: '标签名称',
            dataIndex: 'name'
        },
        {
            title: '标记内容数',
            dataIndex: 'belongCompany',
            sorter: (a, b) => a.belongCompany - b.belongCompany
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            sorter: (a, b) => {
                return moment(a.createdAt).format('x') - moment(b.createdAt).format('x')
            }
        },
        {
            title: '操作',
            render: (text, data) => {
                return (
                    <>
                        <span className='actions edit' style={{ cursor: 'pointer' }} onClick={() => openDeleteM(data)}>删除</span>
                    </>
                )
            }
        },
    ];
    const TreeTitle = (props) => {
        const { text, id, type } = props
        return (<div className='titleBox'>
            <div className="leftText">{text}</div>
            {
                type < 2 && <div className="add" onClick={() => addNode(id, type)}>
                    <PlusCircleOutlined />
                </div>
            }
        </div>)
    }
    const [treeData, setTreeData] = useState([])

    const [isShrink, setIsShrink] = useState(false)
    const [flag, setFlag] = useState(false)

    const InputNode = (props) => {
        const { parentId, type } = props
        const [inputValue, setInputValue] = useState('')
        const changeValue = (e) => {
            newTagValue = e.target.value
            setInputValue(e.target.value)
        }
        return (<div className='inputNode'>
            <span><Input value={inputValue} onChange={changeValue} className='inputBox' placeholder="请输入名称" /></span>
            <span>
                <CheckCircleOutlined
                    onClick={() => submitValue(parentId, type)}
                    className='submit' />
                <CloseCircleOutlined
                    onClick={() => cancel(parentId)}
                    className='cancel' />
            </span>
        </div>)
    }
    const submitValue = async (parentId, type) => {
        if (newTagValue.length === 0) {
            message.warning('请输入标签')
            return
        }

        deepFined(newTreeData, parentId, type, 'addValue')
    }
    useEffect(() => {
        if (flag) {
            const cloneTreeData = _.cloneDeep(newTreeData)
            setTreeData(cloneTreeData)
            setFlag(false)
        }
    }, [flag])
    const cancel = (parentId) => {
        deepFined(newTreeData, parentId, 1, 'delete')
        const cloneTreeData = _.cloneDeep(newTreeData)
        setTreeData(cloneTreeData)
    }
    const deepFined = async (arr, id, type = 1, option = 'addNode') => {
        arr.forEach(async item => {
            if (item.key === id && type < 3) {
                if (item.children && item.children.length > 0) {
                    if (option === 'addNode') {
                        if (item.children[item.children.length - 1].key !== 'newTag') {
                            item.children.push({
                                title: <InputNode parentId={id}
                                    type={type}
                                />,
                                key: 'newTag'
                            })
                        }
                    } else if (option === 'addValue') {
                        if (item.children[item.children.length - 1].key === 'newTag') {
                            let res = await addTag({
                                fatherId: id,
                                name: newTagValue
                            })
                            if (res.code === 0) {
                                item.children.pop()
                                item.children.push({
                                    title: <TreeTitle text={newTagValue} id={res.data.id} type={type + 1} />,
                                    key: res.data.id,
                                    level: type + 1
                                })
                                setFlag(true)
                                setCurrentNode({
                                    title: res.data.name,
                                    id: res.data.id
                                })
                            }
                        }
                    } else if (option === 'delete') {
                        if (item.children[item.children.length - 1].key === 'newTag') {
                            item.children.pop()
                        }
                    }
                } else {
                    if (option === 'addNode') {
                        item.children = [{
                            title: <InputNode parentId={id} type={type} />,
                            key: 'newTag'
                        }]
                    } else if (option === 'addValue') {
                        if (item.children[item.children.length - 1].key === 'newTag') {
                            let res = await addTag({
                                fatherId: id,
                                name: newTagValue
                            })
                            if (res.code === 0) {
                                item.children.pop()
                                item.children.push({
                                    title: <TreeTitle text={newTagValue} id={res.data.id} type={type + 1} />,
                                    key: res.data.id,
                                    level: type + 1
                                })
                                setFlag(true)
                                setCurrentNode({
                                    title: res.data.name,
                                    id: res.data.id
                                })
                            }
                        }
                    } else if (option === 'delete') {
                        if (item.children[item.children.length - 1].key === 'newTag') {
                            item.children.pop()
                        }
                    }
                }
            } else if (item.children && item.children.length > 0) {
                deepFined(item.children, id, type, option)
            }
        })
    }

    const deleteInputItem = (arr) => {
        arr.forEach(item => {
            if (item.key === 'newTag') {
                arr.pop()
            } else if (item.children && item.children.length > 0) {
                deleteInputItem(item.children)
            }
        })
    }

    /**
     * @method addNode
     * @description 添加树节点
     */
    const addNode = (id, type) => {
        newTagValue = ''
        deleteInputItem(newTreeData)
        deepFined(newTreeData, id, type)
        const cloneTreeData = _.cloneDeep(newTreeData)
        setTreeData(cloneTreeData)
    }

    /**
     * @method handlerShrink
     * @description 点击是否隐藏左侧搜索
     */
    const handlerShrink = () => {
        setIsShrink(!isShrink)
    }

    const setTagList = (data) => {
        let count = 0
        function deep(data, level = 0) {
            let arr = []
            data.forEach((item) => {
                let obj = {
                    title: <TreeTitle text={item.name} id={item.id} type={level} />,
                    key: item.id,
                    level: level
                }
                if (item.children && item.children.length > 0 && level < 2) {
                    obj.children = deep(item.children, level + 1)
                }
                arr.push(obj)
            })
            return arr
        }
        const newData = deep(data)
        const cloneData = _.cloneDeep(newData)
        newTreeData = cloneData
        setTreeData(cloneData)
    }

    const cloneTree = (data, fatherId = 0) => {
        let arr = []
        data.map((item) => {
            if (item.fatherId === fatherId) {
                item.children = cloneTree(data, item.id)
                arr.push(item)
            }
        })
        return arr
    }

    // 获取标签列表
    const getTagList = async (type, id) => {
        let params = {
            count: 100,
            offset: 0
        }
        if (type === 3) {
            params = {
                ...tableDataOptions,
                fatherId: id
            }
        }
        let res = await tagList(params)
        if (type !== 3) {
            let newData = [
                {
                    name: '全部标签',
                    id: 0,
                    type: 0,
                    children: cloneTree(res.data.list)
                }
            ]
            setTagList(newData)
        } else {
            let data = res.data.list
            data.map(item => {
                item.createdAt = moment(item.createdAt).format('YYYY-MM-DD kk:mm')
                item.updatedAt = moment(item.updatedAt).format('YYYY-MM-DD kk:mm')
            })
            setTableData({
                total: res.data.count,
                data: res.data.list
            })
        }
    }
    const [currentNode, setCurrentNode] = useState({
        title: '全部标签',
        id: 0
    })
    const [tableData, setTableData] = useState({
        total: 0,
        data: []
    })
    const [tableDataOptions, setTableDataOptions] = useState({
        count: 10,
        offset: 0
    })
    const [addNewFlag, setAddNewFlag] = useState(false)
    const [deleteFlag, setDeleteFlag] = useState(false)
    const [currentDelete, setCurrentDelete] = useState()

    useEffect(() => {
        if (currentNode.id !== 0) {
            getTagList(3, currentNode.id)
        } else {
            getTagList(0, 0)
        }
    }, [currentNode, tableDataOptions])

    const clickTreeNode = (selectedKeys, e) => {
        if (e.node.level === 2) {
            setCurrentNode({
                title: e.node.title.props.text,
                id: e.node.key
            })
        }
    }

    const clickAddBtn = () => {
        if(currentNode.id === 0) {
            message.warning('请选择标签！', 2)
            return
        }
        setAddNewFlag(true)
    }

    /**
     * @method deleteTag
     * @description 删除用户
     */
     const openDeleteM = (data) => {
         console.log(data)
         setCurrentDelete(data)
        setDeleteFlag(true)
    }
    const deleteTag = async () => {
        let res = await _deleteTag({
            id: currentDelete.id
        })
        if(res.code === 0){
            message.success('删除成功')
            setDeleteFlag(false)
            getTagList(3, currentNode.id)
        }
    }
    useEffect(() => {
        console.log(currentNode)
    }, [currentNode])

    return (
        <div className="tagManagement">
            {
                currentNode !== 0 && addNewFlag && <AddNewP { ...{ addNewFlag, setAddNewFlag, currentNode, setTableDataOptions} }></AddNewP>
            }
            {/* 删除新用户 */}
            {
                deleteFlag && <DeleteTagM {...{ deleteFlag, setDeleteFlag, currentDelete, deleteTag, setTableDataOptions }}></DeleteTagM>
            }
            <div className={`${!isShrink ? 'left-search left-search-show' : 'left-search-hide'}`}>
                {
                    !isShrink &&
                    <div className="search-container">
                        <div className='bottom-content'>
                            {
                                treeData.length > 0 &&
                                <Tree
                                    defaultExpandedKeys={[0]}
                                    showLine={true}
                                    treeData={treeData}
                                    className='searchTree'
                                    onSelect={clickTreeNode}
                                />
                            }
                        </div>
                    </div>
                }
            </div>
            <div className="right-table">
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
                                <div className="left-title">
                                    {
                                        currentNode.id !==0 && currentNode.title
                                    }
                                </div>
                                <div className="right-button">
                                    <Button
                                        className='addNewP'
                                        type="primary"
                                        onClick={clickAddBtn}
                                    >新增标签</Button>
                                </div>
                            </div>
                            <div className='tableBox'>
                                <TableView
                                    columns={columns}
                                    data={tableData}
                                    setPage={setTableDataOptions}
                                />
                            </div>
                    </div>
            </div>
        </div>
    )
}

export default TagManagement