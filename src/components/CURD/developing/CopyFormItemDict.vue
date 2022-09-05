<template>
  <el-button
    v-clipboard:success="successHandler"
    v-clipboard:error="failedHandler"
    v-clipboard:copy="copyData"
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
  name: 'CopyFormItemDict',
  props: {
      btnType: {
          type: String,
          default: 'text'
      },
      label: {
          type: String,
          require: true,
          default: '查询使用'
      },
      value: [Object, Array, String],
      formUsed: {
          type: Number,
          default: 0
      }
  },
    methods: {
        copyData() {
            return '<form-item-col-dict\n' +
                '            :value="' + (this.formUsed === 0 ? 'searchForm' : 'data') + '"\n' +
                '            :span="span"\n' +
                '            prop="menuType"\n' +
                '            :dict-code="\'' + this.value + '\'"\n' +
                '            :namespace="conf.namespace"\n' +
                '          />'
        },
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
