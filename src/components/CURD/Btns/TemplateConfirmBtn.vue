<template>
  <div>
    <el-button
      v-if="supportCheck"
      :type="btnType"
      :icon="icon"
      :size="size"
      @click="openDialog"
    >
      {{ label }}
    </el-button>
    <span v-else>不支持{{ this.supportCheck }}方式的请求</span>
  </div>
</template>

<script>

import { getMessage, isSuccessResult } from '@/utils/ajaxResultUtil'
import { baseApiDeleteMethod, baseApiPostMethod, baseApiPutMethod } from '@/components/CURD/baseApi'
import {getData} from '../../../utils/ajaxResultUtil'
import { mapGetters } from 'vuex'

export default {
  name: 'TemplateConfirmBtn',
  props: {
    icon: {
      type: String
    },
    btnType: {
      type: String,
      default: 'danger'
    },
    label: {
      type: String,
      require: true,
      default: '启用'
    },
    value: [Object, Array, String],
    /**
     * 查询的url
     */
    url: String,
    /**
     * http方法
     */
    httpMethod: {
      type: String,
      default: 'put'
    },
    confirmLabel: {
      type: String,
      default: function() {
        return '此操作将永久' + this.label + '该记录, 是否继续?'
      }
    },
    showConfirm: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters([
        'size'
    ]),
    supportCheck() {
      return [
        'delete', 'post', 'put'
      ].indexOf(this.httpMethod.toLowerCase()) >= 0
    }
  },
  methods: {
    /**
     * 打开弹窗
     */
    openDialog() {
      /**
       * 确定显示确认框
       */
      if (this.showConfirm) {
        // if (this.value == null || this.value.length <= 0) {
        //   this.$message.warning('请选择1至少一条记录')
        //   return
        // }
        this.$confirm(this.confirmLabel, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.doHttpExecute()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消' + this.label
          })
        })
      } else {
        this.doHttpExecute()
      }
    },
    doHttpExecute() {
      let promis = null
      if (this.httpMethod.toLowerCase() === 'delete') {
        promis = baseApiDeleteMethod(this.url, this.value)
      } else if (this.httpMethod.toLowerCase() === 'post') {
        promis = baseApiPostMethod(this.url, this.value)
      } else if (this.httpMethod.toLowerCase() === 'put') {
        promis = baseApiPutMethod(this.url, this.value)
      }
      promis.then(resp => {
        if (isSuccessResult(resp)) {
          if (getData(resp) === false) {
            this.$message({
              type: 'error',
              message: this.label + '失败!'
            })
          } else {
            this.$message({
              type: 'success',
              message: this.label + '成功!'
            })
            this.$emit('success')
          }
        } else {
          this.$message.error(getMessage(resp))
          return
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
