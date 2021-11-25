<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{ size?: number }>()
</script>

<template>
   <div class="app-logo" aria-label="logo">
      <img 
         class="app-logo-image"
         src="../assets/logo.svg"
         :width="size"
         :height="size"
         alt="im1" />
   </div>
</template>

<style lang="scss" scoped>
.app-logo {
   padding-left: var(--gap);
   padding-right: var(--gap);
}
</style>
