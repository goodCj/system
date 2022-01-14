import { Modal, Form, Input, Button, message, Select, DatePicker, TreeSelect } from 'antd';
import { useRef, useEffect, useState } from 'react';
import { createActivity, ActivityTypeList, activeBiffuseList, addActiveTag, updateActivity } from '~request/api/activity';
import ActiveImg from './upload';
import { tagList } from '~request/api/tag';
const { Option } = Select;
const { TreeNode } = TreeSelect;

const AddNewP = (props) => {
    const { addNewFlag, setAddNewFlag, currentNode, setCurrentNode, setActivityTableOption } = props
    const formRef = useRef()
    const [activityType, setActivityType] = useState([])
    const [biffuseType, setBiffuseType] = useState([])
    const [img, setImg] = useState('')
    const [showUpload, setShowUpload] = useState(false)
    const [tagListData, setTagListData] = useState([])
    const [addTag, setAddTag] = useState([])

    useEffect(() => {
        formRef.current.resetFields()
        setAddTag([])
        setImg('')
        getTagList()
        getActivityTypeList()
        getBiffuseType()
    }, [])
    useEffect(() => {
        if (currentNode) {
            let currentTag = currentNode.tags.map(item => {
                return item.tagId
            })
            setAddTag(currentTag)
            currentNode.diffuseTypeId === 1 && setShowUpload(true)
            currentNode.img && setImg(currentNode.img)
        }
    }, [currentNode])

    /**
     * @method handleCancel
     * @description 点击关闭遮罩
     */
    const handleCancel = () => {
        setCurrentNode(null)
        setAddNewFlag(false)
    }

    /**
     * @method onFinish
     * @param {object} values 表单提交参数
     * @description 提交
     */
    const onFinish = async (values) => {
        if (addTag.length === 0) {
            message.warning('请选择标签')
            return
        }
        if (showUpload && !img) {
            message.warning('请上传图片')
            return
        }
        let res
        if(!currentNode){
            res = await createActivity({
                ...values,
                img: showUpload ? img : null
            })
        }else {
            res = await updateActivity({
                activeId: currentNode.activeId,
                ...values,
                img: showUpload ? img : null
            })
        }
        if (res.code === 0) {
            let tagData = await addActiveTag({
                activeId: currentNode ? currentNode.activeId : res.data.activeId ,
                tagIds: addTag
            })
            if (tagData.code === 0) {
                message.success('创建成功', 2)
                setActivityTableOption({
                    offset: 0,
                    count: 10
                })
                handleCancel()
            }
        }
    };

    /**
     * @method getActivityTypeList
     * @description 获取活动类型
     */
    const getActivityTypeList = async () => {
        let res = await ActivityTypeList({
            offset: 0,
            count: 100
        })
        if (res.code === 0) {
            setActivityType(res.data.list)
        }
    }

    /**
     * @method geBiffuseType
     * @description 获取传播途径
     */
    const getBiffuseType = async () => {
        let res = await activeBiffuseList({
            offset: 0,
            count: 100
        })
        if (res.code === 0) {
            setBiffuseType(res.data.list)
        }
    }

    /**
     * @method getTagList
     * @param {*} type 
     * @param {*} id 
     * @description 获取全部
     */
    const getTagList = async (type, id) => {
        let params = {
            count: 100,
            offset: 0
        }
        let res = await tagList(params)
        let newData = [
            {
                name: '全部标签',
                id: 0,
                type: 0,
                children: cloneTree(res.data.list)
            }
        ]
        setTagListData(newData)
    }
    const cloneTree = (data, fatherId = 0, level = 1) => {
        let arr = []
        data.map((item) => {
            if (item.fatherId === fatherId) {
                item.level = level
                item.children = cloneTree(data, item.id, level + 1)
                arr.push(item)
            }
        })
        return arr
    }

    const TreeNodeList = (list) => {
        return list.map(item => {
            return (
                <TreeNode key={item.id} disabled={item.level !== 3} value={item.id} title={item.name}>
                    {
                        item.children.length > 0 && TreeNodeList(item.children)
                    }
                </TreeNode>
            )
        })
    }

    return (
        <Modal
        title={currentNode ? '编辑活动':'新建活动'}
            width="520px"
            className="addNewPModal"
            visible={addNewFlag}
            onCancel={handleCancel}
            footer={null}
        >
            <Form
                ref={formRef}
                name="basic"
                labelCol={{ span: 4 }}
                onFinish={onFinish}
                autoComplete="off"
                initialValues={currentNode}
            >
                <Form.Item
                    label="活动名称"
                    name="title"
                    rules={[{ required: true, message: '请输入活动名称' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="活动标签"
                    name="typeId"
                    rules={[{ required: true, message: '请选择活动类型' }]}
                >
                    <Select style={{ width: '160px' }}>
                        {
                            activityType.map(item => {
                                return <Option key={item.id} value={item.id}>{item.title}</Option>
                            })
                        }
                    </Select>

                </Form.Item>
                <Form.Item
                    label="传播途径"
                    name="diffuseTypeId"
                    rules={[{ required: true, message: '请选择传播途径' }]}
                >
                    <Select style={{ width: '160px' }} onChange={v => {
                        if (v === 1) {
                            setShowUpload(true)
                        } else {
                            setShowUpload(false)
                        }
                        setImg(null)
                    }}>
                        {
                            biffuseType.map(item => {
                                return <Option key={item.id} value={item.id}>{item.title}</Option>
                            })
                        }
                    </Select>
                </Form.Item>
                {
                    showUpload &&
                    <Form.Item
                        label="活动海报"
                    >
                        <ActiveImg img={img} setImg={setImg} />
                    </Form.Item>
                }
                <Form.Item
                    label="自定义标签"
                >
                    <TreeSelect
                        showSearch
                        style={{ width: '100%' }}
                        value={addTag}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        placeholder="请选择标签"
                        allowClear
                        multiple
                        treeDefaultExpandAll
                        onChange={v => setAddTag(v)}
                        treeLine={{ showLeafIcon: true }}
                    >
                        {
                            tagListData.length > 0 && TreeNodeList(tagListData)[0]
                        }
                    </TreeSelect>
                </Form.Item>
                <Form.Item
                    label="开始日期"
                    name="startTime"
                    rules={[{ required: true, message: '请选择开始日期' }]}
                >
                    <DatePicker style={{ width: '160px' }} />
                </Form.Item>
                <Form.Item
                    label="活动地址"
                    name="url"
                    rules={[{ required: true, message: '请输入活动地址' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                    <Button htmlType="submit" onClick={handleCancel}>
                        取消
                    </Button>
                    <Button type="primary" htmlType="submit" style={{ marginLeft: '80px' }}>
                        确认
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddNewP