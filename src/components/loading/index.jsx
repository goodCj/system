import React from "react"
import { Spin } from 'antd'
import './index.scss'

const LoadingT = () => {
    return (
        <div className="LoadingBox">
            <Spin tip="加载中...">
            </Spin>
        </div>
    )
}

export default LoadingT