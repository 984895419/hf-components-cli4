<template>
  <ResSplitPane
    split-to="columns"
    :allow-resize="true"
    resizer-color="#dfe6ec"
    :size="($attrs && $attrs.width) || autoWidth"
    :resizer-thickness="($attrs && $attrs['resizer-thickness']) ||1"
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

<!--
  props: {
  'allow-resize': { type: Boolean, default: false },//是否可以拖动
  'split-to': { type: String, default: 'columns' }, // columns || rows    分隔成列  ||  分隔成行
  'primary': { type: String, default: 'first' }, // first || second   用于指定两个窗格中哪一个的大小是固定的。
  'size': { type: Number, default: 25 }, // in pixels || percents   固定窗格的初始宽度或高度，是宽度或高度，这取决于窗格的分割方式。
  'units': { type: String, default: 'pixels' }, // pixels || percents  指定单位，默认是像素，也可以是百分比
  'min-size': { type: Number, default: 16 }, // in pixels || percents  固定窗格可拖动到的最小宽度或高度
  'max-size': { type: Number, default: 0 }, // in pixels || percents　　固定窗格可拖动到的最大高度或宽度
  'step': { type: Number, default: 0 }, // in pixels only  每次拖动所移动的像素数
  'resizerThickness': { type: Number, default: 2 }, //in px - width of the resizer  分隔线的宽度  必须绑定的形式
  'resizerColor': { type: String, default: '#AAA' }, //  any css color - if you set transparency, it will afect the border too 分割线颜色
  'resizerBorderColor': { type: String, default: 'rgba(0,0,0, 0.15)' }, // any css color - #FFF, rgb(0,0,0), rgba(0,0,0,0)  分割线边框的颜色
  'resizerBorderThickness': { type: Number, default: 3 }, // in px - border that forms the shadow   分隔线边框的宽度或高度
},
-->
<script>

  import ResSplitPane from 'vue-resize-split-pane'
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
          return window.innerWidth * 0.30
        }
      },
      minWidth: {
        type: Number,
        default: () => {
          // 默认宽度为百分之35
          return 300
        }
      }
    },
    data() {
      return {
        leftWidth: this.minWidth > this.width ? this.minWidth : this.width
      }
    },
    computed: {
      autoWidth() {
        return this.minWidth > this.width ? this.minWidth : this.width
      }
    },
    methods: {
      paneSize(size) {
        this.leftWidth = size
      }
    }
  }
</script>
<style type="scss">
  .pane-rs .Resizer {
    z-index: 500;
  }
</style>
