import { parseTime } from '@/utils/index.js'
import { getToken } from '@/connect/auth'
import { doTranslate } from '@/api/translate'
import { isEmpty } from 'element-ui/src/utils/util'

const NUMBER_PATTER = /^(\d|\.)+$/

/**
 * 判断文本是否需要翻译
 * @param text
 */
function doesNeedTranslateValidate(text) {
  return NUMBER_PATTER.test(text)
}

/**
 * 翻译
 * @param translateText 文本
 * @param targetLanguage 目标语言
 * @returns {Promise<void>}
 */
async function translate(translateText, targetLanguage) {
  if (targetLanguage) {
    if (translateText === '' || translateText === undefined || translateText.trim() === '') {
      return ''
    }
    const strText = '' + translateText
    if (doesNeedTranslateValidate(strText)) {
      return translateText
    }
    const transData = { translateRequest: { text: strText, targetLanguage: targetLanguage }}
    let result = translateText
    await doTranslate(transData).then(resp => {
      if (resp.obj) {
        result = resp.obj.targetText
      }
    })
    return result
  }
  return translateText
}

function formatMoney(number, decimals = 0, decPoint = '.', thousandsSep = ',') {
  number = (number + '').replace(/[^0-9+-Ee.]/g, '')
  const n = !isFinite(+number) ? 0 : +number
  const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
  const sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
  const dec = (typeof decPoint === 'undefined') ? '.' : decPoint
  let s = ''
  const toFixedFix = function(n, prec) {
    const k = Math.pow(10, prec)
    return '' + Math.ceil(n * k) / k
  }
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
  const re = /(-?\d+)(\d{3})/
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, '$1' + sep + '$2')
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return s.join(dec)
}

export default {
  /**
   * 获取时间，返回年月日时分秒
   * @param time
   * @returns {string}
   */
  getDayTime(time) {
    return parseTime(time)
  },
  /**
   * 下载资源
   * @param obj
   * @returns {string}
   */
  download(obj, fileName) {
    const _form = document.createElement('form')
    _form.setAttribute('id', 'freeloads')
    _form.setAttribute('method', 'post')
    _form.setAttribute('action', process.env.VUE_APP_BASE_API + '/download/temp/' + obj)
    if (fileName) {
      const _input = document.createElement('input')
      _input.setAttribute('name', 'fileName')
      _input.setAttribute('id', 'fileName')
      _input.setAttribute('value', fileName)
      _form.append(_input)
    }
    document.body.appendChild(_form)
    _form.submit()
  },
  downloadFile(data) {
    if (!data) {
      return
    }
    const content = data
    const blob = new Blob([content])// 构造一个blob对象来处理数据
    // eslint-disable-next-line no-unused-vars
    let filename = data.filename
    if (isEmpty(filename)) {
      filename = 'download'
    }
    // 对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
    // IE10以上支持blob但是依然不支持download
    if ('download' in document.createElement('a')) { // 支持a标签download的浏览器
      const link = document.createElement('a')// 创建a标签
      link.download = filename// a标签添加属性
      link.style.display = 'none'
      link.href = URL.createObjectURL(blob)
      document.body.appendChild(link)
      link.click()// 执行下载
      URL.revokeObjectURL(link.href) // 释放url
      document.body.removeChild(link)// 释放标签
    } else { // 其他浏览器
      navigator.msSaveBlob(blob, filename)
    }
  },
  /**
   * 获取文件的完整地址
   * @param val
   * @returns {string}
   */
  getFilesysUrl(val) {
    return this.getBaseUrl() + 'getFile/' + val
  },
  /**
   * 上传文件的完整地址
   * @param val
   * @returns {string}
   */
  uploadFilesysUrl() {
    return this.getBaseUrl() + 'upload/'
  },
  /**
   * 获取项目基础地址
   * @returns {string}
   */
  getBaseUrl() {
    const url = 'http://10.106.88.79:8383/hf/filesys'
    return url + '/'
  },
  /**
   * 获取文件大小中文表达
   * @param size **kb
   * @returns {string}
   */
  sizeStr(size) {
    if (size > 1000) {
      return (size / 1000) + 'Mb'
    }
    return (size) + 'kb'
  },
  /**
   * 获取图片的完整地址
   * @param val
   * @returns {string}
   */
  getImageUrl(val) {
    return this.getBaseUrl() + '/upload/getImage?path=' + val
  },
  /**
   * 获取文件的完整地址
   * @param val
   * @returns {string}
   */
  getFileUrl(val) {
    return this.getBaseUrl() + '/download/fileAsStream/' + val
  },
  /**
   * 图片占位符
   * @returns {string}
   */
  getImagePlaceHolder() {
    return this.getBaseUrl() + '/upload/getImage?path=default.jpg'
  },
  /**
   * 允许上传的格式
   * @param allowtypes
   * @param fileName
   * @returns {boolean}
   */
  uploadMatchesType(allowtypes, fileName) {
    let typeMatches = false
    const typeArray = allowtypes.split(',')
    for (const a in typeArray) {
      let arry = typeArray[a]
      if (!arry.startsWith('.')) {
        arry = '.' + arry
      }
      if (fileName.endsWith(arry)) {
        typeMatches = true
      }
    }
    if (!typeMatches) {
      return false
    }
    return typeMatches
  },
  /**
   * 上传大小限制
   * @param allowSize
   * @param fileSize
   * @returns {boolean}
   */
  uploadMatchesSize(allowSize, fileSize) {
    return fileSize / 1024 < allowSize
  },
  /**
   * 构造请求头
   */
  headers() {
    return { 'X-Token': getToken() }
  },
  /**
   * 翻译及绑定
   * @param current
   * @param field
   * @param list
   */
  translateAndBind(current, field, list) {
    list.forEach(it => {
      if (it !== current && it[field].trim() === '') {
        translate(current[field], it.acceptLanguage).then(result => {
          const fuz = 'it.' + field + '= \'' + result + '\''
          // eslint-disable-next-line no-eval
          eval(fuz)
        })
      }
    })
  },
  /**
   * 动态加载js
   * @param url
   */
  asyncLoadJs(url) {
    const Q = require('q')
    return Q.Promise((resolve, reject) => {
      const srcArr = document.getElementsByTagName('script')
      let hasLoaded = false
      for (let i = 0; i < srcArr.length; i++) { // 判断当前js是否加载上
        hasLoaded = (srcArr[i].src === url)
      }
      if (hasLoaded) {
        resolve()
        return
      }
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = url
      document.body.appendChild(script)
      script.onload = () => {
        resolve()
      }
      script.onerror = () => {
        reject()
      }
    })
  },
  headtooltip(h, { column, $index }) {
    // h(param1, param2, param3)里
    // param1是这个元素的标签名，
    // param2是这个元素的属性，class之类
    // param3是这个元素的innerHtml和子元素组成的数组
    return h('el-tooltip', {
      props: {
        placement: 'top'
      }
    }, [
      h('div', {
        slot: 'content',
        style: {
          whiteSpace: 'normal'
        }
      }, column.label),
      h('span', column.label)
    ])
  },
  formatMoneyForTableRow(row, column, cellValue, index) {
    return formatMoney(cellValue)
  },
  /**
   * 从location中获取请求参数
   * @param {*} variable 参数名称
   * @returns 参数值
   */
  getQueryVariable(variable) {
    var query = window.location.search.substring(1)
    var vars = query.split('&')
    for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=')
            if (pair[0] === variable) {
              return pair[1]
            }
    }
    return undefined
  }
}

