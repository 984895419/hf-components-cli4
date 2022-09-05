<template>
    <div>
      <base-job-type-job-type-id-slot :job-type-ids="[jobTypeId]">
        <template v-slot="scopeRow">
          <div v-if="scopeRow.data && scopeRow.data.length > 0">
            <component v-model="res" v-if="scopeRow.data[0].jobComponentPath && !scopeRow.data[0].jobComponentPath.startsWith('http')" :is="scopeRow.data[0].jobComponentPath"></component>
          </div>
        </template>
      </base-job-type-job-type-id-slot>
    </div>
</template>

<script>
import BaseJobTypeJobTypeIdSlot from './baseJobTypeApiSlot'
/**
 * job类型渲染:
 *
 * https://blog.csdn.net/sxm666666/article/details/106761473
 */
export default {
    name: 'JobTypeRender',
    components: { BaseJobTypeJobTypeIdSlot },
    props: {
        value: {
            type: Object
        },
        jobTypeId: {
            type: Number
        },
        field: {
            type: String
        }
    },
    data() {
        return {
            res: null
        }
    },
    watch: {
        res() {
          this.$set(this.value, this.field, this.res)
        }
    }
}
</script>

<style scoped>

</style>
