import service from "../http";

// 公司列表
export const companyList = (params) => {
    return service({
        url: '/admin/company/list',
        method: 'POST',
        data: params
    })
}

// 新增公司
export const addCompany = (params) => {
    return service({
        url: '/admin/company/create',
        method: 'POST',
        data: params
    })
}

// 删除公司
export const _deleteCompany = (params) => {
    return service({
        url: '/admin/company/delete',
        method: 'POST',
        data: params,
        hideLoading: true
    })
}