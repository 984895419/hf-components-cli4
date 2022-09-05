<template>
  <el-table-column
    v-bind="$attrs"
    :prop="prop"
    v-on="$listeners"
  >
    <template slot-scope="scope">
      <div v-if="scope.row[prop]">
        <el-tag
          v-for="item in scope.row[prop].split(',')"
          :key="item"
          style="margin-bottom: 5px; margin-right: 5px"
        >
          {{ item }}
        </el-tag>
      </div>
    </template>
  </el-table-column>
</template>

<script>
export default {
    name: 'TagTableColumn',
    props: {
        prop: String
    }
}
</script>

<style scoped>

</style>
