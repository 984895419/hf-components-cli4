<template>
  <div v-resize="handleResize" class="stable">
    <div>
      <slot name="search" />
    </div>
    <!-- 列表-->
    <table-column-preference-setting-api-slot
      v-model="showFields"
      :init-data="tableFields"
      :preference-alias="conf.namespace"
    >
      <template v-slot="{ doSave, preferenceData, headerDragend }">
        <div class="btnslist">
          <slot name="btnslist" />
          <curd-table-column-select
            v-if="showFields"
            v-model="showFields"
            :preference-alias="conf.namespace"
            :table-fields="preferenceData"
            style="float: right"
            @selectedChange="reRenderTable"
            @doSave="doSave"
          />
        </div>

        <el-card>
          <slot
            :doSave="doSave"
            :showFields="showFields"
            :headerDragend="headerDragend"
            :heightTable="heightTable"
          />
        </el-card>
      </template>
    </table-column-preference-setting-api-slot>
    <slot name="pagination" />
  </div>
</template>
<script>
  import TableColumnPreferenceSettingApiSlot from '@/views/basic/preferenceSetting/TableColumnPrefenceSettingApiSlot'
  import CurdTableColumnSelect from '@/components/CURD/Table/select/TableColumnSelect'
  export default {
    components: { TableColumnPreferenceSettingApiSlot, CurdTableColumnSelect },
      // 指令:  计算单表的高度 让他自适应高度
    directives: {
      resize: {
        bind(el, binding) {
          let width = ''; let height = ''
          function isReize() {
            const style = document.defaultView.getComputedStyle(el)
            if (width !== style.width || height !== style.height) {
              binding.value({ width: style.width, height: style.height })
            }
            width = style.width
            height = style.height
          }
          el.__vueSetInterval__ = setInterval(isReize, 100)
        },
        unbind(el) {
          clearInterval(el.__vueSetInterval__)
        }
      }
    },
    props: {
      tableFields: {
        type: Array,
        default: () => []
      },
      conf: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        showFields: undefined,
        heightTable: 900
      }
    },
    methods: {
      // 表格宽高
      handleResize({ width, height }) {
        this.heightTable = parseFloat(height) - 210
      },

      reRenderTable(res) {
        // 扩展显示的字段
        this.showFields = []
        // 标记为重新渲染中
        this.reRending = true
        setTimeout(() => {
          this.showFields = res
          // 标记为重新渲染中
          this.reRending = false
        }, 50)
      }
    }
  }
</script>

<style scoped lang="less">
  /* 表内部分样式 */
  .stable {
    margin: 20px 10px 10px 10px;
    height: 100%;
  }

  /deep/ .col-btn-display>div,
  .col-btn-display>.el-button {
    display: inline-block;
    margin-right: 10px;
  }

  .btnslist {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 20px;
  }

  .total {
    display: flex;
    justify-content: center;
    margin: 10px 0;
  }

  .advanced-title {
    border-bottom: 1px solid rgb(25, 137, 250);
    padding: 0 0 10px 0;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .el-dropdown-menu--mini .el-dropdown-menu__item {
    display: flex;
    align-items: center;
  }
  </style>

