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
            @focus="focus"
            @input="handleInput">{{ modelValue }}</textarea>

         <input
            v-else
            class="app-input-controller"
            :type="format"
            :placeholder="hint"
            :spellcheck="spellcheck"
            @input="handleInput"
            @focus="focus"
            :required="required"
            :value="modelValue" />
      </keep-alive>
   </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TrashIcon from './Icons/plus.vue'

export default defineComponent({
   name: 'AppInput',

   props: {
      icon: {
         type: [Function, Object],
         required: false
      },
      format: {
         type: String,
         default: 'text'
      },
      modelValue: { 
         required: false 
      },
      hint: {
         type: String,
         required: false
      },
      expanded: {
         type: Boolean,
         default: false
      },
      multiline: {
         type: Boolean,
         default: false
      },
      minlines: {
         type: [String, Number],
         required: false
      },
      spellcheck: {
         type: Boolean,
         default: true
      },
      required: {
         type: Boolean,
         default: false
      }
   },
   
   components: {TrashIcon},

   methods: {
      handleInput($event: Event) {
         const target = $event.target
         const value = (target as HTMLInputElement).value

         this.$emit('update:modelValue', value, target)
      },
      focus($event: FocusEvent) {
         const target = $event.target as Element
         let parent: HTMLElement | null

         if (!target.classList.contains('app-input-controller')) {
            return
         }

         parent = target.parentElement

         if (!parent) {
            return
         } else if (!parent.classList.contains('app-input')) {
            return
         }

         parent.classList.add('focused')

         target.addEventListener('blur', () => {
            parent?.classList.remove('focused')
         })
      }
   }
})
</script>

<style scoped lang="scss">
@import "../scss/const";

.app-input {
   display: inline-flex;
   height: 46px;
   width: 140pt;
   padding: var(--gap-quarter) var(--gap-half);
   border-radius: var(--radius);
   border-width: 1.5px;
   border-style: solid;
   border-color: transparent;
   box-sizing: border-box;
   background-color: var(--accents-1);
   transition: border-color 120ms ease, background-color 90ms linear;

   .app-input-icon {
      width: 30px;
      display: inline-flex;
      align-items: center;

      .app-icon {
         color: var(--accents-4);
      }
   }

   &.focused {
      border-color: var(--primary);
      background-color: transparent;
   }

   &[aria-multiline="true"] {
      height: auto;
   }

   &[aria-expanded="true"] {
      width: 100%;
   }

   .app-input-controller {
      border: none;
      width: 100%;
      border-radius: inherit;
      font-family: $font-sans;
      background-color: transparent;

      &::placeholder {
         font-size: 93%;
         color: var(--accents-3);
      }
   }
}
</style>
