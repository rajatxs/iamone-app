<template>
   <transition name="fade">
      <div
         :class="modalOutlayerClasses"
         :aria-label="modalAriaLabel"
         :style="modalOutlayerStyle"
         @mousedown="handleBlurAction"
      >
         <div :class="modalClasses" v-bind:style="modalStyle">
            <!-- Modal top area -->
            <div
               class="app-modal-top xstack justify-center align-center"
               :style="modalTopStyle"
            >
               <!-- Modal header -->
               <div class="app-modal-header">
                  <h4 v-if="title" class="modal-title margin-0">{{ title }}</h4>
               </div>

               <!-- Modal primary actions -->
               <div class="app-modal-actions pos-abs xstack align-center">
                  <!-- Close icon -->
                  <div v-if="closeButton" class="close-button">
                     <app-icon-button
                        name="x"
                        @click="handleCloseAction"
                     ></app-icon-button>
                  </div>
               </div>
            </div>

            <!-- Modal body -->
            <div :class="modalBodyClasses" v-bind:style="modalBodyStyle">
               <slot></slot>
            </div>

            <!-- Modal footer -->
            <div
               class="app-modal-footer pos-abs xstack gap-medium justify-center"
            >
               <slot name="footer"></slot>
            </div>
         </div>
      </div>
   </transition>
</template>

<script>
import Vue from "vue";
import { generateElementId } from "../utils/random";

export default Vue.extend({
   name: "AppModal",
   props: {
      title: {
         type: String,
         required: false,
      },
      width: {
         type: String,
         default: "420px",
      },
      height: {
         type: String,
         default: "auto",
      },
      minheight: {
         type: String,
         default: "60px",
      },
      autoresize: {
         type: Boolean,
         default: false,
      },
      transparent: {
         type: Boolean,
         default: false,
      },
      gap: {
         type: String,
         default: "medium",
      },
      radius: {
         type: String,
         default: "medium",
      },
      zIndex: {
         type: String,
         default: "500",
      },
      closeButton: {
         type: Boolean,
         default: true,
      },
   },

   computed: {
      modalOutlayerClasses() {
         const list = [
            "app-modal-outlayer",
            "xstack",
            "justify-center",
            "align-center",
            "cover-viewport",
         ];

         if (this.transparent) {
            list.push("transparent");
         }

         return list;
      },
      modalOutlayerStyle() {
         return {
            "z-index": this.zIndex,
         };
      },
      modalClasses() {
         const list = ["app-modal", "shadow-large", "pos-rel"];

         if (this.autoresize) {
            list.push("auto-resize");
         }

         list.push("radius-" + this.radius);

         return list;
      },
      modalStyle() {
         return {
            width: this.width,
         };
      },
      modalTopStyle() {
         return {
            minHeight: this.minheight,
         };
      },
      modalBodyStyle() {
         return {
            height: this.height,
         };
      },
      modalBodyClasses() {
         const list = [
            "app-modal-body", 
            "pos-rel", 
            "overflow-auto",
            "regular-scroll"
         ];

         list.push("pad-x-" + this.gap);

         return list;
      },
   },

   data() {
      return {
         modalId: "",
         modalAriaLabel: "",
      };
   },
   created() {
      this.modalId = generateElementId("instance");
      this.modalAriaLabel = "app-modal-" + this.modalId;
   },
   methods: {
      /** Handle outlayer click action */
      handleBlurAction(event) {
         const target = event.target;

         if (target.getAttribute("aria-label") === this.modalAriaLabel) {
            this.$emit("blur", event);
         }
      },

      /** Handle close button action */
      handleCloseAction(event) {
         this.$emit("close", event);
      },
   },
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
   transition: opacity 280ms ease;
}
.fade-enter-from,
.fade-leave-to {
   opacity: 0;
}

@keyframes modal-create-anim {
   from {
      opacity: 0;
      transform: translateY(-28px);
   }
   to {
      opacity: 1;
      transform: translateY(0);
   }
}

@media (max-width: 480px) {
   @keyframes modal-create-anim {
      from {
         opacity: 0;
         transform: translateY(80px);
      }
      to {
         opacity: 1;
         transform: translateY(0);
      }
   }
}

.app-modal-outlayer {
   background-color: rgba(0, 0, 0, 0.23);
   z-index: 500;
}
.app-modal-outlayer.transparent {
   background-color: transparent;
}
.app-modal {
   border-width: 1px;
   border-style: solid;
   border-color: transparent;
   background-color: var(--background);
   animation-name: modal-create-anim;
   animation-duration: 280ms;
}
.app-modal-top .app-modal-header {
   display: block;
}
.app-modal-top .app-modal-header .modal-title {
   font-weight: 600;
}
.app-modal-top .app-modal-actions {
   top: var(--gap-half);
   right: var(--gap-half);
}
.app-modal-top .app-modal-actions .app-icon-button {
   margin: 0;
}
.app-modal-body {
   min-height: 120px;
   transition: height 260ms;
}
.app-modal-footer {
   padding-top: var(--gap-quarter);
   bottom: var(--gap-half);
   left: var(--gap);
   right: var(--gap);
}

body.dark .app-modal-outlayer {
   background-color: rgba(0, 0, 0, 0.8);
}
body.dark .app-modal {
   background-color: var(--background);
   border-color: var(--accents-2);
}

@media (max-width: 480px) {
   .fade-enter-active .app-modal,
   .fade-leave-active .app-modal {
      transition: all 240ms ease;
   }
   .fade-enter-from .app-modal,
   .fade-leave-to .app-modal {
      transform: translateY(46px);
   }

   .app-modal-outlayer {
      align-items: flex-end;
   }
   .app-modal {
      width: 100% !important;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
   }
   body.dark .app-modal {
      border-color: transparent;
      border-top-color: var(--accents-2);
   }
}
</style>
