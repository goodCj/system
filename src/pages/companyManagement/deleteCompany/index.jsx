import { Modal, Button, message } from 'antd';
import { _deleteCompany } from '~request/api/company';

const DeleteCompanyM = (props) => {
    const { deleteFlag, setDeleteFlag, deleteCompany, getCompanylist } = props

    /**
     * @method handleCancel
     * @description 点击关闭遮罩
     */
    const handleCancel = () => {
        setDeleteFlag(false)
    }

    const deleteBtn = async () => {
        let res = await _deleteCompany({
            id: deleteCompany.id
        })
        if(res.code === 0){
            message.success('删除成功！')
            setDeleteFlag(false)
            getCompanylist()
        }
    }

    return (
        <Modal
            title="删除"
            width="350px"
            className="deleteCompanyModal"
            visible={deleteFlag}
            onCancel={handleCancel}
            footer={null}
        >
            <div style={{ textAlign: 'center', margin: '20px 0 40px' }}>
                确定删除<span style={{ color: 'red' }}>{deleteCompany.companyName}</span>
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

export default DeleteCompanyM