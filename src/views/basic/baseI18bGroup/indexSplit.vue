<template>
  <el-row>
    <el-col :span="12">
      <base-i18b-group-index-vue @row-click="rowClick" :cell-class-name="cellClassName"/>
    </el-col>
    <el-col :span="12">
      <base-i18n-locale-index-vue
        :group-id="selectRow ? selectRow.groupId : undefined"
        :group-name="selectRow ? selectRow.groupName : undefined"/>
    </el-col>
  </el-row>
</template>

<script>
    import BaseI18bGroupIndexVue from './index'
    import BaseI18nLocaleIndexVue from '../baseI18nLocale/index'
    export default {
        name: 'indexSplit',
        components: {BaseI18nLocaleIndexVue, BaseI18bGroupIndexVue},
        data(){
            return {
                selectRow: null
            }
        },
        methods: {
            rowClick(row, column, event) {
              this.selectRow = row
            },
            cellClassName({ row, column, rowIndex, columnIndex }) {
                if (this.selectRow && this.selectRow.groupId === row.groupId) {
                    return 'success-row'
                }
            }
        }
    }
</script>

<style scoped>
  /deep/ .el-table .success-row {
    background: #f0f9eb;
  }
</style>
