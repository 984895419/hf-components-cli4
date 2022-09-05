import request from '@/connect/request'

// 获取菜单树
export function hfBaseRightMenu(data) {
  return request({
    url: '/api/hfBaseRightMenu/nameQuery',
    method: 'get',
    data
  })
}

