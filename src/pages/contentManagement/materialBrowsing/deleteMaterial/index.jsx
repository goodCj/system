import { Modal, Button } from 'antd';
import { deleteMaterial, batchDeleteMaterial } from '~request/api/material';

const DeleteMaterialM = (props) => {
    const {batchFlag, selectedRowKeys,setSelectedRowKeys, deleteFlag, setDeleteFlag,setCurrentNode, currentNode, getMaterialList } = props

    /**
     * @method handleCancel
     * @description 点击关闭遮罩
     */
    const handleCancel = () => {
        setDeleteFlag(false)
        setCurrentNode(null)
    }

    /**
     * @method deleteActive
     * @description 删除活动
     */
     const _deleteMaterial = async () => {
        let res = null
        if(batchFlag){
            res = await batchDeleteMaterial({
                fodderIds: selectedRowKeys
            })
        } else {
            res = await deleteMaterial({
                fodderId: currentNode.fodderId
            })
        }
        if(res.code === 0){
            getMaterialList()
            setSelectedRowKeys([])
            handleCancel()
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
                <Button type="primary" htmlType="submit" style={{ marginLeft: '80px' }} onClick={_deleteMaterial}>
                    确认
                </Button>
            </div>
        </Modal>
    )
}

export default DeleteMaterialM