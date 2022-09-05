/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

/**
 * 非法字符 ((?![非法字符]).)*
 * @type {RegExp}
 */
export const specificationRegExp = /^((?!&).)*$/

/**
 * 车牌号正则
 * @type {RegExp}
 */
export const carNoRegExp = /^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1})$/
/**
 * 电话正则
 * @type {RegExp}
 */
export const phoneNoRegExp = /^(1(3|4|5|7|8)\d{9})$/
export const specificationRegExp2 = /^[^&12]*$/
/**
 * 汉字
 * @type {RegExp}
 */
export const chineseRegExp = /^[\u4e00-\u9fa5]+$/
/**
 * 数字
 * @type {RegExp}
 */
export const numRegExp = /^[0-9]+$/
/**
 * 字母
 * @type {RegExp}
 */
export const letterRegExp = /^[a-zA-Z]+$/
/**
 * 字母+数字
 * @type {RegExp}
 */
export const letternumRegExp = /^[a-zA-Z0-9]+$/

/**
 * 常用数字校验
 * https://www.cnblogs.com/fenggwsx/p/13326990.html
 * 实数(数值)
 */
export const numberRegExp = /^-?([1-9]\d*|0)(\.\d+)?$/

/**
 * 正实数(大于零的数):正则表达式
 * @type {RegExp}
 */
export const positiveNumberRegExp = /^([1-9]\d*(\.\d+)?|0\.\d*[1-9]\d*)$/
export const positiveNumberAndZeroRegExp = /^(0?|[1-9]\d*(\.\d+)?|0\.\d*[1-9]\d*)$/
export const dayu0 = /^([1-9]\d*(\.\d+)?|0\.\d*[1-9]\d*)$/
/**
 * 负实数:正则表达式
 * @type {RegExp}
 */
export const negativeNumberRegExp = /^-([1-9]\d*(\.\d+)?|0\.\d*[1-9]\d*)$/

/**
 * 非负数(大于等于0的数):正则表达式 ([1-9]\d*|0)(\.\d+)?
 * @type {RegExp}
 */
export const nonnegativeRegExp = /^\d+(\.{0,1}\d+){0,1}$/
export const dadeng0 = /^\d+(\.{0,1}\d+){0,1}$/
/**
 * 非正数(小于等于0的数):正则表达式 -([1-9]\d*|0)(\.\d+)?
 * @type {RegExp}
 */
export const nonpositiveRegExp = /^-\d+(\.{0,1}\d+){0,1}$/

/**
 * 整数:
 * @type {RegExp}
 */
export const integerRegExp = /^-?[1-9]\d*|0$/
/**
 * 正整数
 * @type {RegExp}
 */
export const positiveintegerRegExp = /^[1-9]\d*$/
/**
 * 负整数
 * @type {RegExp}
 */
export const negativeintegerRegExp = /^-[1-9]\d*$/
/**
 * 非正整数
 * @type {RegExp}
 */
export const nonpositiveintegerRegExp = /^-[1-9]\d*|0$/
/**
 * 非负整数
 * @type {RegExp}
 */
export const nonnegativeintegerRegExp = /^[1-9]\d*|0$/
/**
 * 小数
 * @type {RegExp}
 */
export const decimalRegExp = /^-?([1-9]\d*|0)\.\d+$/
/**
 * 正小数
 * @type {RegExp}
 */
export const positivedecimalRegExp = /^([1-9]\d*\.\d+|0\.\d*[1-9]\d*)$/
/**
 * 负小数
 * @type {RegExp}
 */
export const negativedecimalRegExp = /^-([1-9]\d*\.\d+|0\.\d*[1-9]\d*)$/
/**
 * 非负小数
 * @type {RegExp}
 */
export const nonpositivedecimalRegExp = /^([1-9]\d*|0)\.\d+$/
/**
 * 非正小数
 * @type {RegExp}
 */
export const nonnegativedecimalRegExp = /^-([1-9]\d*|0)\.\d+$/

/**
 * 输入小数位最大9位
 * @type {RegExp}
 */
export const decimalPlaces9RegExp = /^(?!0+$)(?!0*\.0*$)\d{1,8}(\.\d{1,9})?$/

