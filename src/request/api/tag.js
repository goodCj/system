import service from "../http";

// 标签列表
export const tagList = (params) => {
    return service({
        url: '/admin/tags/list',
        method: 'POST',
        data: params,
        hideLoading: true
    })
}

// 新增标签
export const addTag = (params) => {
    return service({
        url: '/admin/tags/create',
        method: 'POST',
        data: params
    })
}

// 删除标签
export const _deleteTag = (params) => {
    return service({
        url: '/admin/tags/delete',
        method: 'POST',
        data: params,
        hideLoading: true
    })
}