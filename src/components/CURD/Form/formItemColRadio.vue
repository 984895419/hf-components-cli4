<template>
  <el-col :span="span">
    <el-form-item
      :size="$store.size"
      :label="computeLabel"
      :prop="prop"
      :label-width="labelWidth"
      :required="required"
      :rules="rules"
      :error="error"
    >
      <slot>
        <el-radio
          v-model="value[prop]"
          v-for="item in radioList"
          :key="item.value"
          :label="item.value"
          border>{{item.label}}
        </el-radio>
      </slot>
    </el-form-item>
  </el-col>
</template>
<script>
import FormItemMixin from './formItem.mixin'
export default {
  name: 'FormItemColRadio',
  props: {
    span: {
          type: Number,
          default: undefined
        },
    value: {
          type: Object,
          default: undefined
        },
    rules: {
          type: Object,
          default: undefined
        },
    error: {
          type: String,
          default: undefined
        },
    label: {
          type: String,
          default: undefined
        },
    required: {
          type: Boolean,
          default: undefined
        },
    labelWidth: {
          type: String,
          default: undefined
        },
      radioList: {
        type: Array,
          default: function () {
              return []
          }
      }
  },
  mixins: [FormItemMixin]
}
</script>
