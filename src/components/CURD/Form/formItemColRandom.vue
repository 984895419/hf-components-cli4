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
          <el-input
            v-model="value[prop]"
            v-bind="$attrs"
            :readonly="true"
            :placeholder="computedPlaceholder"
          />
        </el-tooltip>
        <el-input
          v-else
          v-model="value[prop]"
          v-bind="$attrs"
          :readonly="true"
          :placeholder="computedPlaceholder"
        />
      </slot>
    </el-form-item>
  </el-col>
</template>
<script>
import FormItemMixin from './formItem.mixin'
const _lowCase = 'abacdefghjklmnopqrstuvwxyz'
const _upperCase = 'ABCDEFGHJKLMNOPQRSTUVWXYZ'
const _number = '0123456789'
const _charStr = _lowCase + _upperCase + _number
export default {
  name: 'FormItemColRandom',
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
        length: {
          type: Number,
          default: 10
        }
  },
  created() {
    if (!this.value[this.prop]) {
      this.$set(this.value, this.prop, this.getRandomString(this.length))
    }
  },
  methods: {
    /**
     * ?????????????????????
     * @param len ???????????????????????????
     */
    getRandomString(len) {
        const min = 0; const max = _charStr.length - 1; let _str = ''
        // ????????????????????????????????????????????????15
        len = len || 15
        // ?????????????????????
        for (var i = 0, index; i < len; i++) {
            index = this.RandomIndex(min, max, i)
            _str += _charStr[index]
        }
        return _str
    },
    /**
     * ??????????????????
     * @param min ?????????
     * @param max ?????????
     * @param i ??????????????????
     */
    RandomIndex(min, max, i) {
        let index = Math.floor(Math.random() * (max - min + 1) + min)
            const numStart = _charStr.length - 10
        // ?????????????????????????????????????????????????????????
        if (i === 0 && index >= numStart) {
            index = this.RandomIndex(min, max, i)
        }
        // ?????????????????????
        return index
    }
  }
}
</script>
