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
        <el-tooltip
          v-if="existComputedSuffix('Helper')"
          class="item"
          effect="dark"
          :content="computedSuffixContent('Helper')"
          placement="right">
          <!-- 下拉 -->
          <el-select
            v-if="$attrs['multiple'] === undefined || $attrs['multiple'] === false"
            v-model="value[prop]"
            clearable
            v-bind="$attrs"
            :placeholder="computedPlaceholder"
            v-on="$listeners"
          >
            <el-option
              v-for="option in list"
              :key="selectOptionValue(option.value)"
              :value="selectOptionValue(option.value)"
              :label="option.label"
            />
          </el-select>
          <el-select
            v-else
            v-model="multipleSelect"
            clearable
            collapse-tags
            v-bind="$attrs"
            :placeholder="computedPlaceholder"
            v-on="$listeners"
            @change="multipleChange"
          >
            <el-option
              v-for="option in list"
              :key="option.value"
              :value="option.value"
              :label="option.label"
            />
          </el-select>
        </el-tooltip>
        <div v-else>
          <!-- 下拉 -->
          <el-select
            v-if="$attrs['multiple'] === undefined || $attrs['multiple'] === false"
            v-model="value[prop]"
            clearable
            v-bind="$attrs"
            :placeholder="computedPlaceholder"
            v-on="$listeners"
          >
            <el-option
              v-for="option in list"
              :key="selectOptionValue(option.value)"
              :value="selectOptionValue(option.value)"
              :label="option.label"
            />
          </el-select>
          <el-select
            v-else
            v-model="multipleSelect"
            clearable
            collapse-tags
            v-bind="$attrs"
            :placeholder="computedPlaceholder"
            v-on="$listeners"
            @change="multipleChange"
          >
            <el-option
              v-for="option in list"
              :key="option.value"
              :value="option.value"
              :label="option.label"
            />
          </el-select>
        </div>
      </slot>
    </el-form-item>
  </el-col>
</template>
<script>/**
 * 数据字典的方式; 数据字典的url
 */
import FormItemMixin from './formItem.mixin'

export default {
  name: 'FormItemColSelect',
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
    dictCode: {
      type: String,
      default: null
    },
    list: {
      type: Array
    }
  },
  mixins: [FormItemMixin],
  data() {
      return {
          multipleSelect: (this.$attrs['multiple'] === undefined || this.$attrs['multiple'] === false)
              ? [] : (this.value[this.prop] ? this.value[this.prop].split(',') : [])
      }
  },
  computed: {
      selectOptionValue() {
          return (val) => {
              if (this.value[this.prop]) {
                  if (typeof this.value[this.prop] === 'number') {
                      return parseInt(val)
                  }
                  if (typeof this.value[this.prop] === 'string') {
                      return val + ''
                  }
              }
              return val
          }
      }
  },
  methods: {
    multipleChange() {
      this.value[this.prop] = this.multipleSelect.join(',')
    }
  }
}
</script>
