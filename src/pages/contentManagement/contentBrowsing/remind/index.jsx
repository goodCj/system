import { Button, message, Tree } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { remindActive } from '~request/api/activity';
import { allCompanyTree } from '~request/api/company';
import { TeamOutlined } from '@ant-design/icons';
import TableView from '~components/Table'
import './index.scss'
import { getCompanyPerson } from '~request/api/activity';
const Remind = () => {
    const [compantTree, setCompanyTree] = useState([])
    const { state: { currentNode } } = useLocation()
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [companyTitle, setCompanyTitle] = useState('')
    const [outworkerDataOptions, setOutworkerDataOptions] = useState({
        count: 10,
        offset: 0
    })
    const [outworkerData, setOutworkerData] = useState({
        data: [],
        total: 0
    })
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
            width: 260,
            title: '机构名称',
            dataIndex: 'company',
        }
    ];
    useEffect(() => {
        getAllCompany()
    }, [])

    /**
     * @method getAllCompany
     * @description 查询所有的公司
     */
    const getAllCompany = async () => {
        const res = await allCompanyTree()
        if (res.code === 0) {
            function deep(data) {
                let arr = []
                data.forEach((item) => {
                    let obj = {
                        title: item.company,
                        key: item.companyId,
                    }
                    if (item.children && item.children.length > 0) {
                        obj.children = deep(item.children)
                    } else {
                        obj.switcherIcon = <TeamOutlined />
                    }
                    arr.push(obj)
                })
                return arr
            }
            let newData = deep([res.data])
            setCompanyTree(newData)
        }
    }

    /**
     * @method getAllPerson
     * @description 获取所有的外勤人员
     */
    const _getAllPerson = async (currentTree) => {
        console.log(currentTree)
        const res = await getCompanyPerson({
            companyId: currentTree.id,
            role: 3,
            ...outworkerDataOptions
        })
        if (res.code === 0) {
            setOutworkerData({
                data: res.data.list,
                total: res.data.count
            })
        }
    }

    /**
     * @method onFinish
     * @param {object} values 表单提交参数
     * @description 提交
     */
    const onFinish = async (values, type) => {
        let params = {
            jobIds: values,
            type,
            activeId: currentNode.activeId
        }
        let res = await remindActive(params)
        if (res.code === 0) {
            message.success('提醒成功', 2)
        }
    };


    const clickTreeNode = (selectedKeys, e) => {
        let currentTree = {
            title: e.node.title,
            id: e.node.key
        }
        setCompanyTitle(e.node.title)
        _getAllPerson(currentTree)
    }

    const onSelectChange = selectedRowKeys => {
        setSelectedRowKeys(selectedRowKeys)
    }

    return (
        <div className='remind'>
            <div className="board">
                <span className='prePath' onClick={() => window.history.go(-1)}>活动一览</span> / <span>提醒</span>
            </div>
            <div className='content'>
                <div className="leftTree">
                    <div className="title">公司列表</div>
                    {
                        compantTree.length > 0 && 
                        <Tree
                        defaultExpandAll={true}
                        showLine
                        showIcon
                        className='companyTree'
                        treeData={compantTree}
                        onSelect={clickTreeNode}
                    />
                    }
                </div>
                <div className="rightTable">
                    <div className='topInfo'>
                        <div className="title">人员列表 {companyTitle ? `- ${companyTitle}` : ''}</div>
                        <div>
                            <Button className='btn' type="primary" disabled={selectedRowKeys.length === 0} onClick={() => onFinish(selectedRowKeys, 1)}>群发提醒</Button>
                            <Button type="primary" disabled={selectedRowKeys.length === 0} onClick={() => onFinish(selectedRowKeys, 2)}>朋友圈提醒</Button>
                        </div>
                    </div>
                    <TableView
                        rowSelection={{
                            type: 'checkbox',
                            selectedRowKeys,
                            onChange: onSelectChange
                        }}
                        columns={columns}
                        data={outworkerData}
                        setPage={setOutworkerDataOptions}
                    />
                </div>
            </div>
        </div>
    )
}

export default Remind