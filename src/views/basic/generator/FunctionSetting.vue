<template>
  <div>
    <hf-table
      v-loading="loading"
      :table-data="value.functionList"
      rowKey="columnName"
    >
      <el-table-column
        prop="functionName"
        :label="$t(conf.namespace + '.functionName')"
        min-width="130"
      />
      <el-table-column
        prop="support"
        :label="$t(conf.namespace + '.support')"
        min-width="130"
      >
        <template slot-scope="scopeRow">
          <el-checkbox v-model="scopeRow.row.support"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        prop="permission"
        :label="$t(conf.namespace + '.permission')"
        min-width="130"
      >
        <template slot-scope="scopeRow">
          <el-checkbox v-model="scopeRow.row.permission"></el-checkbox>
        </template>
      </el-table-column>
    </hf-table>
  </div>
</template>

<script>
import * as conf from './api'
import HfTable from '../../../components/CURD/Table/HfTable'
/**
 * 功能列表
 */
export default {
    name: 'FunctionSetting',
    components: {HfTable},
    props: {
        value: {
            type: Object
        }
    },
    data() {
        return {
            conf: conf,
            loading: false,
            functionList: [
                {
                    functionKey: 'search',
                    functionName: '查询',
                    support: true,
                    permission: false
                },
                {
                    functionKey: 'add',
                    functionName: '新增',
                    support: true,
                    permission: true
                },
                {
                    functionKey: 'update',
                    functionName: '修改',
                    support: true,
                    permission: true
                },
                {
                    functionKey: 'delete',
                    functionName: '删除',
                    support: true,
                    permission: true
                },
                {
                    functionKey: 'export',
                    functionName: '导出',
                    support: true,
                    permission: true
                },
                {
                    functionKey: 'import',
                    functionName: '导入',
                    support: true,
                    permission: true
                }
            ]
        }
    },
    created() {
        this.value.functionList = this.value.functionList || this.functionList
    }
}
</script>

<style scoped>

</style>
