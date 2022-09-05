
import { mapGetters } from 'vuex'
export default {
  props: {
    prop: {
      type: String,
      default: undefined
    },
    namespace: {
      type: String,
      default: undefined
    }
  },
  computed: {
    ...mapGetters([
      'helper'
    ]),
    /**
     * 标签规则
     * @returns {string}
     */
    computeLabel() {
      return this.label ? this.label : (this.namespace ? this.$t(this.namespace + '.' + this.prop) : '')
    },
    /**
     * placeholder占位符的默认规则
     * @returns {*}
     */
    computedPlaceholder() {
      if (this.$attrs['placeholder']) {
        return this.$attrs['placeholder']
      }
      const placeholderKey = this.namespace + '.' + this.prop + 'Placeholder'
      const defaultPlaceholder = this.$t(placeholderKey)
      if (defaultPlaceholder !== placeholderKey) {
        return defaultPlaceholder
      }
      return this.$t('common.pleaseInput') + this.computeLabel
    },
    /**
     * 在国际化文案中存在指定后缀的文案
     * @returns {function(*): boolean}
     */
    existComputedSuffix() {
      return (suffix) => {
        if (this.helper !== 'true') {
          return false
        }
        const suffixKey = this.namespace + '.' + this.prop + suffix
        const value = this.$t(suffixKey)
        return value !== suffixKey
      }
    },
    /**
     * 国际化文案
     * @returns {function(*)}
     */
    computedSuffixContent() {
      return (suffix) => {
        const suffixKey = this.namespace + '.' + this.prop + suffix
        const value = this.$t(suffixKey)
        return value
      }
    }
  }
}
