<template>
  <el-col :span="span">
    <el-form-item
      v-bind="$attrs"
      :label="$t(namespace + '.' + prop)"
    >
      <slot>
        {{ value[prop] }}
      </slot>
    </el-form-item>
  </el-col>
</template>

<script>
export default {
    name: 'FormItemText',
    props: {
        namespace: {
          type: String,
          default: undefined
        },
        prop: {
          type: String,
          default: undefined
        },
        value: {
          type: Object,
          default: undefined
        },
        span: {
          type: Number,
          default: undefined
        }
    }
}
</script>

<style scoped>

</style>
