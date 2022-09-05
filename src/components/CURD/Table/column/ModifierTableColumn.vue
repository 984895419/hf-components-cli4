<template>
  <el-table-column
    prop="modifierUserName"
    :label="$t(label)"
    :width="width"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
    export default {
        name: 'ModifierTableColumn',
        props: {
            label: {
                type: String,
                default: 'common.modifier'
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
