import { Modal, Button } from 'antd';
import { deleteActivity, batchdDeleteActivity } from '~request/api/activity';

const DeleteActivityM = (props) => {
    const { batchFlag, deleteFlag, setDeleteFlag,setCurrentNode, currentNode, getActivityList, selectedRowKeys, setSelectedRowKeys } = props

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
         let res = null
        if(batchFlag){
            res = await batchdDeleteActivity({
                activeIds: selectedRowKeys
            })
        } else {
            res = await deleteActivity({
                activeId: currentNode.activeId
            })
        }
        if(res.code === 0){
            setDeleteFlag(false)
            setSelectedRowKeys([])
            getActivityList()
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
            确定删除{
                    batchFlag ?
                    <><span style={{ color: 'red', margin: '0 6px' }}>{selectedRowKeys.length}</span>项</>
                    :
                    <span style={{ color: 'red', marginLeft: '6px' }}>{currentNode.title}</span>
                }
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