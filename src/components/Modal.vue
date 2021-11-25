<template>
   <transition name="fade">
      <div 
         :class="modalOutlayerClasses" 
         :aria-label="modalAriaLabel"
         :style="modalOutlayerStyle" 
         @mousedown="handleBlurAction">
         <div class="app-modal" v-bind:style="modalStyle">

            <!-- Modal top area -->
            <div class="app-modal-top" :style="modalTopStyle">

               <!-- Modal header -->
               <div class="app-modal-header">
                  <h4 v-if="title" class="modal-title">{{ title }}</h4>
               </div>

               <!-- Modal primary actions -->
               <div class="app-modal-actions">

                  <!-- Close icon -->
                  <div v-if="closeButton && toggle" class="close-button">
                     <app-icon-button name="x" @click="handleCloseAction"></app-icon-button>
                  </div>
               </div>
            </div>

            <!-- Modal body -->
            <div class="app-modal-body" v-bind:style="modalBodyStyle">
               <slot></slot>
            </div>

            <!-- Modal footer -->
            <div class="app-modal-footer xstack gap-medium justify-center">
               <slot name="footer"></slot>
            </div>
         </div>
      </div>
   </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { generateElementId } from '../utils/random'

export default defineComponent({
   name: 'AppModal',

   props: {
      title: {
         type: String,
         required: false
      },
      width: {
         type: String,
         default: '420px'
      },
      height: {
         type: String,
         default: 'auto'
      },
      minheight: {
         type: String,
         default: '60px'
      },
      toggle: {
         type: Boolean,
         default: true
      },
      transparent: {
         type: Boolean,
         default: false
      },
      radius: {
         type: String,
         default: 'var(--radius)'
      },
      zIndex: {
         type: String,
         default: '500'
      },
      closeButton: {
         type: Boolean,
         default: true
      }
   },

   computed: {
      modalOutlayerClasses(): string[] {
         const list = ['app-modal-outlayer']

         if (this.transparent) {
            list.push('transparent')
         }

         return list
      },
      modalOutlayerStyle() {
         return {
            'z-index': this.zIndex
         }
      },
      modalStyle() {
         return {
            width: this.width,
            borderRadius: this.radius
         }
      },
      modalTopStyle() {
         return {
            minHeight: this.minheight
         }
      },
      modalBodyStyle() {
         return {
            height: this.height,
         }
      },
   },

   data() {
      return {
         modalId: '',
         modalAriaLabel: ''
      }
   },

   created() {
      this.modalId = generateElementId('instance')
      this.modalAriaLabel = 'app-modal-' + this.modalId
   },

   methods: {
      leave(el: Element, done: Function) {
         console.log("LEAVE", el)
         done()
      },
      handleBlurAction(event: MouseEvent) {
         const target = (<Element>event.target)

         if (target.getAttribute('aria-label') === this.modalAriaLabel) {
            this.$emit('blur', event)
         }
      },
      handleCloseAction(event: MouseEvent) {
         this.$emit('close', event)
      }
   }
})
</script>

<style lang="scss" scoped>
@import "../scss/scroll";

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes modal-create-anim {
   from {
      opacity: 0;
      transform: scale(0.7) translateY(-12px);
   }
   to {
      opacity: 1;
      transform: scale(1) translateY(0);
   }
}

.app-modal-outlayer {
   position: fixed;
   display: flex;
   justify-content: center;
   align-items: center;
   top: 0;
   left: 0;
   bottom: 0;
   right: 0;
   background-color: rgba(0, 0, 0, 0.23);
   z-index: 500;
}
.app-modal-outlayer.transparent {
   background-color: transparent;
}

.app-modal {
   position: relative;
   background-color: var(--background);
   box-shadow: var(--shadow-large);
   animation-name: modal-create-anim;
   animation-duration: 280ms;

   .app-modal-top {
      display: flex;
      justify-content: center;
      align-items: center;

      .app-modal-header {
         display: block;

         .modal-title {
            margin: 0;
            font-weight: 600;
         }
      }

      .app-modal-actions {
         display: flex;
         position: absolute;
         align-items: center;
         top: var(--gap-half);
         right: var(--gap-half);

         .app-icon-button {
            margin: 0;
         }
      }
   }

   .app-modal-body {
      @include regular-scrollbar();
      position: relative;
      min-height: 120px;
      overflow: auto;
      transition: height 260ms;
   }

   .app-modal-footer {
      position: absolute;
      padding-top: var(--gap-quarter);
      bottom: var(--gap-half);
      left: var(--gap);
      right: var(--gap);
   }
}
</style>
