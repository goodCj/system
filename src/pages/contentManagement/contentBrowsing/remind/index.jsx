import { Modal, Form, Input, Button, message } from 'antd';
import { useRef, useEffect } from 'react';

const Remind = (props) => {
    const { remindFlag, setRemindFlag, currentNode, setCurrentNode } = props
    const formRef = useRef()

    useEffect(() => {
        formRef.current.resetFields()
    }, [])

    /**
     * @method handleCancel
     * @description 点击关闭遮罩
     */
    const handleCancel = () => {
        setRemindFlag(false)
    }

    /**
     * @method onFinish
     * @param {object} values 表单提交参数
     * @description 提交
     */
    const onFinish = async (values) => {
        // let res = await addTag({
        //     ...values,
        //     fatherId: currentNode.id
        // })
        // if (res.code === 0) {
        //     message.success('创建成功', 2)
        //     setTableDataOptions({
        //         count: 10,
        //         offset: 0
        //     })
        //     handleCancel()
        // }
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
                {/* <Form.Item
                    label="标签名称"
                    name="name"
                    rules={[{ required: true, message: '请输入标签名称' }]}
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
                </Form.Item> */}
            </Form>
        </Modal>
    )
}

export default Remind