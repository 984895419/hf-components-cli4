<template>
  <el-table-column
    v-bind="{...$attrs, formatter: timeFormat}"
    v-on="$listeners"
  />
</template>

<script>
    import { parseTime } from '../../../../../utils'

    export default {
        name: 'DateTimeFormatTableColumn',
        props: {
            /**
             * {y}-{m}-{d} {h}:{i}:{s}
             */
            formatStr: {
                type: String,
                default: '{y}-{m}-{d}'
            }
        },
        computed: {
            timeFormat() {
                return (row, column, cellValue, index) => {
                    return parseTime(cellValue, this.formatStr)
                }
            }
        }
    }
</script>

<style scoped>

</style>
