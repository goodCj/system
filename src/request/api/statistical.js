import service from "../http";

// 获取用户数据
export const wxuser = (data) => {
    return service({
        url: '/admin/statistical/wxuser',
        method: 'POST',
        data,
    })
}

// 获取活动数据
export const active = (data) => {
    return service({
        url: '/admin/statistical/active',
        method: 'POST',
        data
    })
}

// 获取活动详细数据
export const activeDetails = (data) => {
  return service({
      url: '/admin/statistical/activeDetails',
      method: 'POST',
      data
  })
}


// 获取活动详细数据
export const activeRank = (data) => {
  return service({
      url: '/admin/statistical/rank',
      method: 'POST',
      data
  })
}