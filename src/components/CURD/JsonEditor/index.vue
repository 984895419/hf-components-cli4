<template>
  <el-row>
    <el-col :span="24" style="padding: 10px">
      <vue-json-editor
        v-model="value"
        :show-btns="false"
        :mode="'code'"
        lang="zh"
        style="height: 420px"
        @json-change="onJsonChange"
        @json-save="onJsonSave"
        @has-error="onError"
      />
      <br>
      <el-button type="primary" @click="checkJson">确定</el-button>
    </el-col>
  </el-row>
</template>

<script>
// 导入模块
import vueJsonEditor from 'vue-json-editor'

export default {
  name: 'JsonEditor',
  // 注册组件
  components: { vueJsonEditor },
  props: {
    value: {
      type: [Object, Array],
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      // 初始的数据
      initValue: this.value,
      // json是否验证通过
      hasJsonFlag: true
    }
  },
  methods: {
    onJsonChange(value) {
      this.onJsonSave(value)
    },
    onJsonSave(value) {
      // 实时保存
      this.$emit('input', value)
      this.hasJsonFlag = true
    },
    onError(value) {
      this.hasJsonFlag = false
    },
    // 检查json
    checkJson() {
      if (this.hasJsonFlag === false) {
        this.$message.error('json验证失败')
        return false
      } else {
        this.$message.error('json验证成功')
        return true
      }
    }
  }
}
</script>

<style>
.jsoneditor-vue {
  height: 100%;
}
</style>
