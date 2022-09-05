<template>
    <div>
        <api-slot
                v-if="ids"
                :get-url="templateUrl(conf.urlMethods.batchQueryUrl, {id: ids})"
                :query-change-trigger="true">
            <template v-slot="{data}">
                <slot :data="data"/>
            </template>
        </api-slot>
        <slot v-else :data="[]"/>
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
    name: 'HfBaseRightRoleUserIdSlot',
    components: { ApiSlot },
    props: {
        ids: {
            type: [Array, String]
        }
    },
    mixins: [CurdMixin],
    data() {
        return {
            conf: conf
        }
    }
}
</script>

<style scoped>

</style>
