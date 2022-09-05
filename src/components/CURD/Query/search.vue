<template>
  <div>
    <el-form
      ref="form"
      :size="size"
      :model="value"
      v-bind="$attrs"
      @submit.native.prevent
    >
      <row-span-slot>
        <template v-slot="{ span }">
          <slot :span="span" />
          <el-col :span="span " style="width:auto">
            <el-form-item>
              <slot name="btns-before" />
              <el-button type="primary" :size="size" native-type="submit" icon="el-icon-search" @click="doSearch">{{ $t('common.search') }}</el-button>
              <el-button icon="el-icon-circle-close" :size="size" @click="doReset">{{ $t('common.reset') }}</el-button>
              <slot name="btns" />
              <el-button
                v-if="$scopedSlots['pageInfo'] && !more"
                :size="size"
                icon="el-icon-arrow-down"
                type="primary"
                @click="more = !more"
              >
                $t('common.show')
              </el-button>
            </el-form-item>
          </el-col>
        </template>
      </row-span-slot>
      <div v-if="more">
        <slot name="more" />
      </div>
    </el-form>
  </div>
</template>

<script>
    import { deepClone } from '@/utils'
    import RowSpanSlot from '@/components/CURD/Slot/RowSpanSlot.vue'
    import { mapGetters } from 'vuex'

    export default {
        name: 'SimpleSearch',
        components: { RowSpanSlot },
        props: {
          value: Object
        },
        data() {
          return {
              initValue: deepClone(this.value),
              more: false
          }
        },
        computed: {
            ...mapGetters([
                'size',
                'tenantId'
            ])
        },
        watch: {
            tenantId() {
                this.doSearch()
            }
        },
        methods: {
            /**
             * 查询
             */
            doSearch() {
                this.$emit('search')
            },
            /**
             * 重置查询条件
             */
            doReset() {
              this.$emit('input', deepClone(this.initValue))
              this.$emit('search')
            }
        }
    }
</script>

<style scoped>

</style>
