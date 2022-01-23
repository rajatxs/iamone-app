<template>
   <button
      :type="role"
      :class="buttonClasses"
      :aria-expanded="expanded"
      :disabled="disabled"
      @click="$emit('click')"
   >
      <app-loader v-if="loading" :color="loaderColor" />
      <slot v-else></slot>
   </button>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
   name: "AppButton",
   props: {
      role: {
         type: String,
         default: "button",
      },
      type: {
         type: String,
         default: "filled",
      },
      loading: {
         type: Boolean,
         default: false,
      },
      expanded: {
         type: Boolean,
         default: false,
      },
      gradient: {
         type: String,
         required: false,
      },
      color: {
         type: String,
         default: "foreground",
      },
      loaderColor: {
         type: String,
         default: 'light'
      },
      nogap: {
         type: Boolean,
         default: false
      },
      text: {
         type: String,
         required: false,
      },
      disabled: {
         type: Boolean,
         default: false,
      },
      size: {
         type: String,
         default: "medium",
      },
   },
   computed: {
      buttonClasses() {
         const list = [
            "app-button",
            "inline-xstack",
            "justify-center",
            "align-center",
            "margin-x-small",
            "margin-y-small",
            "pad-x-large",
            "radius-default",
         ];

         list.push("type__" + this.type);
         list.push("size__" + this.size);

         if (this.gradient) {
            list.push("bg-gradient-" + this.gradient);
         }

         if (this.color) {
            list.push("bg-" + this.color);
         }

         if (this.text) {
            list.push("text-" + this.text);
         }

         if (this.nogap) {
            list.push('nomargin');
         }

         return list;
      },
   },
});
</script>
