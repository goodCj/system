import { Modal, Form, Input, Button, message, TreeSelect } from 'antd';
import { addNewMaterial, addNewMaterialTag, updateMaterial } from '~request/api/material';
import { useRef, useEffect, useState } from 'react';
import { tagList } from '~request/api/tag';
const { TreeNode } = TreeSelect;

const AddNewP = (props) => {
    const { addNewFlag, setAddNewFlag, currentNode, setMaterialTableOption } = props
    const formRef = useRef()
    const [addTag, setAddTag] = useState([])
    const [tagListData, setTagListData] = useState([])

    useEffect(() => {
        setAddTag([])
        getTagList()
        formRef.current.resetFields()
    }, [])
    useEffect(() => {
        if (currentNode) {
            let currentTag = currentNode.tags.map(item => {
                return item.tagId
            })
            setAddTag(currentTag)
        }
    }, [currentNode])

    /**
     * @method handleCancel
     * @description 点击关闭遮罩
     */
    const handleCancel = () => {
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
        let res
        if(!currentNode){
            res = await addNewMaterial({
                ...values
            })
        }else {
            res = await updateMaterial({
                fodderId: currentNode.fodderId,
                ...values
            })
        }
        if (res.code === 0) {
            let tagData = await addNewMaterialTag({
                fodderId: currentNode ? currentNode.fodderId : res.data.fodderId ,
                tagIds: addTag
            })
            if (tagData.code === 0) {
                message.success('创建成功', 2)
                setMaterialTableOption({
                    offset: 0,
                    count: 10
                })
                handleCancel()
            }
        }
    };

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

    return (
        <Modal
            title={currentNode ? '编辑素材':'新建素材'}
            width="480px"
            className="addNewPModal"
            visible={addNewFlag}
            onCancel={handleCancel}
            footer={null}
        >
            <Form
                ref={formRef}
                name="basic"
                labelCol={{ span: 5 }}
                onFinish={onFinish}
                autoComplete="off"
                initialValues={currentNode}
            >
                <Form.Item
                    label="素材名称"
                    name="title"
                    rules={[{ required: true, message: '请输入素材名称' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="绑定标签"
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
                    label="素材内容"
                    name="content"
                    type='textarea'
                    rules={[{ required: true, message: '请输入素材内容' }]}
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