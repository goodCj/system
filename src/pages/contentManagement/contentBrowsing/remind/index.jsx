import { Modal, Form, Input, Button, message, Select } from 'antd';
import { useRef, useEffect, useState } from 'react';
import { getAllPerson, remindActive } from '~request/api/activity';
const { Option } = Select;
const options = [
    {
        value: 1,
        name: '群发提醒'
    },
    {
        value: 2,
        name: '朋友圈提醒'
    }
]
const Remind = (props) => {
    const { remindFlag, setRemindFlag, currentNode, setCurrentNode } = props
    const formRef = useRef()
    const [personList, setPersonList] = useState([])

    useEffect(() => {
        _getAllPerson()
        formRef.current.resetFields()
    }, [])

    /**
     * @method handleCancel
     * @description 点击关闭遮罩
     */
    const handleCancel = () => {
        setRemindFlag(false)
        setCurrentNode(null)
    }

    /**
     * @method getAllPerson
     * @description 获取所有的外勤人员
     */
    const _getAllPerson = async () => {
        const res = await getAllPerson({
            role: 3
        })
        if (res.code === 0) {
            setPersonList(res.data.list)
        }
    }

    /**
     * @method onFinish
     * @param {object} values 表单提交参数
     * @description 提交
     */
    const onFinish = async (values) => {
        let params = {
            ...values,
            activeId: currentNode.activeId
        }
        let res = await remindActive(params)
        if (res.code === 0) {
            message.success('提醒成功', 2)
            handleCancel()
        }
    };

    return (
        <Modal
            title="提醒"
            width="480px"
            className="addNewPModal"
            visible={remindFlag}
            onCancel={handleCancel}
            footer={null}
        >
            <Form
                ref={formRef}
                name="basic"
                labelCol={{ span: 5 }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="活动名称"
                >
                    {currentNode.title}
                </Form.Item>
                <Form.Item
                    label="通知对象"
                    name="jobIds"
                >
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="请选择通知对象"
                    >
                        {
                            personList.map(item => {
                                return <Option key={item.id} value={item.jobId}>{item.name}</Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    label="提醒方式"
                    name="type"
                >
                    <Select placeholder='请选择提醒方式'>
                        {
                            options.map(item => {
                                return <Option key={item.value} value={item.value}>{item.name}</Option>
                            })
                        }
                    </Select>
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

export default Remind