<template>
  <el-dialog
    v-bind="{ 'close-on-click-modal': false,
              top: '5vh',
              width: '75%',
              'append-to-body': true,
              ...$attrs}"
    v-on="$listeners"
  >
    <slot />
  </el-dialog>
</template>
