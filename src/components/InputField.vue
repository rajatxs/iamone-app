<template>
   <div :class="inputFieldClasses">
      <slot></slot>
   </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
   name: 'AppInputField',
   props: {
      justify: {
         type: String,
         default: 'center'
      },
      vgap: {
         type: String,
         default: 'medium'
      }
   },
   computed: {
      inputFieldClasses() {
         const list = ['app-input-field']

         list.push('justify__' + this.justify)
         list.push('vgap__' + this.vgap)

         return list
      }
   }
})
</script>

<style scoped lang="scss">
.app-input-field {
   display: flex;
   margin-top: var(--gap-half);
   margin-bottom: var(--gap-half);
   padding-left: var(--gap);
   padding-right: var(--gap);

   &.vgap__small {
      margin-top: var(--gap-quarter);
      margin-bottom: var(--gap-quarter);
   }
   &.vgap__medium {
      margin-top: var(--gap-half);
      margin-bottom: var(--gap-half);
   }
   &.vgap__large {
      margin-top: var(--gap);
      margin-bottom: var(--gap);
   }

   &.justify_left {
      justify-content: flex-start;
   }
   &.justify__center {
      justify-content: center;
   }
   &.justify__right {
      justify-content: flex-end;
   }

   .app-button {
      margin: 0;
   }
}
</style>
