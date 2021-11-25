<template>
   <button 
      :class="buttonClasses" 
      :aria-expanded="expanded"
      :disabled="disabled">

      <app-loader v-if="loading" />
      <slot v-else></slot>
   </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
   name: 'AppButton',
   props: {
      type: {
         type: String,
         default: 'filled'
      },
      loading: {
         type: Boolean,
         default: false
      },
      expanded: {
         type: Boolean,
         default: false
      },
      gradient: {
         type: String,
         required: false
      },
      background: {
         type: String,
         required: false
      },
      text: {
         type: String,
         require: false
      },
      disabled: {
         type: Boolean,
         default: false
      },
      size: {
         type: String,
         default: 'medium'
      }
   },
   computed: {
      buttonClasses() {
         const list = ['app-button']
         
         list.push('type__' + this.type)
         list.push('size__' + this.size)

         if (this.gradient) {
            list.push('bg-gradient-' + this.gradient)
         }

         if (this.background) {
            list.push('bg-' + this.background)
         }

         if (this.text) {
            list.push('text-' + this.text)
         }

         return list
      }
   }
})
</script>

<style lang="scss">
.app-button {
   display: inline-flex;
   width: auto;
   height: 48px;
   flex-direction: row;
   justify-content: center;
   align-items: center;
   padding-left: var(--gap);
   padding-right: var(--gap);
   margin: 0;
   font-size: 1rem;
   border: 0;
   border-radius: var(--radius);
   cursor: pointer;
   background-color: var(--foreground);
   color: var(--background);
   transition: transform 140ms ease, box-shadow 160ms ease;
   transform: translateY(0);

   &:hover {
      box-shadow: var(--shadow-medium);
   }

   &:active {
      transform: translateY(-5px);
   }
}
.app-button:disabled {
   background-color: var(--accents-1);
   color: var(--accents-4);
   pointer-events: none;
}
.app-button.type__text {
   background-color: transparent;
   color: auto;
}
.app-button.size__small {
   min-width: 80px;
   height: 38px;
   font-size: 14px;
}
.app-button[aria-expanded='true'] {
   width: calc(100% - var(--gap-half));
   margin-left: 0;
   margin-right: 0;
   padding-left: 0;
   padding-right: 0;
}
</style>
