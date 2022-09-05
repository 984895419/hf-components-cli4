<template>
  <el-row :gutter="5">
    <slot :span="defaultSpan" />
  </el-row>
</template>

<script>
export default {
  name: 'RowSpanSlot',
  props: {
    activeReCalculate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      /**
       * 默认一行显示几个查询, 默认3个
       */
      showNum: 4,
      /**
       * 默认显示的span个数
       */
      defaultSpan: 6
    }
  },
  watch: {
    activeReCalculate: {
      handler: function(val) {
        this.$nextTick(() => {
          this.showNumCalculate()
        })
      },
      immediate: true
    }
  },
  /**
   * 创建时候执行
   */
  created() {
    window.onresize = this.showNumCalculate
  },
  methods: {
    /**
     * 显示数量计算
     */
    showNumCalculate() {
      if (this.options && this.options.showNum) {
        this.showNum = this.options.showNum
      } else {
        const s = (this.$el && this.$el.getBoundingClientRect().width) || document.body.clientWidth
        if (s < 768) {
          this.showNum = 1
        } else if (s > 768 && s < 1200) {
          this.showNum = 2
        } else if (s > 1200 && s < 1912) {
          this.showNum = 3
        } else if (s >= 1912) {
          this.showNum = 4
        }
      }
      // 默认的显示个数
      this.defaultSpan = 24 / this.showNum
    }
  }
}
</script>

<style scoped>

</style>
