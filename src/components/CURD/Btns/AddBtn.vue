<template>
  <div>
    <el-button
      :type="type"
      :icon="showIcon ? icon : undefined"
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
      top="5vh"
      v-bind="Object.assign({ 'close-on-click-modal': false}, $attrs)"
      v-on="$listeners"
    >
      <div style="margin-top:20px">
        <slot :data="postData" :closeDialog="closeDialog" />
      </div>
    </el-dialog>
  </div>
</template>

<script>/**
 * 新增按钮
 */
import { deepClone } from '@/utils'
import { mapGetters } from 'vuex'

export default {
  name: 'AddBtn',
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    icon: {
      type: String,
      default: 'el-icon-circle-plus-outline'
    },
    showIcon: {
      type: Boolean,
        default: true
    },
    title: {
        type: String,
        default: function() {
            return this.$t('common.add')
        }
    },
    label: {
      type: String,
      require: true,
        default: function() {
          return this.$t('common.add')
      }
    },
    initData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
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
      this.postData = deepClone(this.initData)
      this.showDialog = true
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
