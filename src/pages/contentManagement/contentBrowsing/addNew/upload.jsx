import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import cos from '~utils/cos';
import { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
const ActiveImg = (props) => {
    const {img, setImg} = props
    const [fileList, setFileList] = useState([])
    const [file, setFile] = useState()
    useEffect(() => {
        if(img){
            setFileList([{
                name: 'uploadImg',
                url: img,
                uid: 'uploadImg',
                status: 'done'
            }])
        }
    }, [])

    /**
     * @method upload
     * @param {file} file
     * @description 上传
     */
    const upload = async (file) => {
        let res = await cos.putObject(file.file)
        setFileList([{
            ...res,
            uid: res.name,
            status: 'done'
        }])
        setFile(res)
        setImg(`https://${res.url}`)
    }
    /**
     * @method removeFile
     * @description 移除文件
     */
    const removeFile = (file) => {
        setFileList([])
        setImg('')
    }
    // 获取
    return (
        <Upload
            customRequest={upload}
            listType="picture"
            fileList={fileList}
            className="upload-active"
            maxCount={1}
            onRemove={removeFile}
        >
            <Button icon={<UploadOutlined />}>图片上传</Button>
        </Upload>
    )
}

export default ActiveImg