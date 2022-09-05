<template>
  <div>
    <el-pagination
      :current-page="currentPage"
      :page-sizes="resPageSize"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      v-on="$listeners"
    />
  </div>
</template>

<script>
    export default {
        name: 'CurdPagination',
        props: {
            total: Number,
            currentPage: Number,
            pageSize: Number,
            pageSizes: Array
        },
        data() {
            return {
                defaultPageSize: [100, 200, 300, 400]
            }
        },
        computed: {
          resPageSize () {
              if (this.pageSizes) {
                  return this.pageSizes
              }
              if (this.$store.getters.pageSizes && this.$store.getters.pageSizes.length > 0) {
                  return this.$store.getters.pageSizes
              }
              return this.defaultPageSize
          }
        }
    }
</script>

<style scoped>

</style>
