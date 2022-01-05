import service from "../http";

// 用户登录
export const isLogin = (params) => {
    return service({
        url: '/common/login',
        method: 'POST',
        data: params,
        hideLoading: true
    })
}

// 获取登录信息
export const getUserInfo = (params) => {
    return service({
        url: '/admin/user/info',
        method: 'POST',
        hideLoading: true,
        data: params
    })
}