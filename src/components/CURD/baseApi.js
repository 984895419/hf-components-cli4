import request from '@/connect/request'

/**
 * get请求
 * @param query
 * @returns {*}
 */
export function baseApiGetMethod(url, query) {
  return request({
    url: url,
    method: 'get',
    params: query
  })
}

/**
 * post请求
 * @param data
 */
export function baseApiPostMethod(url, data) {
  return request({
    url: url,
    method: 'post',
    data
  })
}

/**
 * post请求  导出专用
 * @param data
 */
 export function baseApiPostMethodExp(url, data) {
  return request({
    url: url,
    method: 'post',
    data,
    responseType: 'blob'
  })
}

/**
 * put请求
 * @param data
 */
export function baseApiPutMethod(url, data) {
  return request({
    url: url,
    method: 'put',
    data
  })
}

/**
 * delete请求
 * @param data
 */
export function baseApiDeleteMethod(url, data) {
  return request({
    url: url,
    method: 'delete',
    data
  })
}
