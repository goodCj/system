import './index.scss'
import { Modal, Form, Input, InputNumber, Button, Checkbox } from 'antd';

const AddNewP = (props) => {
    const { addNewFlag, setAddNewFlag } = props

    /**
     * @method handleCancel
     * @description 点击关闭遮罩
     */
    const handleCancel = () => {
        setAddNewFlag(false)
    }

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
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
                name="basic"
                labelCol={{ span: 3 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="姓名"
                    name="username"
                    rules={[{ required: true, message: '请输入姓名' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="手机"
                    name="tel"
                    rules={[{ required: true, message: '请输入手机号' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="职位"
                    name="zw"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="员工号"
                    name="code"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="机构"
                    name="jg"
                >
                    {/* <Select defaultValue="lucy" >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" disabled>
                            Disabled
                        </Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select> */}
                </Form.Item>

                <Form.Item
                    label="职级"
                    name="zj"
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button htmlType="submit">
                        取消
                    </Button>
                    <Button type="primary" htmlType="submit">
                        确认
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddNewP