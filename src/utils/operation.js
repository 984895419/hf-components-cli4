/**
 *处理乘法精度偏差
 */
export function NumberMul(arg1, arg2) {
  if (arg1 === undefined || arg1 == null || arg1 === '') {
    arg1 = '0'
  }
  if (arg2 === undefined || arg2 == null || arg2 === '') {
    arg2 = '0'
  }
  let m = 0
  const s1 = arg1.toString()
  const s2 = arg2.toString()
  try {
    m += s1.split('.')[1].length
  } catch (e) {
    m = 0
  }
  try {
    m += s2.split('.')[1].length
  } catch (e) {
    m = m + 0
  }
  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
}

/**
 *处理加法精度偏差
 */
export function NumberAdd(arg1, arg2) {
  if (arg1 === undefined || arg1 == null || arg1 === '') {
    arg1 = '0'
  }
  if (arg2 === undefined || arg2 == null || arg2 === '') {
    arg2 = '0'
  }
  var r1, r2, m, n
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  n = (r1 >= r2) ? r1 : r2
  return ((arg1 * m + arg2 * m) / m).toFixed(n)
}

/**
 *处理减法精度偏差
 */
export function NumberSub(arg1, arg2) {
  if (arg1 === undefined || arg1 == null || arg1 === '') {
    arg1 = '0'
  }
  if (arg2 === undefined || arg2 == null || arg2 === '') {
    arg2 = '0'
  }
  var re1, re2, m, n
  try {
    re1 = arg1.toString().split('.')[1].length
  } catch (e) {
    re1 = 0
  }
  try {
    re2 = arg2.toString().split('.')[1].length
  } catch (e) {
    re2 = 0
  }
  m = Math.pow(10, Math.max(re1, re2))
  n = (re1 >= re2) ? re1 : re2
  return ((arg1 * m - arg2 * m) / m).toFixed(n)
}

/**
 *
 * @param arg1 除数
 * @param arg2 被除数
 * @param digit 保留的小数点后的位数
 * @returns {number}
 * @constructor
 */
export function NumberDiv(arg1, arg2, digit) {
  if (arg1 === undefined || arg1 == null || arg1 === '') {
    arg1 = '0'
  }
  if (arg2 === undefined || arg2 == null || arg2 === '') {
    arg2 = '0'
  }
  if (digit === undefined || digit == null || digit === '') {
    digit = '0'
  }
  var t1 = 0; var t2 = 0; var r1; var r2
  try {
    t1 = arg1.toString().split('.')[1].length
  } catch (e) {
    t1 = 0
  }
  try {
    t2 = arg2.toString().split('.')[1].length
  } catch (e) {
    t2 = 0
  }
  r1 = Number(arg1.toString().replace('.', ''))
  r2 = Number(arg2.toString().replace('.', ''))
  // 获取小数点后的计算值
  var result = ((r1 / r2) * Math.pow(10, t2 - t1)).toString()
  if (result.indexOf('.') === -1) {
    return result
  } else {
    var result2 = result.split('.')[1]
    if (result2.length > digit) {
      result2 = result2.substring(0, digit > result2.length ? result2.length : digit)
    }
    return Number(result.split('.')[0] + '.' + result2)
  }
}
