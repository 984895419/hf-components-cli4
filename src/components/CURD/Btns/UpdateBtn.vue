<template>
  <div v-loading.fullscreen.lock="loading">
    <el-button
      :type="btnType"
      :size="size"
      @click="openDialog"
    >
      {{ label }}
    </el-button>
    <el-dialog
      :visible.sync="showDialog"
      width="75%"
      :title="title"
      append-to-body
      v-bind="Object.assign({ 'close-on-click-modal': false}, $attrs)"
      v-on="$listeners"
    >
      <div style="margin-top:20px">
        <slot :data="postData" :closeDialog="closeDialog" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { baseApiGetMethod } from '@/components/CURD/baseApi'
import { getData, getMessage, isSuccessResult } from '@/utils/ajaxResultUtil'
import { mapGetters } from 'vuex'

export default {
  name: 'UpdateBtn',
  props: {
    btnType: {
      type: String,
      default: 'primary'
    },
    label: {
      type: String,
      require: true,
        default: function() {
            return this.$t('common.edit')
        }
    },
    title: {
        type: String,
        default: function() {
            return this.$t('common.edit')
        }
    },
    /**
     * 附带的查询数据
     */
    queryData: Object,
    /**
     * 查询的url
     */
    url: String
  },
  data() {
    return {
      loading: false,
      showDialog: false,
      postData: null
    }
  },
  computed: {
    ...mapGetters([
      'size'
    ])
  },
  methods: {
    /**
     * 打开弹窗
     */
    openDialog() {
      // 从指定的
      this.loading = true
      baseApiGetMethod(this.url, this.queryData).then(resp => {
        if (isSuccessResult(resp)) {
          this.postData = getData(resp)
          this.showDialog = true
        } else {
          this.$message.error(getMessage(resp))
        }
        this.loading = false
      }).catch(e => {
        this.loading = false
      })
    },
    /**
     * 关闭弹窗
     */
    closeDialog() {
      this.showDialog = false
    }
  }
}
</script>

<style scoped>

</style>
