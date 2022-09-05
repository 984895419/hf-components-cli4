<template>
  <div class="app-container">
    <div class="container-main" />
  </div>
</template>

<script>
import { baseApiGetMethod } from '@/components/CURD/baseApi'
export default {
  data() {
    return {
      tableData: [],
      pageData: {
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  created() {
    let param = {}
    const pageInfos = {
        pageInfo: {
          pageNo: this.pageData.pageNum,
          pageSize: this.pageData.pageSize
        }
      }
    param = Object.assign(pageInfos)
    baseApiGetMethod('/api/hfBaseRightRole/nameQuery', param).then(
        (resp) => {
          if (resp.retCode === '00001') {
            this.tableData = resp.data.list
            console.log(resp, 'resp')
          }
        }
      )
  },
  methods: {
    handleClick(row) {
      console.log(row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },

    handleEdit(index, row) {
      console.log(index, row)
    }
  }

}
</script>

<style lang="scss" scoped>
.container-main {}
</style>
