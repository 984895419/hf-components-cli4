<template>
  <el-table-column
    :prop="prop"
    :label="$t(namespace + '.' + prop)"
    min-width="180"
  >
    <template slot-scope="scopeRow">
      <el-popover placement="left" effect="light" trigger="click">
        <div>
          <json-views copyable :expand-depth="0" :data="JSON.parse(scopeRow.row[prop])"/>
        </div>
        <span slot="reference">
          <copier-render :copyable="true" :row="scopeRow.row" :prop="prop"/>
        </span>
      </el-popover>
    </template>
  </el-table-column>
</template>

<script>
    import CopierRender from '@/components/CURD/Table/column/other/CopierRender'
    import JsonViews from 'vue-json-views'
    export default {
        name: 'JsonObjectTableColumn',
        components: {CopierRender, JsonViews},
        props: {
            namespace: {
                type: String
            },
            prop: {
                type: String
            }
        }
    }
</script>

<style scoped>

</style>
