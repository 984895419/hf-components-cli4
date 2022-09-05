<template>
  <date-time-format-table-column
    prop="createTime"
    :label="$t(label)"
    :width="width"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
    import DateTimeFormatTableColumn from './base/DateTimeFormatTableColumn'
    export default {
        name: 'CreateTimeTableColumn',
        components: { DateTimeFormatTableColumn },
        props: {
            label: {
                type: String,
                default: 'common.createTime'
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
