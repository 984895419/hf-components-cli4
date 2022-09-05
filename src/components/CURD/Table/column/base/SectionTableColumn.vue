<template>
  <el-table-column
    v-bind="{ ...{ fixed: 'left',  width: 40} , ...$attrs, ...{type: 'selection'}}"
  />
</template>

<script>
    export default {
        name: 'SectionTableColumn'
    }
</script>

<style scoped>

</style>
