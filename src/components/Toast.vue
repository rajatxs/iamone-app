<template>
   <div class="app-toast-container">
      <div :class="toastClasses">
         <span class="message">{{ text }}</span>
         <button v-if="action" class="action">Done</button>
      </div>
   </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
   name: "Toast",

   data() {
      return {
         text: '',
         action: null as any,
         type: '',
      }
   },

   methods: {
      init(options: any) {
         if (typeof options !== 'object') {
            return (this.text = options);
         }

         const { text, action, type } = options;
         this.type = type;
         this.text = text;
         this.action = action;
      }
   },

   computed: {
      toastClasses() {
         const classes = ['app-toast'];
         classes.push(this.type);
         return classes;
      }
   }
})
</script>

<style lang="scss" scoped>
@import "../scss/const";

.app-toast-area{
   position:fixed;
   bottom:.625rem;
   right:1.25rem;
   max-width:26.25rem;
   z-index: 3000;
   transition:transform .4s,opacity .4s ease;

   &:hover .app-toast-container{
      transform:translateZ(0) scale(1);
   }
   &:hover .app-toast-container:nth-last-child(2){
      transform:translate3d(0,-80px,0) scale(1);
   }
   &:hover .app-toast-container:nth-last-child(3){
      transform:translate3d(0,-160px,0) scale(1);
   }

   @media only screen and (max-width:767px){
      left:5vw;
      right:5vw;
      width:90vw;
      
      .app-toast-container{
         width:100%;
      }
   }
}

.app-toast-container{
   // opacity: 0;
   transform: translate3d(0,100%,0) scale(1);
   transition: all .4s ease;
   position: absolute;
   bottom: 16pt;
   height: 4.5rem;
   right: 16pt;
   max-width: 90vw;

   &.visible{
      opacity:1;
      transform:none;
   }
   &:last-child{
      z-index:2004;
   }
   &:nth-last-child(2){
      transform:translate3d(0,-14px,0) scale(.95);
      z-index:2003;
   }
   &:nth-last-child(3){
      transform:translate3d(0,-28px,0) scale(.9);
      z-index:2002;
   }
   &:nth-last-child(4){
      transform:translate3d(0,-36px,0) scale(.85);
      z-index:2001;
   }
   &:nth-last-child(5){
      transform:translate3d(0,-46px,0) scale(.8);
      z-index: 2000;
   }
   &:nth-last-child(n+4){
      visibility:hidden;
   }
}

.app-toast{
   padding: 16pt;
   border-radius: var(--radius);
   border:0;
   width: 420px;
   max-width: 90vw;
   height: 58px;
   color:var(--foreground);
   background-color:var(--background);
   display:flex;
   justify-content:space-between;
   align-items:center;
   box-shadow:0 4px 9px rgba(0,0,0,.12);
   font-size:.875rem;
   box-sizing:border-box;

   &.primary{
      background-color:var(--foreground);
      color:var(--background);
   }
   &.error{
      background-color: $red;
      color: #FFF;
   }
   &.warning{
      background-color: $yellow;
      color: #000;
   }
   &.success{
      background-color: $blue;
      color: #FFF;
   }

   .message{
      text-overflow:ellipsis;
      white-space:nowrap;
      overflow:hidden;
      flex:1;
      margin:0;
      padding:0
   }
   .message.action{
      max-width:70%;
   }

   .action {
      min-width: 60px;
      height: 30px;
      background-color: transparent;
      border: none;
      color: inherit;
      font-size: 90%;
      border-radius: var(--radius);
      border: 1px solid var(--background);
   }
}
</style>
