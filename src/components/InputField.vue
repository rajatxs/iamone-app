<template>
   <div :class="inputFieldClasses">
      <slot></slot>
   </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
   name: "AppInputField",
   props: {
      justify: {
         type: String,
         default: "center",
      },
      vgap: {
         type: String,
         default: "medium",
      },
      hgap: {
         type: String,
         default: 'large'
      }
   },
   computed: {
      inputFieldClasses() {
         const list = [
            "app-input-field",
            "xstack",
            "margin-y-medium",
         ];

         list.push("justify-" + this.justify);
         list.push("margin-y-" + this.vgap);
         list.push("pad-x-" + this.hgap);

         return list;
      },
   },
});
</script>

<style scoped>
.app-input-field .app-button {
   margin: 0;
}
</style>
