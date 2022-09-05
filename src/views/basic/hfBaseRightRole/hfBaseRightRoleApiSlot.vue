<template>
  <div>
    <api-slot
      v-if="roleIds"
      :get-url="templateUrl(conf.urlMethods.batchQueryUrl, {roleId: roleIds})"
      :query-change-trigger="true"
    >
      <template v-slot="{data}">
        <slot :data="data" />
      </template>
    </api-slot>
    <slot v-else :data="[]" />
  </div>
</template>

<script>
import ApiSlot from '@/components/CURD/Api/ApiSlot'
import * as conf from './api'
import CurdMixin from '@/components/CURD/curd.mixin'

/**
 * 根据主键查询信息
 */
export default {
    name: 'HfBaseRightRoleRoleIdSlot',
    components: { ApiSlot },
    mixins: [CurdMixin],
    props: {
        roleIds: {
            type: [Array, String]
        }
    },
    data() {
        return {
            conf: conf
        }
    }
}
</script>

<style scoped>

</style>
