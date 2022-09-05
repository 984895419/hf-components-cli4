<template>
  <div>
    <api-slot
      v-if="menuIds"
      :get-url="templateUrl(conf.urlMethods.batchQueryUrl, {menuId: menuIds})"
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
    name: 'HfBaseRightMenuMenuIdSlot',
    components: { ApiSlot },
    mixins: [CurdMixin],
    props: {
        menuIds: {
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
