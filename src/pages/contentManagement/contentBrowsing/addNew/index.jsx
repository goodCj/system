import { Modal, Form, Input, Button, message, Select, DatePicker } from 'antd';
import { useRef, useEffect, useState } from 'react';
import { createActivity, ActivityTypeList, activeBiffuseList } from '~request/api/activity';
import ActiveImg from './upload';
const { Option } = Select;

const AddNewP = (props) => {
    const { addNewFlag, setAddNewFlag, setActivityTableOption } = props
    const formRef = useRef()
    const [activityType, setActivityType] = useState([])
    const [biffuseType, setBiffuseType] = useState([])

    useEffect(() => {
        formRef.current.resetFields()
        getActivityTypeList()
        getBiffuseType()
    }, [])
    useEffect(() => {
        console.log(activityType)
    }, [activityType])

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
        let res = await createActivity({
            ...values
        })
        if (res.code === 0) {
            message.success('创建成功', 2)
            setActivityTableOption({
                offset: 0,
                count: 10
            })
            handleCancel()
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

    return (
        <Modal
            title="新建活动"
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
            >
                <Form.Item
                    label="活动名称"
                    name="title"
                    rules={[{ required: true, message: '请输入活动名称' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="活动图片"
                >
                    <ActiveImg />
                </Form.Item>
                <Form.Item
                    label="活动类型"
                    name="typeId"
                    rules={[{ required: true, message: '请选择活动类型' }]}
                >
                    <Select style={{width: '160px'}}>
                        {
                           activityType.map(item => {
                                return <Option key={ item.id } value={ item.id }>{item.title}</Option>
                            })
                        }
                    </Select>

                </Form.Item>
                <Form.Item
                    label="传播途径"
                    name="diffuseTypeId"
                    rules={[{ required: true, message: '请选择传播途径' }]}
                >
                    <Select style={{width: '160px'}}>
                        {
                            biffuseType.map(item => {
                                return <Option key={ item.id } value={ item.id }>{item.title}</Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    label="开始日期"
                    name="startTime"
                    rules={[{ required: true, message: '请选择开始日期' }]}
                >
                    <DatePicker style={{width: '160px'}} />
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