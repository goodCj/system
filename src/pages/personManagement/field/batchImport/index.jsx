import './index.scss'
import { message, Modal, Radio, Upload } from 'antd';
import { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { _batchImportUser } from '~request/api/user';

const { Dragger } = Upload;

const BatchImport = (props) => {
    const { batchImportFlag, setBatchImportFlag, currentRole, setOutworkerDataOptions, setOfficeworkerDataOptions  } = props
    const [radioValue, setRadioValue] = useState(0)

    /**
     * @method handleCancel
     * @description 点击关闭遮罩
     */
    const handleCancel = () => {
        setBatchImportFlag(false)
    }

    /**
     * @method changeRadio
     * @param {object} e 获取到的radio的event值
     * @description 改变重复处理方式
     */
    const changeRadio = (e) => {
        setRadioValue(e.target.value)
    }

    /**
     * @method uploadFile
     * @description 上传文件
     */
    const uploadFile = async (info) => {
        let res = await _batchImportUser({
            role: currentRole,
            type: radioValue,
            file: info.file
        })
        if (res.code === 0) {

        }
    }

    const uploadProps = {
        name: 'file',
        showUploadList: false,
        action: '/admin/user/batchAdd',
        data: {
            type: radioValue,
            role: currentRole,
        },
        method: 'post',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            encType: 'multipart/form-data',
        },
        onChange(info) {
            const { status } = info.file
            if (status === 'done') {
                message.success('导入成功', 2)
                setBatchImportFlag(false)
                if (currentRole === 3) {
                    setOutworkerDataOptions({
                        count: 10,
                        offset: 0
                    })
                } else {
                    setOfficeworkerDataOptions({
                        count: 10,
                        offset: 0
                    })
                }
            }
        }
    };


    return (
        <Modal
            title="批量导入"
            width="520px"
            className="batchImportModal"
            visible={batchImportFlag}
            onCancel={handleCancel}
            footer={null}
        >
            <div className='importContent'>
                <div className="topOptions">
                    重复处理：
                    <Radio.Group onChange={changeRadio} value={radioValue}>
                        <Radio value={0}>覆盖</Radio>
                        <Radio value={1}>跳过</Radio>
                    </Radio.Group>
                </div>
                <div>
                    <Dragger
                        className='uploadImg'
                        {...uploadProps}
                    // name= 'file'
                    // showUploadList= {false}
                    // customRequest = {uploadFile}
                    >
                        <p style={{ marginBottom: '14px' }} className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <div style={{ marginBottom: '4px' }}>
                            点击或拖拽上传文件
                        </div>
                        <div style={{ fontSize: '12px', color: '#696969' }}>
                            支持拓展名：xlsx
                        </div>
                    </Dragger>
                </div>
                <div className='uploadTip'>请按模板格式填写后上传：<span onClick={() => window.open('www.baidu.com')}>下载标准模板</span></div>
            </div>
        </Modal>
    )
}

export default BatchImport