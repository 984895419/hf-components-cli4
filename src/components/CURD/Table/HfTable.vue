<template>
  <div>
    <el-table
      ref="mainTable"
      :size="size"
      :data="tableData"
      border
      :row-key="rowKey"
      v-bind="$attrs"
      max-height="600px"
      v-on="$listeners"
    >
      <slot />
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'HfTable',
    props: {
        tableData: Array,
        rowKey: {
            type: String
        }
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
    methods: {
        toggleRowSelection(vals, flag) {
            if (this.$refs.mainTable && vals) {
                // 清空选中
                this.$refs.mainTable.clearSelection()
                const valData = this.valTableData(vals)
                for (const ind in valData) {
                    // 在选中
                    this.$refs.mainTable.toggleRowSelection(valData[ind], flag || true)
                }
            }
        }
    }
}
</script>

<style scoped>

</style>
