<template>
  <el-table-column
    prop="creatorUserName"
    :label="$t(label)"
    :width="width"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
    export default {
        name: 'CreatorTableColumn',
        props: {
            label: {
                type: String,
                default: 'common.creator'
            },
            width: {
                type: Number,
                default: 80
            }
        }
    }
</script>

<style scoped>

</style>
