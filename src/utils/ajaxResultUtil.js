
export function isTheRetCode(data, expectedrRetCode) {
    return data.retCode === expectedrRetCode
}

export function isSuccessResult(data) {
    return data.retCode === '00001'
  }

export function getData(data) {
    return data.data
}

export function getMessage(data) {
    return data.message
}
