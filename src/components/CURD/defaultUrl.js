/**
 * 默认的url配置
 * @param baseUrl
 * @param primaryKeyField 主键字段
 * @returns {{queryUrl: string, enableUrl: string, disableUrl: string, updateUrl: string, addUrl: string, listUrl: string, pageUrl: string, deleteUrl: string, batchUpdateUrl: string}|{}}
 */
export function defaultUrlMethod(baseUrl, primaryKeyField, customUrl) {
  primaryKeyField = primaryKeyField || 'id'
  if (baseUrl) {
    return {
      // 分页查询地址等
      pageUrl: baseUrl + '/nameQuery',
      addUrl: baseUrl + '/save',
      updateUrl: baseUrl + '/{' + primaryKeyField + '}',
      queryUrl: baseUrl + '/{' + primaryKeyField + '}',
      deleteUrl: baseUrl + '/{' + primaryKeyField + '}',
      enableUrl: baseUrl + '/enable/{' + primaryKeyField + '}',
      disableUrl: baseUrl + '/disable/{' + primaryKeyField + '}',
      listUrl: baseUrl + '/list',
      listQueryUrl: baseUrl + '/list/query',
      batchUpdateUrl: baseUrl + '/batch',
      batchQueryUrl: baseUrl + '/batch/{' + primaryKeyField + '}',
      ...customUrl
    }
  } else {
    return customUrl
  }
}
