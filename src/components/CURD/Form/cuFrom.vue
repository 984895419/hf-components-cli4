<template>
  <el-form ref="form" :size="size" :model="value" :label-width="$attrs['label-width'] || 'auto'" v-bind="$attrs"
    :rules="formRules" @submit.native.prevent>
    <el-card class="box-card">
      <slot :data="value" :errorMessage="errorMessage" />
    </el-card>
    <el-form-item style="margin:10px 0 5px 0">
      <div style="float: right">
        <slot name="add-btn-before" :data="value" :formValidate="formValidate" />
        <el-button type="primary" native-type="submit" :size="size" icon="el-icon-search" @click="doSubmit">{{
            $t('common.submit')
        }}</el-button>
        <el-button icon="el-icon-circle-close" :size="size" @click="doCancel">{{ $t('common.cancel') }}</el-button>
        <slot name="add-btn-after" :data="value" :formValidate="formValidate" />
      </div>
    </el-form-item>
  </el-form>
</template>
<script>
import { getData, getMessage, isSuccessResult, isTheRetCode } from '@/utils/ajaxResultUtil'
import { mapGetters } from 'vuex'
export default {
  name: 'CuForm',
  props: {
    value: {
      type: Object,
      default: function () {
        return {}
      }
    },
    formRules: {
      type: Object,
      default: function () {
        return {}
      }
    },
    actionMethod: {
      type: Function,
      required: true
    },
    beforeSubmit: {
      type: Function,
      default: undefined
    },
    namespace: {
      type: String
    }
  },
  data() {
    return {
      errorInfo: null
    }
  },
  computed: {
    ...mapGetters([
      'size'
    ]),
    errorMessage() {
      return (field) => {
        if (this.errorInfo) {
          // 不能为空
          if (this.namespace && this.errorInfo[field] && this.errorInfo[field].endsWith('NOT_NULL')) {
            return this.$t(this.namespace + '.' + field) + this.$t('common.notAllowedNull')
          }
          // 不存在
          if (this.namespace && this.errorInfo[field] && this.errorInfo[field].endsWith('NOT_EXIST')) {
            return this.$t(this.namespace + '.' + field) + this.$t('common.notExist')
          }
          // 不能为空串/空集合
          if (this.namespace && this.errorInfo[field] && this.errorInfo[field].endsWith('NOT_EMPTY')) {
            return this.$t(this.namespace + '.' + field) + this.$t('common.notEmpty')
          }
          // 不可重复
          if (this.namespace && this.errorInfo[field] && this.errorInfo[field].endsWith('NOT_DUPLICATE')) {
            return this.$t(this.namespace + '.' + field) + this.$t('common.notDuplicate')
          }
          return this.errorInfo[field]
        }
        return undefined
      }
    }
  },
  methods: {
    /**
     * 表单验证的回调
     * @param cb
     */
    formValidate(cb) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          cb()
        } else {
          return false
        }
      })
    },
    /**
     * 提交的时候执行
     */
    doSubmit() {
      this.errorInfo = null
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.beforeSubmit) {
            const passed = this.beforeSubmit(this.value)
            if (!(passed === true)) {
              return
            }
          }
          // 发送post请求
          this.loading = true
          this.actionMethod(this.value).then(resp => {
            if (isSuccessResult(resp)) {
              this.$message.success(getMessage(resp))
              this.$emit('success')
              this.$emit('closeDialog')
            } else {
              if (isTheRetCode(resp, '00004') === true) {
                this.errorInfo = getData(resp)
              } else {
                this.$message.error(getMessage(resp))
              }
            }
            this.loading = false
          }).catch(res => {
            console.log(res)
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    /**
     * 重置
     */
    doCancel() {
      this.$emit('closeDialog')
    }
  }
}
</script>
