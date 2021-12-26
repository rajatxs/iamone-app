<template>
   <div :class="loaderClasses" :style="loaderStyles">
      <div class="app-loader-dot"></div>
      <div class="app-loader-dot"></div>
      <div class="app-loader-dot"></div>
      <div class="app-loader-dot"></div>
      <div class="app-loader-dot"></div>
      <div class="app-loader-dot"></div>
   </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
   name: "AppLoader",
   props: {
      color: {
         type: String,
         default: "foreground",
      },
      size: {
         type: String,
         default: '18px'
      }
   },
   computed: {
      loaderStyles() {
         return {
            width: this.size,
            height: this.size
         }
      },
      loaderClasses() {
         const list = ["app-loader"];

         list.push("use-" + this.color);

         return list;
      },
   },
});
</script>
