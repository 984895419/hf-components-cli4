<template>
  <div>
      <slot :data="data" />
  </div>
</template>

<script>
import '../../../styles/element-variables.scss'
import { baseApiGetMethod } from '@/components/CURD/baseApi'
import { getData, getMessage, isSuccessResult } from '@/utils/ajaxResultUtil'

export default {
  name: 'ApiSlot',
  props: {
    /**
     * url
     */
    getUrl: String,
    /**
     * 查询条件
     */
    queryData: Object,
    /**
     * 查询条件变化是否马上触发查询
     */
    queryChangeTrigger: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      data: undefined
    }
  },
  watch: {
    queryData: {
      handler: function() {
        if (this.queryChangeTrigger === true) {
          this.doSearch()
        }
      },
      deep: true
    }
  },
  created() {
    this.doSearch()
  },
  methods: {
    doSearch() {
      baseApiGetMethod(this.getUrl, this.queryData).then(resp => {
        if (isSuccessResult(resp)) {
          this.data = getData(resp)
        } else {
          this.$message.error(getMessage(resp))
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
