import store from '@/store'
import { isEmpty } from 'element-ui/src/utils/util'

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.getters && store.getters.roles
    const permissionRoles = value

    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role)
    })

    if (!hasPermission) {
      return false
    }
    return true
  } else {
    console.error(`need roles! Like v-permission="['admin','editor']"`)
    return false
  }
}

export function hasPermission(permission) {
  const myPermissions = store.getters.operateList
  let isPerm = true
  if (isEmpty(myPermissions)) {
    isPerm = false
  } else {
    isPerm = myPermissions.indexOf(permission) > -1
  }
  return isPerm
}


export function hasPermMenu(permission) {
  const myPermissions = store.getters.menuList
  let isPerm = true
  if (isEmpty(myPermissions)) {
    isPerm = false
  } else {
    isPerm = myPermissions.indexOf(permission) > -1
  }
  return isPerm
}
