import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import LoadingT from '../components/loading';
import { message } from 'antd';

// 创建axios实例
const service = axios.create({ timeout: 1000 * 6 })

// 显示loading
function showLoading() {
    if (!document.getElementById('loading')) {
        let dom = document.createElement('div')
        dom.setAttribute('id', 'loading')
        document.getElementById('layout-content')?.appendChild(dom)
        ReactDOM.render(<LoadingT />, dom)
    }
}

// 隐藏loading
function hideLoading() {
    let dom = document.getElementById('loading')
    dom && document.getElementById('layout-content')?.removeChild(dom)
}

// 请求拦截器
service.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        console.log(config)
        if (!config.hideLoading) {
            showLoading()
        }
        if (token) {
            config.headers.Authorization = `Bearer ${ token }`
        } else {
            if (window.location.hash.indexOf('login') === -1) {
                window.location.hash = '/login'
            }
        }
        return config
    },
    error => {
        console.log(error)
    }
)


// 响应拦截器
service.interceptors.response.use(
    response => {
        hideLoading()
        if (response.status === 200 && response.data) {
            if (response.data.code === 0) {
                return Promise.resolve(response.data)
            } else {
                message.error(response.data.message, 2)
            }
        } else {
            message.error('服务器错误，请稍后重试', 2)
        }
    },
    error => {
        hideLoading()
        message.error('服务器错误，请稍后重试', 2)
    }
)

export default service
