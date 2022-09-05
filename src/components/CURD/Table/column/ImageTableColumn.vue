<template>
  <el-table-column
    :prop="prop"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template slot-scope="scope">
      <el-image
        style="max-width: 80px"
        :src="scope.row[prop]"
        :preview-src-list="[scope.row[prop]]">
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
    </template>
  </el-table-column>
</template>

<script>
    export default {
        name: 'ImageTableColumn',
        props: {
            prop: {
                type: String
            }
        }
    }
</script>

<style scoped>

</style>
