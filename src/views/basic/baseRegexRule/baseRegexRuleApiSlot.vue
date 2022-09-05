<template>
    <div>
        <api-slot
                v-if="ruleIds"
                :get-url="templateUrl(conf.urlMethods.batchQueryUrl, {ruleId: ruleIds})"
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
    name: 'BaseRegexRuleRuleIdSlot',
    components: { ApiSlot },
    props: {
        ruleIds: {
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
