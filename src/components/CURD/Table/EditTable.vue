<template>
  <div>
    <!-- 子表内容 -->
    <!-- 批量操作 -->
    <el-button
      v-if="!fillingStatus"
      :size="size"
      style="margin:0px 10px 10px 0"
      type="primary"
      icon="el-icon-circle-plus-outline"
      @click="handleAdd()"
    >{{ $t('common.newAddRow') }}</el-button>
    <el-button
      v-if="toggleRowSelectionArray.length > 0 && !batchEditStatus && !fillingStatus"
      :size="size"
      style="margin:0px 10px 10px 0"
      type="primary"
      icon="el-icon-edit"
      @click="handleBatchEdit()"
    >
      {{ $t('common.batchEdit') }}
    </el-button>
    <el-button
      v-if="batchEditStatus && !fillingStatus"
      :size="size"
      style="margin:0px 10px 10px 0"
      type="danger"
      icon="el-icon-delete"
      @click="handleBatchEdit(false)"
    >
      {{ $t('common.cancelEdit') }}
    </el-button>
    <el-button
      v-if="fillingStatus"
      :size="size"
      style="margin:0px 10px 10px 0"
      type="danger"
      icon="el-icon-right"
      @click="saveHandleFilling()"
    >
      {{ $t('common.saveFill') }}
    </el-button>

    <el-button
      v-if="fillingStatus"
      :size="size"
      style="margin:0px 10px 10px 0"
      type="danger"
      icon="el-icon-back"
      @click="calcelFilling()"
    >
      {{ $t('common.cancelFill') }}
    </el-button>
    <el-button
      v-if="!batchEditStatus && !fillingStatus"
      :size="size"
      style="margin:0px 10px 10px 0"
      type="primary"
      icon="el-icon-s-open"
      @click="handleFilling()"
    >
      {{ $t('common.batchFill') }}
    </el-button>
    <el-dropdown
      v-if="conf.urlMethods.disableUrl
        && toggleRowSelectionArray.length > 0
        && !fillingStatus"
      :hide-on-click="false"
      trigger="click"
    >
      <el-button>
        {{ $t('common.batchOperation') }}
        <i class="el-icon-arrow-down el-icon--right" />
      </el-button>
      <!-- 下拉框 -->
      <el-dropdown-menu slot="dropdown">
        <!-- 删除 -->
        <el-dropdown-item icon="el-icon-circle-plus-outline">
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            icon="el-icon-info"
            icon-color="red"
            title="此操作将永久删除该记录, 是否继续?"
            @onConfirm="confirmDel(toggleRowSelectionArray)"
            @onCancel="onCancel"
          >
            <el-button slot="reference" type="text" style="color:red">删除</el-button>
          </el-popconfirm>
        </el-dropdown-item>
        <!-- 其他批量操作拓展 -->
        <slot name="dropdownList" :toggleRowSelectionArray="toggleRowSelectionArray" />
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 主表内容 -->
    <el-table
      ref="editMainTable"
      :size="size"
      :data="tableData"
      border
      :row-key="rowKey"
      v-bind="$attrs"
      :cell-class-name="checkboxClassName"
      :max-height="maxheight"
      :class="fillingStatus ? 'fillingStatus' : ''"
      v-on="$listeners"
      @selection-change="selectionChange"
    >
      <slot />
      <operate-table-column>
        <template slot-scope="scope">
          <!-- 主表基本操作  可拓展 -->
          <!-- 填充行 -->
          <span v-if="fillingStatus && scope.$index === 0" style="color: red">
            {{ $t('common.fillRow') }}
          </span>
          <!-- 基本操作  -->
          <slot v-else name="operation" :row="scope.row">
            <!-- 删除 -->
            <el-button
              :size="size"
              style="color:red"
              type="text"
              @click="handleDelete(scope.$index, scope.row)"
            >{{ $t('common.delete') }}</el-button>
            <!--新增行按钮 -->
            <el-button :size="size" type="text" @click="handleSpliceAdd(scope.row)">{{ $t('common.newAddRow') }}
            </el-button>
          </slot>
        </template>
      </operate-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CurdMixin from '@/components/CURD/curd.mixin'
import { deepClone } from '@/utils'
import DialogBtnPage from '@/components/CURD/Btns/DialogBtnPage'// 按钮弹窗

export default {
  name: 'EditTable',
  components: {
    DialogBtnPage
  },
  mixins: [CurdMixin],
  props: {
    tableData: {
      type: Array,
      default: []
    },
    rowKey: {
      type: String
    },
    maxheight: {
      default: 300,
      type: Number
    },
    conf: {
      type: Object
    },
    rowData: {
      type: Object,
      default: {}
    },
    /**
     * 防呆设计，防止误删子表有主键的
     */
    foolProoing: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      toggleRowSelectionArray: [],
      // 填充内容
      fillingRow: null,
      // 初始填充行内容
      initFillingRow: null,
      // 填充状态
      fillingStatus: false,
      batchEditStatus: false,
      uploadExlStatus: false,
      /**
       * 批量填充前快照的数据
       */
      lastStoreData: null
    }
  },
  mounted() {
    this.tableData.forEach((item) => {
      this.$set(item, 'editable', false)
    })
  },
  computed: {
    ...mapGetters([
      'size'
    ]),
    valTableData() {
      return (vals) => {
        const sectionIds = vals ? vals.map(s => s[this.rowKey]) : []
        return this.tableData.filter(s => sectionIds.indexOf(s[this.rowKey]) >= 0)
      }
    }
  },
  watch: {
    fillingRow: {
      handler(val) {
        if (this.fillingStatus && this.initFillingRow) {
          for (const key in val) {
            if ((val[key] !== this.initFillingRow[key])) {
              this.toggleRowSelectionArray.forEach(s => {
                console.log(s, val, val[key], 123123)
                this.$set(s, key, val[key])
              })
            }
          }
        }
      },
      deep: true
    }
  },
  methods: {
    /**
     * 批量编辑
     */
    handleBatchEdit(editable = true) {
      this.toggleRowSelectionArray.forEach(s => {
        s.editable = editable
      })
      this.batchEditStatus = editable
    },
    /**
     * 原生样式回调  根据条件
     */
    checkboxClassName({ row, column, rowIndex, columnIndex }) {
      if (row.filltable) {
        return 'tb_cell'
      } else {
        return
      }
    },

    /**
     * 批量填充
     */
    handleFilling() {
      const clearRow = { editable: true, filltable: true }
      for (const key in this.rowData) {
        clearRow[key] = this.rowData[key]
      }
      this.fillingRow = clearRow
      this.initFillingRow = Object.assign({}, clearRow)
      // 快照数据
      this.lastStoreData = deepClone(this.tableData)
      this.tableData.splice(0, 0, this.fillingRow)
      this.fillingStatus = true
    },
    /**
     * 取消填充
     */
    calcelFilling() {
      this.tableData.splice(0, 1)
      this.tableData.forEach((data, index) => {
        Object.assign(data, this.lastStoreData[index])
      })
      this.fillingStatus = false
      this.lastStoreData = undefined
    },
    /**
     * 保存批量填充
     */
    saveHandleFilling() {
      this.tableData.splice(0, 1)
      this.fillingStatus = false
      this.$emit('saveFilling')
    },
    /**
     * 选中操作
     */
    toggleRowSelection(vals, flag) {
      if (this.$refs.editMainTable && vals) {
        // 清空选中
        this.$refs.editMainTable.clearSelection()
        const valData = this.valTableData(vals)
        for (const ind in valData) {
          // 在选中
          this.$refs.editMainTable.toggleRowSelection(valData[ind], flag || true)
        }
      }
    },
    /**
    * 选中后处理的事件
    * @param section
    */
    selectionChange(section) {
      this.toggleRowSelectionArray = section
    },
    // 添加
    handleAdd() {
      const row = Object.assign({ editable: true }, this.rowData)
      this.tableData.unshift(row)
      this.$emit('handleAddBtn', this.tableData)
    },
    // 添加
    handleSpliceAdd(indexRow) {
      const row = Object.assign({ editable: true }, this.rowData)
      this.tableData.splice(this.tableData.indexOf(indexRow) + 1, 0, row)
      this.$emit('handleAddBtn', this.tableData)
    },
    // 修改
    // valChange(row, index, qx) {
    //   console.log(row, index, qx, 'row, index, qx')
    //   for (const i of this.tableData) {
    //     if (i.editable && i.id != row.id) {
    //       return false
    //     }
    //   }
    //   if (!qx) {
    //     if (!this.tableData) {
    //       this.tableData.splice(index, 1)
    //     }
    //     return (row.editable = !row.editable)
    //   }
    //   if (row.editable) {
    //     const v = this.rowData
    //     if (v.code == '' || v.name == '') {
    //       this.$message({
    //         message: '请填写必填项',
    //         type: 'warning'
    //       })
    //     } else {
    //       row.editable = false
    //       this.$forceUpdate()
    //     }
    //   } else {
    //     row.editable = true
    //     this.$forceUpdate()
    //   }
    // },
    // 删除
    handleDelete(index, row) {
      if (this.foolProoing && row[this.rowKey]) {
        // 有防呆设计，且有主键，要进行防呆删除
        this.$confirm(this.$t('common.ensureToDelete'), this.$t('common.note'), {
          confirmButtonText: this.$t('common.ensure'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(() => {
          this.$message({
            message: this.$t('common.deleteSuccess'),
            type: 'success'
          })
          this.tableData.splice(index, 1)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$('common.alreadyCancel')
          })
        })
      } else {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.tableData.splice(index, 1)
      }
    },
    // 批量系列
    // 批量删除事件
    confirmDel(value) {
      if (value == null || value.length <= 0) {
        this.$message.warning('请选择至少一条记录')
        return
      } else {
        const deepVal = deepClone(value)
        deepVal.forEach((val, index) => {
          // 遍历源数据
          this.tableData.forEach((v, i) => {
            if (val.GoodsCode === v.GoodsCode) {
              this.tableData.splice(i, 1)
            }
          })
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }
    },
    // 删除取消事件
    onCancel() {
      this.$message({
        type: 'info',
        message: '已取消删除'
      })
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .tb_cell .el-checkbox__input {
  display: none;
}

.sonTableBtn {
  display: flex;
  justify-content: flex-end;
}

.el-table /deep/ .el-table__row td:not(.is-hidden):last-child {
  border-left: 1px solid #EBEEF5;
}

/deep/ .el-dropdown-menu__item {
  display: flex;
  align-items: center;
}

.el-table /deep/ thead th:not(.is-hidden):last-child {
  border-left: 1px solid #e4e7ec;
}

.el-table /deep/ thead tr th {
  &:first-child {
    .cell {
      padding-right: 14px;
    }
  }
}

.fillingStatus /deep/ .el-table__body .el-table__row:nth-child(1) {
  background-color: #F5F7FA;
}

.fillingStatus /deep/ .el-table__body .el-table__row:nth-child(1):hover {
  background-color: #F5F7FA;
}

.el-table /deep/ th>.cell {
  text-align: center;
}

.el-table /deep/ td div div {
  white-space: nowrap;
  // overflow: hidden;
  text-overflow: ellipsis;
}

.dialog-btn {
  display: inline-block;
  margin-right: 10px;
}

.el-table /deep/ .el-table__row .el-form-item {
  margin-bottom: 13px;
}

.el-table /deep/ td {
  &:last-child {
    div {
      div {
        white-space: normal;
        overflow: visible;
        text-overflow: normal;
      }
    }
  }
}
</style>

