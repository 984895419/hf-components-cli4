import request from '@/connect/request'

// 同步用户信息
export function hfBaseUserInfosync(data) {
  return request({
    url: '/api/hfBaseUserInfo/sync',
    method: 'get',
    data
  })
}
//获取公司与部门
export function companyDeparts(data) {
  return request({
    url: '/api/hfBaseCompanyInfo/companyDeparts',
    method: 'get',
    data
  })
}
//根据id查人员
export function CompanyInfoidQuery(pageSize,pageNo) {
  return request({
    url: `'/api/hfBaseCompanyInfo/idQuery?pageInfo.pageSize=${pageSize}&treeGridLazy=true&pageInfo.pageNo=${pageNo}'`,
    method: 'get',
    data
  })
}

export function syncNcInfoData(query) {
  return request({
    url: '/api//hfBaseUserInfo/sync',
    method: 'get',
    params: query
  })
}