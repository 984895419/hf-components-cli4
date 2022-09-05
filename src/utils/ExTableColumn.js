import { TableColumn } from 'element-ui'
// import { parseMinWidth } from 'element-ui/packages/table/src/util.js'
import { parseWidth } from 'element-ui/packages/table/src/util.js'
// "ex-table-column": "^1.1.2",
//   "af-table-column": "^1.0.3",
export default {
  name: 'ExTableColumn',
  extends: TableColumn, // 指定继承组件
  props: {
    fitByClass: {
      type: String,
      default: 'cell'
    },
    autoFit: {
      type: Boolean,
      default: false
    },
    fitGap: {
      type: Number,
      default: 0
    },
    fitHeader: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      autoWidth: 0
    }
  },
  computed: {
    /* realMinWidth() {
      if (this.autoFit) {
        return parseMinWidth(this.max([this.minWidth, this.autoWidth]))
      }
      return TableColumn.computed.realMinWidth.call(this)
    }*/
    realWidth() {
      if (this.autoFit) {
        // return parseMinWidth(this.max([this.minWidth, this.autoWidth]))
        return parseWidth(this.autoWidth + 'px')
      }
      return TableColumn.computed.realWidth.call(this)
    }
  },
  methods: {
    updateAutoWidth() {
      if (!this.autoFit) return

      const cellWrapperClass = this.fitHeader ? `.${this.columnId}` : `td.${this.columnId}`

      let cells = window.document.querySelectorAll(`${cellWrapperClass} .${this.fitByClass}`)
      if (this.isEmpty(cells)) {
        cells = window.document.querySelectorAll(`${cellWrapperClass} .cell`)
      }
      if (this.isEmpty(cells)) {
        return
      }
      // const autoMinWidth = this.max(this.map(cells, item => this.isEmpty(item.textContent) ? 0 : item.getBoundingClientRect().width)) + this.fitGap + 1
      const autoMinWidth = this.max(this.map(cells, item => {
        const testCs = item.textContent.split('\n')
        const maxLength = this.max(this.map(testCs, item => this.len(item)))
        const widthT = this.isEmpty(item.textContent) ? 50 : maxLength * 8
        return widthT
      })) + this.fitGap + 1

      if (this.autoWidth !== autoMinWidth) {
        this.autoWidth = autoMinWidth
      }
    },
    max(list) {
      return Math.max.apply(null, list.filter(item => !isNaN(item)))
    },
    map(list, fn) {
      return Array.prototype.map.call(list, fn)
    },
    isEmpty(item) {
      return item.length === 0
    },
    len(str) {
      let realLength = 0
      for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i)
        if (charCode >= 0 && charCode <= 128) {
          realLength += 1
        } else {
          realLength += 2
        }
      }
      return realLength
    }
  },
  updated() {
    this.updateAutoWidth()
  },
  mounted() {
    this.$nextTick(() => {
      this.updateAutoWidth()
    })
  }
}
