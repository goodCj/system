import { Modal, Button } from 'antd';
import { useEffect, useState } from 'react';

const DeleteUserM = (props) => {
    const {batchFlag, batchType, currentUser, deleteUserFlag, setDeleteUserFlag, deleteUser, selectedRowKeys, batchUser } = props

    const [text, setText] = useState('')

    useEffect(() => {
        if(batchType === 'delete'){
            setText('删除')
        }else if(batchType === 'active') {
            setText('激活')
        }else {
            setText('停用')
        }
    }, [batchType])

    /**
     * @method handleCancel
     * @description 点击关闭遮罩
     */
    const handleCancel = () => {
        setDeleteUserFlag(false)
    }

    const deleteU = () => {
        if(batchFlag){
            batchUser()
        } else {
            deleteUser()
        }
    }

    return (
        <Modal
            title={text}
            width="350px"
            className="deleteUserModal"
            visible={deleteUserFlag}
            onCancel={handleCancel}
            footer={null}
        >
            <div style={{ textAlign: 'center', margin: '20px 0 40px' }}>
                确定{text}{
                    batchFlag ?
                    <><span style={{ color: 'red', margin: '0 6px' }}>{selectedRowKeys.length}</span>项</>
                    :
                    <span style={{ color: 'red', marginLeft: '6px' }}>{currentUser.name}</span>
                }
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