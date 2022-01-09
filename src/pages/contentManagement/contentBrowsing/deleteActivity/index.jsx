import { Modal, Button } from 'antd';
import { deleteActivity } from '~request/api/activity';

const DeleteActivityM = (props) => {
    const { deleteFlag, setDeleteFlag,setCurrentNode, currentNode, getActivityList } = props

    /**
     * @method handleCancel
     * @description 点击关闭遮罩
     */
    const handleCancel = () => {
        setCurrentNode(null)
        setDeleteFlag(false)
    }

    /**
     * @method deleteActive
     * @description 删除活动
     */
     const deleteActive = async () => {
        let res = await deleteActivity({
            activeId: currentNode.activeId
        })
        if(res.code === 0){
            getActivityList()
            setDeleteFlag(false)
        }
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
                确定删除<span style={{ color: 'red', marginLeft: '6px' }}>{currentNode.title}</span>
            </div>
            <div style={{ textAlign: 'center' }}>
                <Button htmlType="submit" onClick={handleCancel}>
                    取消
                </Button>
                <Button type="primary" htmlType="submit" style={{ marginLeft: '80px' }} onClick={deleteActive}>
                    确认
                </Button>
            </div>
        </Modal>
    )
}

export default DeleteActivityM