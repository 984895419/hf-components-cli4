<template>
  <div>
    <el-table-column
      :prop="prop"
      :label="$t(namespace + '.' + prop)"
      v-bind="$attrs"
    >
      <template slot-scope="scope">
        <copier-render :copyable="copyable" :prop="prop" :row="scope.row" :max-words="maxWords"/>
      </template>
    </el-table-column>
  </div>
</template>

<script>
import CopierRender from './other/CopierRender'
export default {
    name: 'DefaultTableColumn',
    components: {CopierRender},
    props: {
        copyable: {
            type: Boolean,
            default: false
        },
        namespace: {
            type: String
        },
        prop: {
            type: String
        },
        maxWords: {
            type: Number,
            default: 27
        }
    }
}
</script>

<style scoped>

</style>
