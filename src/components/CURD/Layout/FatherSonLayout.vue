<template>
  <div v-resize="handleResize" class="fathersontable">
    <!-- 不是左右分的子表展示方式 -->
    <div v-if="effect !== 'pannel'">
      <div ref="searchdom" class="searchlist">
        <slot name="search" />
      </div>
      <!-- 列表-->
      <table-column-preference-setting-api-slot v-model="showFields" :init-data="tableFields"
        :preference-alias="conf.namespace">
        <template v-slot="{ doSave, preferenceData, headerDragend }">
          <div class="btnslist" ref="btnslist">
            <slot name="btnslist" />
            <curd-table-column-select v-if="showFields" v-model="showFields" :preference-alias="conf.namespace"
              :table-fields="preferenceData" style="float: right;margin-left: 10px;" @selectedChange="reRenderTable"
              @doSave="doSave" />
          </div>

          <el-card v-loading="reRending">
            <slot v-if="showFields && showFields.length > 0" :showFields="showFields" :headerDragend="headerDragend"
              :heightTable="heightTable" :openChild="openChild" />
            <span v-else>
              {{ $t('common.selectShowFields') }}
            </span>
          </el-card>
        </template>
      </table-column-preference-setting-api-slot>
      <span ref="paginationHeight">
        <slot name="pagination" />
      </span>
      <!-- 定义子表的显示方式 -->
      <el-dialog v-if="effect=='dialog'" v-bind="{width: '75%',
      top: '5vh',
      title: $t('common.detail'),
      ...$attrs._effect}" :visible.sync="isshowdetail">
        <slot name="children" :row="row" :closeDetailDialog="closeDetailDialog" />
        <div class="dialog-footer">
          <el-button @click="closeDetailDialog">{{ $t('common.cancel') }}</el-button>
        </div>
      </el-dialog>
      <el-drawer v-if="effect=='drawer'" v-bind="{size: '60%',
      direction: 'rtl',
      title: $t('common.detail'),
      ...$attrs._effect}" :visible.sync="isshowdetail">
        <slot name="children" :row="row" :closeDetailDialog="closeDetailDialog" />
      </el-drawer>
      <slot v-if="effect=='bottom'" name="children" :row="row" />
    </div>
    <!-- 左右面板的展示方式-->
    <div v-else>
      <hf-resize-split-pane v-bind="$attrs._effect">
        <div style="padding:15px 10px 0 10px">
          <div ref="searchdom">
            <slot name="search" />
          </div>
          <!-- 列表-->
          <table-column-preference-setting-api-slot v-model="showFields" :init-data="tableFields"
            :preference-alias="conf.namespace">
            <template v-slot="{ doSave, preferenceData, headerDragend }">
              <div class="btnslist" ref="btnslist">
                <slot name="btnslist" />
                <curd-table-column-select v-if="showFields" v-model="showFields" :preference-alias="conf.namespace"
                  :table-fields="preferenceData" style="float: right;margin-left: 10px;" @selectedChange="reRenderTable"
                  @doSave="doSave" />
              </div>
              <el-card v-loading="reRending">
                <slot v-if="showFields && showFields.length > 0" :showFields="showFields" :headerDragend="headerDragend"
                  :heightTable="heightTable" :openChild="openChild" />
                <span v-else>
                  {{ $t('common.selectShowFields') }}
                </span>
              </el-card>
            </template>
          </table-column-preference-setting-api-slot>
          <div></div>
          <span ref="paginationHeight">
            <slot name="pagination" />
          </span>
        </div>
        <template #right>
          <div style="padding:15px 10px 0 10px">
            <slot name="children" :row="row" />
          </div>
        </template>
      </hf-resize-split-pane>
    </div>
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
    },
    // 弹窗为dialog   底部为bottom  左右分pannel 抽屉方式drawer
    // 默认为none
    effect: {
      type: String,
      default: () => {
        return 'dialog'
      }
    }
  },
  data() {
    return {
      showFields: undefined,
      heightTable: 900,
      reRending: false,
      row: undefined,
      isshowdetail: false,
    }
  },
  methods: {
    // 表格宽高
    handleResize({ width, height }) {
      this.$nextTick(() => {
        const searchDomHeight = window.getComputedStyle(this.$refs.searchdom).height;
        const btnslistHeight = this.$refs.btnslist ? this.$refs.btnslist.getBoundingClientRect().height : 0
        const paginationHeight = this.$refs.pagination ? this.$refs.pagination.getBoundingClientRect().height : 0
        //  130 是固定值边距
        this.heightTable = parseFloat(height) - parseFloat(searchDomHeight) - btnslistHeight - paginationHeight - 130
      })
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
    },
    openChild(row, column, event) {
      this.row = row
      this.isshowdetail = true
    },
    // 关闭弹窗
    closeDetailDialog() {
      this.isshowdetail = false
    }
  }
}
</script>


<style scoped lang="less">
/* 表内部分样式 */
.fathersontable {
  margin: 0px 10px 10px 10px;
  height: 100%;
  padding: 0 0 30px 0;
  box-sizing: border-box;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
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
  margin-bottom: 10px;
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


.dialog-footer {
  float: right;
  margin: 10px 10px 10px 0;
}

.searchlist {
  margin-top: 20px
}
</style>

