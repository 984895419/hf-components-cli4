<template>
  <div>
    <el-popconfirm
      confirm-button-text='确定'
      @onConfirm="confirmDel(value, url)"
      cancel-button-text='取消'
      @onCancel="onCancel"
      icon="el-icon-info"
      icon-color="red"
      title="此操作将永久删除该记录, 是否继续?">
      <el-button :type="btnType" :size="size" :style="{ color: btnType !== 'text' ? '' : 'red' }" slot="reference">删除
      </el-button>
    </el-popconfirm>
  </div>
</template>

<script>

import { getMessage, isSuccessResult } from '@/utils/ajaxResultUtil'
import { baseApiDeleteMethod } from '@/components/CURD/baseApi'
import { mapGetters } from 'vuex'

export default {
  name: 'DelBtn',
  props: {
    btnType: {
      type: String,
      default: function () {
        return this.$t('common.delete')
      }
    },
    label: {
      type: String,
      require: true,
      default: function () {
        return this.$t('common.delete')
      }
    },
    value: [Object, Array, String],
    /**
     * 查询的url
     */
    url: String,
    /**
     * 删除的函数
     */
    deleteHandler: Function
  },
  computed: {
    ...mapGetters([
      'size'
    ])
  },
  created() {
    // console.log(this.value, "value")
    // console.log(this.deleteHandler, "deleteHandler")
    // console.log(this.url, "url")
  },
  methods: {
    /**
     * 打开弹窗
     */
    // openDialog() {
    //   if (this.value == null || this.value.length <= 0) {
    //     this.$message.warning('请选择1至少一条记录')
    //     return
    //   }
    //   this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     debugger
    //     if (this.deleteHandler) {
    //       this.deleteHandler(this.value)
    //     }
    //     if (this.url && this.value) {
    //       baseApiDeleteMethod(this.url, this.value).then(resp => {
    //         if (isSuccessResult(resp)) {
    //           this.$message({
    //             type: 'success',
    //             message: '删除成功!'
    //           })
    //           this.$emit('success')
    //         } else {
    //           this.$message.error(getMessage(resp))
    //           return
    //         }
    //       })
    //     }
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     })
    //   })
    // },

     /**
     *  确认删除
     */
    confirmDel(value, url) {
      if (value == null || value.length <= 0) {
        this.$message.warning('请选择1至少一条记录')
        return
      } else {
        if (this.deleteHandler) {
          this.deleteHandler(value)
        }
        if (url && value) {
          baseApiDeleteMethod(url, value).then(resp => {
            if (isSuccessResult(resp)) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.$emit('success')
            } else {
              this.$message.error(getMessage(resp))
              return
            }
          })
        }
      }
    },
    /**
     *  取消选择
     */
    onCancel() {
      this.$message({
        type: 'info',
        message: '已取消删除'
      })
    }
  }
}
</script>

<style scoped>
</style>
