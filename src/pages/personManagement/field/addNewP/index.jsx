import './index.scss'
import { Modal, Form, Input, InputNumber, Button, Checkbox, message } from 'antd';
import { createUser, updateUser } from '~request/api/user';
import { useRef, useEffect } from 'react';

const initialValues = {
    username: '',
    tel: ''
}

const AddNewP = (props) => {
    const { updateUserInfo, addNewFlag, setAddNewFlag, currentRole, setOutworkerDataOptions, setOfficeworkerDataOptions } = props
    const formRef = useRef()

    useEffect(() => {
        formRef.current.resetFields()
    }, [])

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
        // 新增
        if (!updateUserInfo.id) {
            // 编辑
            let res = await createUser({
                ...values,
                role: Number(currentRole)
            })
            if (res.code === 0) {
                message.success('创建成功', 2)
                if (currentRole === 3) {
                    setOutworkerDataOptions({
                        count: 10,
                        offset: 0
                    })
                } else {
                    setOfficeworkerDataOptions({
                        count: 10,
                        offset: 0
                    })
                }
                handleCancel()
            }
        } else {
            // 编辑
            let res = await updateUser({
                ...values,
                role: Number(currentRole),
                jobId: updateUserInfo.jobId
            })
            if (res.code === 0) {
                message.success('编辑成功', 2)
                if (currentRole === 3) {
                    setOutworkerDataOptions({
                        count: 10,
                        offset: 0
                    })
                } else {
                    setOfficeworkerDataOptions({
                        count: 10,
                        offset: 0
                    })
                }
                handleCancel()
            }
        }
    };

    return (
        <Modal
            title="新增员工"
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
                initialValues={updateUserInfo}
            >
                {
                    !updateUserInfo.jobId && 
                    <Form.Item
                    label="工号"
                    name="jobId"
                    rules={[{ required: true, message: '请输入工号' }]}
                >
                    <Input />
                </Form.Item>
                }
                <Form.Item
                    label="姓名"
                    name="name"
                    rules={[{ required: true, message: '请输入姓名' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="手机号"
                    name="phone"
                    rules={[{ required: true, message: '请输入手机号' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="职称"
                    name="title"
                    rules={[{ required: true, message: '请输入职称' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="公司地址"
                    name="company"
                    rules={[{ required: true, message: '请输入公司地址' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="公司代码"
                    name="companyId"
                    rules={[{ required: true, message: '请输入公司代码' }]}
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