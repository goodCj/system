import { Modal, Button } from 'antd';

const DeleteTagM = (props) => {
    const { deleteFlag, setDeleteFlag, currentDelete, deleteTag } = props

    /**
     * @method handleCancel
     * @description 点击关闭遮罩
     */
    const handleCancel = () => {
        setDeleteFlag(false)
    }

    const deleteBtn = () => {
        deleteTag()
    }

    return (
        <Modal
            title="删除"
            width="350px"
            className="deleteUserModal"
            visible={deleteFlag}
            onCancel={handleCancel}
            footer={null}
        >
            <div style={{ textAlign: 'center', margin: '20px 0 40px' }}>
                确定删除<span style={{ color: 'red' }}>{currentDelete.name}</span>
            </div>
            <div style={{ textAlign: 'center' }}>
                <Button htmlType="submit" onClick={handleCancel}>
                    取消
                </Button>
                <Button type="primary" htmlType="submit" style={{ marginLeft: '80px' }} onClick={deleteBtn}>
                    确认
                </Button>
            </div>
        </Modal>
    )
}

export default DeleteTagM