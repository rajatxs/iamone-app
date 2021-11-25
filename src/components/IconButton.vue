<template>
   <button :class="iconButtonClasses">
      <component :is="svgIcon"></component>
   </button>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue' 

export default defineComponent({
   name: 'AppIconButton',

   props: {
      name: {
         type: String,
         required: true
      }
   },

   computed: {
      svgIcon() {
         return defineAsyncComponent(() => import(`./Icons/${this.name}.vue`))
      },
      iconButtonClasses() {
         return ['app-icon-button']
      }
   }
})
</script>

<style scoped lang="scss">
.app-icon-button {
   display: inline-flex;
   align-items: center;
   justify-content: center;
   padding: 0;
   border: none;
   width: 20pt;
   height: 20pt;
   cursor: pointer;
   border-radius: 25px;
   background-color: var(--accents-1);
   transition: background-color 120ms linear;

   .app-icon {
      width: 15px;
      height: 15px;
   }

   &:hover {
      background-color: var(--accents-2);
   }

   &:active {
      background-color: var(--foreground);
      color: var(--background);
   }
}
</style>
