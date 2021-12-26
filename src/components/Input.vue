<template>
   <div class="app-input" :aria-multiline="multiline" :aria-expanded="expanded">
      <span v-if="icon" class="app-input-icon">
         <component :is="icon"></component>
      </span>

      <keep-alive>
         <textarea
            v-if="multiline"
            class="app-input-controller"
            aria-invalid="true"
            :rows="minlines"
            :placeholder="hint"
            :spellcheck="spellcheck"
            :required="required"
            :value="value"
            :autocomplete="autocomplete"
            :autofocus="autofocus"
            :autocapitalize="autocapitalize"
            @focus="focus"
            @input="handleInput"
            @change="$emit('change')"
         ></textarea>

         <input
            v-else
            :type="format"
            :placeholder="hint"
            :spellcheck="spellcheck"
            :required="required"
            :value="value"
            :autocomplete="autocomplete"
            :autofocus="autofocus"
            :autocapitalize="autocapitalize"
            @input="handleInput"
            @focus="focus"
            @change="$emit('change')"
            class="app-input-controller"
         />
      </keep-alive>
   </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
   name: "AppInput",
   props: {
      icon: {
         type: [Function, Object],
         required: false,
      },
      format: {
         type: String,
         default: "text",
      },
      value: {
         type: String,
         required: false,
      },
      hint: {
         type: String,
         required: false,
      },
      expanded: {
         type: Boolean,
         default: false,
      },
      multiline: {
         type: Boolean,
         default: false,
      },
      minlines: {
         type: [String, Number],
         required: false,
      },
      spellcheck: {
         type: Boolean,
         default: true,
      },
      autocomplete: {
         type: String,
         default: 'none'
      },
      autofocus: {
         type: Boolean,
         default: false
      },
      autocapitalize: {
         type: Boolean,
         default: true
      },
      required: {
         type: Boolean,
         default: false,
      },
   },
   methods: {
      handleInput($event) {
         const target = $event.target;
         const value = target.value;

         this.$emit("input", value);
      },
      focus($event) {
         const target = $event.target;
         let parent = null;

         if (!target.classList.contains("app-input-controller")) {
            return;
         }

         parent = target.parentElement;

         if (!parent) {
            return;
         } else if (!parent.classList.contains("app-input")) {
            return;
         }

         parent.classList.add("focused");

         target.addEventListener("blur", () => {
            parent.classList.remove("focused");
         });
      },
   },
});
</script>
