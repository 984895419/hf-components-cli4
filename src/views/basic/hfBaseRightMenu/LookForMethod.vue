<template>
    <common-dialog-btn type="text" label="查看方法">
      <base-handler-mapping-method-index-vue :controller-id="controllerId">
      </base-handler-mapping-method-index-vue>
    </common-dialog-btn>
</template>

<script>
    import CommonDialogBtn from '../../../components/CURD/Btns/CommonDialogBtn'
    import BaseHandlerMappingMethodIndexVue from '../baseHandlerMappingMethod/index'
    export default {
        name: 'LookForMethod',
        components: { BaseHandlerMappingMethodIndexVue, CommonDialogBtn },
        props: {
            controllerId: Number
        }
    }
</script>

<style scoped>

</style>
