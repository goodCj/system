import { message } from 'antd';
import COS from 'cos-js-sdk-v5'
import { getOssKey } from '~request/api/upload'
const randomString = (e) => {    
    e = e || 32;
    var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
    a = t.length,
    n = "";
    for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n
}
class Upload{
    _cos(file){
        return new COS({
            getAuthorization: function (options, callback){
                getOssKey({
                    bucket: 'img-1303063528',
                    region: 'ap-shanghai'
                }).then(config => {
                    console.log(config)
                    callback({
                        TmpSecretId: config.data.credentials.tmpSecretId,
                        TmpSecretKey: config.data.credentials.tmpSecretKey,
                        XCosSecurityToken: config.data.credentials.sessionToken,
                        ExpiredTime: config.data.expiredTime,
                        FileParallelLimit: 1
                    })
                })
            }
        })
    }
    putObject(file){
        return new Promise((resolve, reject) => {
            this._cos(file).putObject({
                Bucket: 'img-1303063528',
                Region: 'ap-shanghai',
                Key: `${randomString(6)}-${file.name.split('.')[0]}`,
                Body: file
            },
            (err) => {
                console.log(err)
                message.error('上传失败')
            }
            )
        })
    }
}
let cos = new Upload()

export default cos