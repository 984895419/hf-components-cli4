<template>
  <el-tooltip
    v-if="existComputedSuffix('Helper')"
    class="item"
    effect="dark"
    :content="computedSuffixContent('Helper')"
    placement="right"
  >
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
        :key="selectOptionValue(option[valueProp])"
        :value="selectOptionValue(option[valueProp])"
        :label="option[labelProp]"
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
        :key="option[valueProp]"
        :value="option[valueProp]"
        :label="option[labelProp]"
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
        :key="selectOptionValue(option[valueProp])"
        :value="selectOptionValue(option[valueProp])"
        :label="option[labelProp]"
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
        :key="option[valueProp]"
        :value="option[valueProp]"
        :label="option[labelProp]"
      />
    </el-select>
  </div>
</template>
<script>
  import FormItemMixin from '../Form/formItem.mixin'
  export default {
    name: 'HfSelect',
    mixins: [FormItemMixin],
    props: {
      list: {
        type: Array
      },
      value: {
        type: Object,
        default: undefined
      },
      labelProp: {
        type: String,
        default: 'label'
      },
      /**
       *
       */
      valueProp: {
        type: String,
        default: 'value'
      }
    },
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
