<template>
  <el-button
    v-clipboard:success="successHandler"
    v-clipboard:error="failedHandler"
    v-clipboard:copy="copyData(data)"
    :type="btnType"
    v-bind="$attrs"
  >
    {{ label }}
  </el-button>
</template>

<script>
/**
 * 开发时候的按钮
 */
export default {
  name: 'CopyBtn',
  props: {
      btnType: {
          type: String,
          default: 'text'
      },
      label: {
          type: String,
          require: true,
          default: '复制'
      },
      value: [Object, Array, String],
      copyData: Function,
      data: Object
  },
    methods: {
        successHandler() {
            this.$message.success(this.$t('common.copySuccess'))
        },
        failedHandler() {
            this.$message.error(this.$t('common.copyFailed'))
        }
    }
}
</script>

<style scoped>

</style>
