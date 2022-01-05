import service from "../http";

// 获取用户列表
export const getUserList = (params) => {
    return service({
        url: '/admin/user/list',
        method: 'POST',
        data: params
    })
}

// 新增用户
export const createUser = (params) => {
    return service({
        url: '/admin/user/create',
        method: 'POST',
        data: params
    })
}

// 编辑用户
export const updateUser = (params) => {
    return service({
        url: '/admin/user/update',
        method: 'POST',
        data: params
    })
}

// 激活用户
export const activateUser = (params) => {
    return service({
        url: '/admin/user/update',
        method: 'POST',
        data: params,
        hideLoading: true
    })
}

// 删除用户
export const _deleteUser = (params) => {
    return service({
        url: '/admin/user/delete',
        method: 'POST',
        data: params
    })
}

// 批量上传用户
export const _batchImportUser = (params) => {
    return service({
        url: '/admin/user/batchAdd',
        method: 'POST',
        data: params,
        headers: {
            'encType': 'multipart/form-data'
        }
    })
}