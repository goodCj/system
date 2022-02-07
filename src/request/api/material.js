import service from "../http";

// 素材列表
export const materialList = (params) => {
    return service({
        url: '/admin/fodder/list',
        method: 'POST',
        data: params
    })
}

// 新增素材
export const addNewMaterial = (params) => {
    return service({
        url: '/admin/fodder/create',
        method: 'POST',
        data: params
    })
}

// 绑定标签
export const addNewMaterialTag = (params) => {
    return service({
        url: '/admin/fodderTag/create',
        method: 'POST',
        data: params
    })
}

// 删除素材
export const deleteMaterial = (params) => {
    return service({
        url: '/admin/fodder/delete',
        method: 'POST',
        data: params
    })
}

// 更新素材
export const updateMaterial = (params) => {
    return service({
        url: '/admin/fodder/update',
        method: 'POST',
        data: params
    })
}