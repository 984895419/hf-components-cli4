<template>
  <div>
    <el-tooltip
      v-if="existComputedSuffix('Helper')"
      class="item"
      :effect="$attrs.effect || 'dark'"
      :content="computedSuffixContent('Helper')"
      :placement="$attrs.placement || 'right'"
    >
      <slot :placeholder="computedPlaceholder" />
    </el-tooltip>
    <slot v-else :placeholder="computedPlaceholder" />
  </div>
</template>
<script>
  import FormItemMixin from '../Form/formItem.mixin'
  export default {
    mixins: [FormItemMixin]
  }
</script>
