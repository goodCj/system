import service from "../http";

// 活动列表
export const activityList = (params) => {
    return service({
        url: '/admin/active/list',
        method: 'POST',
        data: params
    })
}

// 创建活动
export const createActivity = (params) => {
    return service({
        url: '/admin/active/create',
        method: 'POST',
        hideLoading: true,
        data: params
    })
}

// 更改活动信息
export const updateActivity = (params) => {
    return service({
        url: '/admin/active/update',
        method: 'POST',
        hideLoading: true,
        data: params
    })
}

// 删除活动
export const deleteActivity = (params) => {
    return service({
        url: '/admin/active/delete',
        method: 'POST',
        hideLoading: true,
        data: params
    })
}

// 获取活动所有类型 Type列表
export const ActivityTypeList = (params) => {
    return service({
        url: '/admin/activeType/list',
        method: 'POST',
        hideLoading: true,
        data: params
    })
}

// 创建活动类型
export const createActivityType = (params) => {
    return service({
        url: '/admin/activeType/create',
        method: 'POST',
        hideLoading: true,
        data: params
    })
}

// 删除活动类型
export const deleteActivityType = (params) => {
    return service({
        url: '/admin/activeType/delete',
        method: 'POST',
        hideLoading: true,
        data: params
    })
}

// 获取活动传播方式
export const activeBiffuseList = (params) => {
    return service({
        url: '/admin/activeBiffuse/list',
        method: 'POST',
        hideLoading: true,
        data: params
    })
}

// 创建活动传播方式
export const createActiveBiffuse = (params) => {
    return service({
        url: '/admin/activeBiffuse/create',
        method: 'POST',
        hideLoading: true,
        data: params
    })
}

// 删除活动传播方式
export const deleteActiveBiffuse = (params) => {
    return service({
        url: '/admin/activeBiffuse/delete',
        method: 'POST',
        hideLoading: true,
        data: params
    })
}

// 为活动添加标签
export const addActiveTag = (params) => {
    return service({
        url: '/admin/activeTags/create',
        method: 'POST',
        hideLoading: true,
        data: params
    })
}

// 为活动删除标签
export const deleteActiveTag = (params) => {
    return service({
        url: '/admin/activeTags/delete',
        method: 'POST',
        hideLoading: true,
        data: params
    })
}

// 为活动删除标签
export const getActiveData = (params) => {
    return service({
        url: '/admin/data/getActiveData',
        method: 'POST',
        hideLoading: true,
        data: params
    })
}