<template>
  <el-col :span="span">
    <el-form-item
      :size="$store.size"
      :prop="prop"
      :label="computeLabel ? computeLabel : $t('common.state')"
      :label-width="labelWidth"
      :required="required"
      :rules="rules"
      :error="error"
    >
      <slot>
        <el-switch
          v-model="value.enableState"
          :active-value="1"
          :inactive-value="0"
          v-bind="$attrs"
          v-on="$listeners"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-text="$t('common.enable')"
          :inactive-text="$t('common.disable')"
        />
      </slot>
    </el-form-item>
  </el-col>
</template>
<script>
export default {
  name: 'FormItemColEnableState',
  props: {
    span: {
          type: Number,
          default: undefined
        },
    value: {
          type: Object,
          default: undefined
        },
    prop: {
          type: String,
          default: 'enableState'
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
    namespace: {
          type: String,
          default: undefined
        }
  },
    computed: {
      computeLabel() {
          return this.label ? this.label : (this.namespace ? this.$t(this.namespace + '.' + this.prop) : '')
      },
      computedPlaceholder() {
          return this.$attrs['placeholder'] ? this.$attrs['placeholder'] : this.$t('common.pleaseInput') + this.computeLabel
      }
    }
}
</script>
