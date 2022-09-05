
import { isEmpty } from 'element-ui/src/utils/util'

export function messageErrorHandle(that, response, operateStr, append) {
  let errorMsg = operateStr + (append ? '' : that.$t('common.result.failed'))
  const resMsg = response.resMsg
  const res = response.res
  if (!isEmpty(resMsg)) {
    if (resMsg.indexOf('#hfexception#') > -1) {
      errorMsg = resMsg
      errorMsg = errorMsg.replace(/#hfexception#/g, '')
      if (!isEmpty(res)) {
        errorMsg = '【' + res + '】: ' + errorMsg
      }
    } else if (resMsg.indexOf('违反完整约束条件') > -1) {
      if (resMsg.indexOf('已找到子记录')) {
        errorMsg = '此纪录已在后续资料中使用'
      } else if (resMsg.indexOf('未找到父项关键字')) {
        errorMsg = '未找到父项关键字'
      } else {
        errorMsg = 'erro'
      }
    }
  }
  that.$message({
    type: 'error',
    message: errorMsg
  })
}

export function messageSuccesHandle(that, operateStr) {
  that.$message({
    type: 'success',
    message: operateStr + that.$t('common.result.successed')
  })
}
