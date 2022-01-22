<template>
   <div class="navmenu-icon xstack justify-center align-center cursor-pointer rounded" @click="$emit('click')">
      <component :is="iconComponent"></component>
   </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
   name: "NavMenuIcon",
   props: {
      icon: {
         type: String,
         required: true,
      },
   },
   data() {
      return {
         iconComponent: null,
      };
   },
   async created() {
      this.iconComponent = (
         await import(`../assets/vue-icons/${this.icon}.vue`)
      ).default;
   },
});
</script>

<style scoped>
.navmenu-icon {
   position: relative;
   padding: 6pt;
   width: 16pt;
   height: 16pt;
   box-sizing: content-box;
   z-index: 500;
   background-color: transparent;
   color: var(--accents-5);
   transition: background-color 80ms linear;
}
.navmenu-icon:hover {
   background-color: var(--accents-2);
}

body.dark .navmenu-icon:hover {
   background-color: var(--accents-1);
}
</style>
