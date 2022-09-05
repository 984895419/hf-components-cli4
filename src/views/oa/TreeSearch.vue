<template>
  <div class="content-lf">
    <el-input v-model="filterText" placeholder="输入关键字进行过滤" clearable @input="filterInput" />
    <el-tree
      ref="treesearch"
      class="filter-tree"
      :data="data"
      :props="defaultProps"
      default-expand-all
      :filter-node-method="filterNode"
      @node-click="handleNodeClick"
    >
      <span slot-scope="{ node, data }" class="custom-tree-node">
        <el-tooltip class="item" effect="dark" :content="node.label" placement="top-start">
          <span> {{ node.label }} </span>
        </el-tooltip>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  name: 'TreeSearch',
  props: {
    data: {
      type: Array
    }
  },
  data() {
    return {
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    filterInput() {
      this.$refs.treesearch.filter(this.filterText)
    },
    handleNodeClick(val) {
      console.log(val, 'val')
      this.$emit('treeNodeval', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.content-lf {
  padding: 20px 0 0 0;
  box-sizing: border-box;

}
/deep/ .filter-tree{
 overflow-y: scroll;
  height: calc(100vh - 180px);

 &::-webkit-scrollbar{
  display: none;
 }
}

</style>

