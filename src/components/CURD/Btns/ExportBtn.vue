<template>
  <div>
    <el-button
      :type="btnType"
      :icon="icon"
      :size="size"
      @click="openDialog"
    >
      {{ label }}
    </el-button>
  </div>
</template>

<script>
import { getMessage, isSuccessResult } from '@/utils/ajaxResultUtil'
import { baseApiDeleteMethod, baseApiPostMethod, baseApiPutMethod, baseApiPostMethodExp } from '@/components/CURD/baseApi'
import { mapGetters } from 'vuex'
export default {
    name: 'ExportBtn',
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
        /**
         * http方法
         */
        httpMethod: {
            type: String,
            default: 'post'
        },
        value: [Object, Array, String],
        /**
         * 查询的url
         */
        url: String,
        showConfirm: {
            type: Boolean,
            default: true
        },
        confirmLabel: {
            type: String,
            default: function() {
                return '确定进行导出?'
            }
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
                promis = baseApiPostMethodExp(this.url, this.value)
            } else if (this.httpMethod.toLowerCase() === 'put') {
                promis = baseApiPutMethod(this.url, this.value)
            }
            promis.then(resp => {
                if (resp.retCode) {
                    this.$message.error(getMessage(resp))
                }
            })
        }
    }
}
</script>

<style scoped>

</style>
