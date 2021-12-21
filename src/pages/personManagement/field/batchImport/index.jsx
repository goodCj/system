import './index.scss'
import { Modal } from 'antd';

const BatchImport = (props) => {
    const { batchImportFlag, setBatchImportFlag } = props

    /**
     * @method handleCancel
     * @description 点击关闭遮罩
     */
    const handleCancel = () => {
        setBatchImportFlag(false)
    }

    return (
        <Modal
            title="批量导入"
            width="480px"
            className="addNewPModal"
            visible={batchImportFlag}
            onCancel={handleCancel}
            footer={null}
        >
            批量导入
        </Modal>
    )
}

export default BatchImport