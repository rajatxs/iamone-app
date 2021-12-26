<template>
   <div class="app-toast-container">
      <div v-bind:class="toastClasses">
         <span class="message">{{ text }}</span>
         <app-button
            v-if="action"
            size="small"
            v-bind:type="action.type"
            @click="action.handler"
         >
            {{ action.label }}
         </app-button>
      </div>
   </div>
</template>

<script>
export default {
   name: "Toast",

   data() {
      return {
         text: "",
         action: null,
         type: "",
      };
   },

   methods: {
      init(options) {
         if (typeof options !== "object") {
            return (this.text = options);
         }

         const { text, action, type } = options;
         this.type = type;
         this.text = text;
         this.action = action;
      },
   },

   computed: {
      toastClasses() {
         const classes = ["app-toast"];
         classes.push(this.type);
         return classes;
      },
   },
};
</script>

<style scoped>
.app-toast-area {
   position: fixed;
   bottom: 0.625rem;
   right: 1.25rem;
   max-width: 26.25rem;
   z-index: 2000;
   transition: transform 0.4s, opacity 0.4s ease;
}
.app-toast-area:hover .app-toast-container {
   transform: translateZ(0) scale(1);
}
.app-toast-area:hover .app-toast-container:nth-last-child(2) {
   transform: translate3d(0, -80px, 0) scale(1);
}
.app-toast-area:hover .app-toast-container:nth-last-child(3) {
   transform: translate3d(0, -160px, 0) scale(1);
}
.app-toast-container {
   opacity: 0;
   transform: translate3d(0, 100%, 0) scale(1);
   transition: all 0.4s ease;
   position: absolute;
   bottom: var(--gap);
   height: 4.5rem;
   right: 16pt;
   max-width: 90vw;
}
.app-toast-container.visible {
   opacity: 1;
   transform: none;
}
.app-toast-container:last-child {
   z-index: 2004;
}
.app-toast-container:nth-last-child(2) {
   transform: translate3d(0, -14px, 0) scale(0.95);
   z-index: 2003;
}
.app-toast-container:nth-last-child(3) {
   transform: translate3d(0, -28px, 0) scale(0.9);
   z-index: 2002;
}
.app-toast-container:nth-last-child(4) {
   transform: translate3d(0, -36px, 0) scale(0.85);
   z-index: 2001;
}
.app-toast-container:nth-last-child(5) {
   transform: translate3d(0, -46px, 0) scale(0.8);
   z-index: 2000;
}
.app-toast-container:nth-last-child(n + 4) {
   visibility: hidden;
}
.app-toast {
   padding: 16pt;
   border-radius: 5px;
   border: 0;
   width: 420px;
   max-width: 90vw;
   height: 58px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   box-shadow: 0 4px 9px rgba(0, 0, 0, 0.12);
   font-size: 0.875rem;
   box-sizing: border-box;
}
.app-toast.primary {
   background-color: var(--foreground);
   color: var(--background);
}
.app-toast.error {
   background-color: var(--error);
   color: var(--background);
}
.app-toast.warning {
   background-color: var(--warning);
   color: var(--background);
}
.app-toast.success {
   background-color: var(--success);
   color: var(--background);
}
.app-toast .message {
   text-overflow: ellipsis;
   white-space: nowrap;
   overflow: hidden;
   flex: 1;
   margin: 0;
   padding: 0;
}
.app-toast .message.action {
   max-width: 70%;
}
</style>
