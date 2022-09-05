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
              :key="selectOptionValue(option.dictValue)"
              :value="selectOptionValue(option.dictValue)"
              :label="option.dictKey"
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
              :key="option.dictValue"
              :value="option.dictValue"
              :label="option.dictKey"
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
              :key="selectOptionValue(option.dictValue)"
              :value="selectOptionValue(option.dictValue)"
              :label="option.dictKey"
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
              :key="option.dictValue"
              :value="option.dictValue"
              :label="option.dictKey"
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

import { baseApiGetMethod } from '../baseApi'
import { getData, getMessage, isSuccessResult } from '../../../utils/ajaxResultUtil'
import FormItemMixin from './formItem.mixin'

export default {
  name: 'FormItemColDict',
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
    }
  },
  mixins: [FormItemMixin],
  data() {
      return {
          dictListUrl: '/api/baseDictValue/list/query',
          list: null,
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
  created() {
    this.loadDict()
  },
  methods: {
      /**
       * 加载字典信息
       */
    loadDict() {
        baseApiGetMethod(this.dictListUrl, { typeCode: this.dictCode, enableState: 1 }).then(resp => {
            if (isSuccessResult(resp)) {
              this.list = getData(resp)
            } else {
                this.$message.error(getMessage(resp))
            }
        })
    },
    multipleChange() {
      this.value[this.prop] = this.multipleSelect.join(',')
    }
  }
}
</script>
