import './index.scss'
import { Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [account, setAccount] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    /**
     * @method clickLogin
     * @description 点击登录
     */
    const clickLogin = () => {
        if(account === 'admin' && password === '123456'){
            history.push('/')
        }
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
                     value={ account }
                     onChange={ (e) => setAccount(e.target.value) }
                     />
                </div>
                <div className='login-content-password'>
                    <Input.Password
                    size="large"
                    placeholder="密码"
                    prefix={<LockOutlined className='icon' />}
                    value={ password }
                    onChange={ (e) => setPassword(e.target.value) }
                    onPressEnter = { clickLogin }
                    />
                </div>
                <Button
                className='login-content-loginBtn'
                type="primary"
                block
                onClick={ clickLogin }
                >
                    登录
                </Button>
            </div>
        </div>
    )
}

export default Login