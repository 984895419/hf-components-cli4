<template>
  <date-time-format-table-column
    prop="modifyTime"
    :label="$t(label)"
    :width="width"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
    import DateTimeFormatTableColumn from './base/DateTimeFormatTableColumn'
    export default {
        name: 'ModifyTimeTableColumn',
        components: { DateTimeFormatTableColumn },
        props: {
            label: {
                type: String,
                default: 'common.modifyTime'
            },
            width: {
                type: Number,
                default: 100
            }
        }
    }
</script>

<style scoped>

</style>
