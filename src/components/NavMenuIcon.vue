<template>
   <div class="navmenu-icon xstack justify-center align-center">
      <component :is="iconComponent"></component>
   </div>
</template>

<script lang="ts">
import { defineComponent, markRaw } from 'vue'

export default defineComponent({
   name: 'NavMenuIcon',
   props: {
      icon: {
         type: String,
         required: true
      }
   },
   data() {
      return {
         iconComponent: null
      }
   },
   async created() {
      this.iconComponent = markRaw((await import(`./Icons/${this.icon}.vue`)).default)
   }
})
</script>

<style lang="scss">
.navmenu-icon {
   position: relative;
   padding: 2pt;
   width: 25pt;
   height: 25pt;
   cursor: pointer;
   border-radius: 50%;
   box-sizing: content-box;
   z-index: 500;
   border-width: 1px;
   border-style: solid;
   border-color: transparent;
   background-color: transparent;
   color: var(--accents-5);
   transition: background-color 80ms linear;
   
   &:hover {
      background-color: var(--accents-2);
   }
}
</style>
