<template>
   <div :class="logoClasses" :style="logoStyle">
      <img src="/icons/iamone.svg" class="app-logo-image" />
   </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
   name: "AppLogo",
   props: {
      align: {
         type: String,
         default: "center",
      },
      size: {
         type: String,
         default: "22pt",
      },
   },
   computed: {
      logoClasses() {
         const list = ["app-logo", "xstack", "align-center", "margin-y-medium"];

         list.push("justify-" + this.align);

         return list;
      },
      logoStyle() {
         return { height: this.size };
      },
   },
});
</script>

<style scoped>
.app-logo {
   width: auto;
}
.app-logo .app-logo-image {
   width: auto;
   height: 100%;
}
</style>
