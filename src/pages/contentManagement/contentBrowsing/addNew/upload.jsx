import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import cos from '~utils/cos';
const ActiveImg = () => {
    const fileList = [
        {
            uid: '-1',
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }
    ]
    const upload = async (file) => {
        let res = await cos.putObject(file.file)
        console.log(res)
    }
    // 获取
    return (
        <Upload
            customRequest={upload}
            listType="picture"
            defaultFileList={[...fileList]}
            className="upload-active"
            maxCount={1}
        >
            <Button icon={<UploadOutlined />}>图片上传</Button>
        </Upload>
    )
}

export default ActiveImg