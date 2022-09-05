/**
 * 通知
 */

export default {
  /**
   * 弹出框提示，可以扩展根本不同的类型弹出不同的提示
   * @param body
   */
  show: function(target, body) {
    if (body.url) {
      // 如果存在路由地址，则增加1个路由地址
      target.$notify({
        type: body.theme,
        title: body.title,
        message: body.context,
        dangerouslyUseHTMLString: true,
        position: body.position || 'bottom-right',
        onClick: function() {
          target.$router.push({ path: body.url, params: body })
        }
      })
    } else {
      target.$notify({
        type: body.theme,
        title: body.title,
        message: body.context,
        dangerouslyUseHTMLString: true,
        position: body.position || 'bottom-right'
      })
    }
  }
}
