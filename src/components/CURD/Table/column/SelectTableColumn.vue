<template>
  <el-table-column :prop="prop" :label="$t(namespace + '.' + prop)" v-bind="$attrs" :align="align">
    <template slot-scope="scopeRow">
      <slot :row="scopeRow.row">
        <hf-select
          v-if="scopeRow.row.editable"
          :namespace="namespace"
          v-bind="$attrs"
          :value="scopeRow.row"
          :prop="prop"
          :list="list"
          :label-prop="labelProp"
          :value-prop="valueProp"
          v-on="$listeners"
        />
        <span v-else>
          {{ labelShow(scopeRow.row) }}
        </span>
      </slot>
    </template>
  </el-table-column>
</template>
<script>

  import HfSelect from '../../Single/hfSelect'
  export default {
    components: { HfSelect },
    props: {
      namespace: {
        type: String
      },
      align: {
        type: String
      },
      prop: {
        type: String
      },
      list: {
        type: Array
      },
      labelProp: {
        type: String,
        default: 'label'
      },
      /**
       *
       */
      valueProp: {
        type: String,
        default: 'value'
      }
    },
    computed: {
      labelShow() {
        return (row) => {
          if (row[this.prop]) {
            for (const ind in this.list) {
              if (this.list[ind][this.valueProp] + '' === row[this.prop] + '') {
                return this.list[ind][this.labelProp]
              }
            }
          }
          return '-'
        }
      }
    }
  }
</script>
