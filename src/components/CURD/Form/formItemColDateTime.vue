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
        <!--        <el-input v-if="$attrs.type === 'number'"  v-model.number="value[prop]" v-bind="$attrs" :placeholer="computedPlaceholder"></el-input>-->
        <el-tooltip
          v-if="existComputedSuffix('Helper')"
          class="item"
          effect="dark"
          :content="computedSuffixContent('Helper')"
          placement="right"
        >
          <el-date-picker
            v-model="value[prop]"
            type="datetime"
            v-bind="$attrs"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
            :placeholder="computedPlaceholder"
          />
        </el-tooltip>
        <el-date-picker
          v-else
          v-model="value[prop]"
          type="datetime"
          v-bind="$attrs"
          value-format="yyyy-MM-dd HH:mm:ss"
          :picker-options="pickerOptions"
          :placeholder="computedPlaceholder"
        />
      </slot>
    </el-form-item>
  </el-col>
</template>
<script>
import FormItemMixin from './formItem.mixin'
export default {
  name: 'FormItemColDateTime',
  mixins: [FormItemMixin],
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
        pickerOptions: {
          type: Object,
          default: function() {
            return {
              shortcuts: [{
                text: '今天',
                onClick(picker) {
                  picker.$emit('pick', new Date())
                }
              }, {
                text: '昨天',
                onClick(picker) {
                  const date = new Date()
                  date.setTime(date.getTime() - 3600 * 1000 * 24)
                  picker.$emit('pick', date)
                }
              }, {
                text: '一周前',
                onClick(picker) {
                  const date = new Date()
                  date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                  picker.$emit('pick', date)
                }
              }]
            }
          }
        }
  }
}
</script>
