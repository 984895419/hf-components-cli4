<template>
  <ResSplitPane
    split-to="columns"
    :allow-resize="true"
    resizer-color="#dfe6ec"
    :size="($attrs && $attrs.width) || autoWidth"
    :resizer-thickness="($attrs && $attrs['resizer-thickness']) || 1"
    :primary="($attrs && $attrs['primary']) || 'first'"
    class="panes-wrap"
    v-bind="$attrs"
    v-on="$listeners"
    @update:size="paneSize"
  >
    <template #firstPane>
      <slot :width="leftWidth" />
    </template>
    <template #secondPane>
      <slot name="right" />
    </template>
  </ResSplitPane>
</template>
<script>
import ResSplitPane from "vue-resize-split-pane";
export default {
  components: { ResSplitPane },
  props: {
    /**
     * 左边默认的宽度
     */
    width: {
      type: Number,
      default: () => {
        // 默认宽度为百分之35
        return window.innerWidth * 0.3;
      },
    },
    minWidth: {
      type: Number,
      default: () => {
        // 默认宽度为百分之35
        return 300;
      },
    },
  },
  data() {
    return {
      leftWidth: this.minWidth > this.width ? this.minWidth : this.width,
    };
  },
  computed: {
    autoWidth() {
      return this.minWidth > this.width ? this.minWidth : this.width;
    },
  },
  methods: {
    paneSize(size) {
      this.leftWidth = size;
    },
  },
};
</script>
<style lang="scss" scoped>
.pane-rs .Resizer {
  z-index: 500;
}
</style>
