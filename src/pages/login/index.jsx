import './index.scss'
import { Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { isLogin, getUserInfo } from '~request/api/base';

const Login = () => {
    const [account, setAccount] = useState('')
    const [password, setPassword] = useState('')
    const [loadingFlag, setLoadingFlag] = useState(false)
    const history = useHistory()

    /**
     * @method clickLogin
     * @description 点击登录
     */
    const clickLogin = () => {
        (async () => {
            if(account.length === 0 || password.length === 0){
                message.warning('请输入账号密码')
                return false
            }

            let params = {
                account,
                password
            }
            setLoadingFlag(true)
            let res = await isLogin(params)
            setLoadingFlag(false)
            if(res && res.code === 0){
                message.success('登录成功', 2)
                localStorage.setItem('token', res.data.token)
                getUser()
                history.push('/')
            }
        })()
    }

    /**
     * @method getUserInfo
     * @description 获取用户信息
     */
     const getUser =async () => {
        let data = await getUserInfo()
        localStorage.setItem('userInfo', JSON.stringify(data.data))
    }

    return (
        <div className="content-container login-container">
            <div className="login-content">
                <div className="login-content-title">齿科智能营销系统</div>
                <div className='login-content-account'>
                    <Input
                        size="large"
                        placeholder="账号"
                        prefix={<UserOutlined className='icon' />}
                        value={account}
                        onChange={(e) => setAccount(e.target.value)}
                    />
                </div>
                <div className='login-content-password'>
                    <Input.Password
                        size="large"
                        placeholder="密码"
                        prefix={<LockOutlined className='icon' />}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onPressEnter={clickLogin}
                    />
                </div>
                <Button
                    className='login-content-loginBtn'
                    type="primary"
                    block
                    onClick={clickLogin}
                >
                    登录 { loadingFlag && <LoadingOutlined className="loginLoading" spin /> }
                </Button>
            </div>
        </div>
    )
}

export default Login