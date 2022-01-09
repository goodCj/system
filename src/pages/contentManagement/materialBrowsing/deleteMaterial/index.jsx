import { Modal, Button } from 'antd';
import { deleteMaterial } from '~request/api/material';

const DeleteMaterialM = (props) => {
    const { deleteFlag, setDeleteFlag,setCurrentNode, currentNode, getMaterialList } = props

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
     const _deleteMaterial = async () => {
        let res = await deleteMaterial({
            fodderId: currentNode.fodderId
        })
        if(res.code === 0){
            getMaterialList()
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
                <Button type="primary" htmlType="submit" style={{ marginLeft: '80px' }} onClick={_deleteMaterial}>
                    确认
                </Button>
            </div>
        </Modal>
    )
}

export default DeleteMaterialM