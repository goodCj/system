import service from "../http";

export const getOssKey = (params) => {
    return service({
        url: '/common/getCosConfig',
        method: 'POST',
        data: params
    })
}