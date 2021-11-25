<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{ name?: string, expanded?: boolean }>()
</script>

<template>
   <div 
      class="app-view" 
      :aria-label="name"
      :aria-expanded="expanded">
      <slot></slot>
   </div>
</template>

<style scoped lang="scss">
$view-width: 620px;

.app-view {
   margin-left: auto;
   margin-right: auto;
   width: $view-width;
   height: inherit;
   padding: var(--gap-half);
}
.app-view[aria-expanded='true'] {
   width: inherit;
}
</style>
