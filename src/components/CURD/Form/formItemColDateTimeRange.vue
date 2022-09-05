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
            v-model="val"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            v-bind="$attrs"
            :picker-options="$attrs.pickerOptions || pickerOptions"
            :placeholder="computedPlaceholder"
            @change="valChange"
          />
        </el-tooltip>
        <el-date-picker
          v-else
          v-model="val"
          type="datetimerange"
          v-bind="$attrs"
          value-format="yyyy-MM-dd HH:mm:ss"
          :picker-options="$attrs.pickerOptions || pickerOptions"
          :placeholder="computedPlaceholder"
          @change="valChange"
        />
      </slot>
    </el-form-item>
  </el-col>
</template>
<script>
/**
 * 时间区间范围
 */
import FormItemMixin from './formItem.mixin'
export default {
  name: 'FormItemColDateTimeRange',
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
        minProp: {
          type: String,
          default: undefined
        },
        maxProp: {
          type: String,
          default: undefined
        }
  },
  data() {
    return {
      val: [],
      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        }
    }
  },
  computed: {
    propValue() {
      const val = []
      if (this.value[this.minProp]) {
        val.push(this.value[this.minProp])
      }
      if (this.value[this.maxProp]) {
        val.push(this.value[this.maxProp])
      }
      return val
    }
  },
  created() {
    this.val = this.propValue
  },
  methods: {
    valChange(val) {
      this.$set(this.value, this.minProp, val[0])
      this.$set(this.value, this.maxProp, val[1])
    }
  }
}
</script>
