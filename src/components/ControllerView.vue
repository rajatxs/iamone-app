<template>
   <div
      :class="controllerViewClasses"
      :aria-label="name"
      :aria-expanded="expanded">
      <slot></slot>
   </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
   name: "AppControllerView",
   props: {
      name: {
         type: String,
         required: false,
      },
      expanded: {
         type: Boolean,
         default: false,
      },
   },
   computed: {
      controllerViewClasses() {
         return [
            "app-controller-view",
            "pad-medium",
            "margin-x-auto",
            "h-inherit",
         ];
      },
   },
});
</script>

<style scoped>
.app-controller-view {
   width: 620px;
}
.app-controller-view[aria-expanded="true"] {
   width: inherit;
}
@media (max-width: 480px) {
   .app-controller-view {
      width: inherit;
   }
}
</style>
