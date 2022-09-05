<template>
  <component :is="tpName + '-table-column'" v-bind="$attrs" v-on="$listeners" />
</template>
<script>
  import CreateTimeTableColumn from './column/CreateTimeTableColumn'
  import CreatorTableColumn from './column/CreatorTableColumn'
  import DefaultTableColumn from './column/DefaultTableColumn'
  import EnableStateTableColumn from './column/EnableStateTableColumn'
  import ImageTableColumn from './column/ImageTableColumn'
  import ModifierTableColumn from './column/ModifierTableColumn'
  import ModifyTimeTableColumn from './column/ModifyTimeTableColumn'
  import DateTimeFormatTableColumn from './column/base/DateTimeFormatTableColumn'
  import SectionTableColumn from './column/base/SectionTableColumn'
  import TagTableColumn from './column/base/TagTableColumn'
  export default {
    components: {
      CreateTimeTableColumn,
      CreatorTableColumn,
      DefaultTableColumn,
      EnableStateTableColumn,
      ImageTableColumn,
      ModifierTableColumn,
      ModifyTimeTableColumn,
      DateTimeFormatTableColumn,
      SectionTableColumn,
      TagTableColumn
    },
    props: {
      tpName: {
        type: String,
        required: true
      }
    }
  }
</script>
