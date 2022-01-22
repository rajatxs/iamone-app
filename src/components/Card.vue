<template>
   <div class="app-card w-auto ystack margin-y-large radius-medium shadow-small">
      <!-- Card header -->
      <div
         v-if="title || $slots['controls']"
         class="card-header pad-x-large xstack justify-space-between align-center">
         <div class="card-title margin-0">
            <h4 class="title-text margin-0">{{ title }}</h4>
         </div>

         <div class="card-controls">
            <slot name="controls"></slot>
         </div>
      </div>

      <!-- Card body -->
      <div :class="bodyClasses">
         <slot name="body"></slot>
      </div>

      <!-- Card footer -->
      <div class="card-footer">
         <slot name="footer"></slot>
      </div>
   </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
   name: "AppCard",
   props: {
      title: {
         type: String,
         required: false,
      },
      gap: {
         type: String,
         default: "medium",
      },
   },
   computed: {
      bodyClasses() {
         const list = ["card-body", "pos-rel"];

         list.push("pad-" + this.gap);

         return list;
      },
   },
});
</script>

<style scoped>
.app-card {
   background-color: var(--background);
}
.card-header {
   border-top-left-radius: inherit;
   border-top-right-radius: inherit;
   height: 48px;
   border-bottom: 1px solid var(--accents-2);
}

body.dark .app-card {
   background-color: var(--accents-1);
}
body.dark .card-header {
   border-bottom-color: var(--accents-2);
}
</style>
