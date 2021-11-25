<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'

export default defineComponent({
   props: {
      code: {
         type: String,
         default: ''
      }
   },
   computed: mapState(['showMockupSplashScreen'])
})
</script>

<template>
   <div class="vscreen">
      <div class="vscreen-device">
         <div class="iPhone__button iPhone__button--left iPhone__button--silent-switch"></div>
         <div class="iPhone__button iPhone__button--left iPhone__button--volume iPhone__button--volume-up"></div>
         <div class="iPhone__button iPhone__button--left iPhone__button--volume iPhone__button--volume-down"></div>
         <div class="iPhone__button iPhone__button--right iPhone__button--power"></div>
         <div class="vscreen-frame">
            <div class="vscreen-notch"></div>
            <div v-html="code" class="vscreen-display">
            </div>
               <!-- <div 
                  v-if="showMockupSplashScreen" 
                  class="vscreen-splash">
                  <img 
                     class="vscreen-splash-icon" 
                     src="/icons/apple.svg" 
                     alt="Apple Icon" />
               </div> -->
               <!-- <div ></div> -->
         </div>
      </div>
   </div>
</template>

<style lang="scss" scoped>
.vscreen {
   width: 100%;
   max-width: 320px;
   margin: var(--gap);

   .vscreen-device {
      width: 100%;
      position: relative;
      padding-bottom: 200.2380952381%;
      -webkit-overflow-scrolling: touch;

      ::-webkit-scrollbar {
         width: 5px;
         height: 5px;
         background-color: transparent;
      }
      ::-webkit-scrollbar-thumb {
         background-color: rgba(0, 0, 0, 0.25);
         border-radius: 2.5px;
         transition: background-color 0.2s ease-out;
      }
      ::-webkit-scrollbar-thumb:hover {
         background-color: rgba(0, 0, 0, 0.5);
      }

      .vscreen-frame {
         position: absolute;
         top: 0;
         left: 0;
         bottom: 0;
         right: 0;
         border-radius: 15%/7%;
         margin: 0 0.7%;
         overflow: hidden;
         z-index: 100;
         box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.3);
      }

      .vscreen-notch {
         position: absolute;
         top: 3%;
         left: 25%;
         right: 25%;
         height: 3.5%;
         border-radius: 0 0 10px 10px;
         background-color: var(--foreground);
         z-index: 110;
      }
      
      .vscreen-display {
         position: absolute;
         top: 3%;
         left: 6%;
         right: 6%;
         bottom: 3%;
         padding-top: 10%;
         box-shadow: 0 0 0 6vw var(--foreground);
         border-radius: 10% / 5%;
         background: var(--template-background);
         background-repeat: no-repeat;
         overflow: auto;
         z-index: 102;
      }
      .iPhone__button {
         position: absolute;
         width: 0.7%;
         background-color: var(--foreground);
         z-index: 103;
      }
      .iPhone__button--left {
         left: 0;
         border-radius: 90% 0 0 90%/5% 0 0 5%;
      }
      .iPhone__button--right {
         right: 0;
         border-radius: 0 90% 90% 0Array/0Array 5% 5% 0;
      }
      .iPhone__button--silent-switch {
         top: 13%;
         height: 4%;
      }
      .iPhone__button--volume {
         height: 7%;
      }
      .iPhone__button--volume-up {
         top: 21%;
      }
      .iPhone__button--volume-down {
         top: 30%;
      }
      .iPhone__button--power {
         top: 23%;
         height: 11%;
      }
   }
}
</style>
