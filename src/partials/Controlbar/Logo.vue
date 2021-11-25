<template>
   <div class="app-logo" aria-label="logo">
      <img 
         class="app-logo-image"
         src="/icons/im1.svg"
         :width="size"
         :height="size"
         alt="iamone" />
   </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{ size?: number }>()
</script>

<style lang="scss" scoped>
.app-logo {
   padding-left: var(--gap);
   padding-right: var(--gap);
}
</style>
