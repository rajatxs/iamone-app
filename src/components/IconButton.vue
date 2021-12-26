<template>
   <button class="app-icon-button pad-0 inline-xstack justify-center align-center noborder rounded cursor-pointer" @click="$emit('click')">
      <component :is="svgIcon"></component>
   </button>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
   name: "AppIconButton",
   props: {
      name: {
         type: String,
         required: true,
      },
   },
   data() {
      return {
         svgIcon: null,
      };
   },
   async mounted() {
      this.svgIcon = (
         await import(`../assets/vue-icons/${this.name}.vue`)
      ).default;
   },
});
</script>

<style scoped>
.app-icon-button {
   width: 22pt;
   height: 22pt;
   background-color: var(--accents-1);
   transition: background-color 120ms linear;
}
.app-icon-button .app-icon {
   width: 18px;
   height: 18px;
}
.app-icon-button:hover {
   background-color: var(--accents-2);
}
.app-icon-button:active {
   background-color: var(--foreground);
   color: var(--background);
}
</style>
