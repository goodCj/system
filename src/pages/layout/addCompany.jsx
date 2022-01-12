import { Modal, Form, Input, Button, message } from 'antd';
import { useRef, useEffect } from 'react';
import { addCompany } from '~request/api/company';

const AddNewP = (props) => {
    const { addNewFlag, setAddNewFlag } = props
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
        let res = await addCompany({
            ...values
        })
        if (res.code === 0) {
            message.success('创建成功', 2)
            window.location.reload()
        }
    };

    return (
        <Modal
            title="新建公司"
            width="480px"
            className="addNewPModal"
            visible={addNewFlag}
            onCancel={handleCancel}
            footer={null}
            maskClosable={false}
            closable={false}
        >
            <Form
                ref={formRef}
                name="basic"
                labelCol={{ span: 5 }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="公司名称"
                    name="companyName"
                    rules={[{ required: true, message: '请输入公司名称' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                    <Button type="primary" htmlType="submit" style={{ marginLeft: '80px' }}>
                        确认
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddNewP