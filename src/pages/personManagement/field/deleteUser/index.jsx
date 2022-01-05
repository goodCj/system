import { Modal, Button, message } from 'antd';

const DeleteUserM = (props) => {
    const { currentUser, deleteUserFlag, setDeleteUserFlag, deleteUser } = props

    /**
     * @method handleCancel
     * @description 点击关闭遮罩
     */
    const handleCancel = () => {
        setDeleteUserFlag(false)
    }

    const deleteU = () => {
        deleteUser()
    }

    return (
        <Modal
            title="删除"
            width="350px"
            className="deleteUserModal"
            visible={deleteUserFlag}
            onCancel={handleCancel}
            footer={null}
        >
            <div style={{ textAlign: 'center', margin: '20px 0 40px' }}>
                确定删除<span style={{ color: 'red' }}>{currentUser.name}</span>
            </div>
            <div style={{ textAlign: 'center' }}>
                <Button htmlType="submit" onClick={handleCancel}>
                    取消
                </Button>
                <Button type="primary" htmlType="submit" style={{ marginLeft: '80px' }} onClick={deleteU}>
                    确认
                </Button>
            </div>
        </Modal>
    )
}

export default DeleteUserM