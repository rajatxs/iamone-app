<template>
   <div class="vscreen">
      <div class="vscreen-device">
         <div class="iPhone__button iPhone__button--left iPhone__button--silent-switch"></div>
         <div class="iPhone__button iPhone__button--left iPhone__button--volume iPhone__button--volume-up"></div>
         <div class="iPhone__button iPhone__button--left iPhone__button--volume iPhone__button--volume-down"></div>
         <div class="iPhone__button iPhone__button--right iPhone__button--power"></div>
         <div class="vscreen-frame">
            <div class="vscreen-notch"></div>
            <div class="vscreen-display">
               <div ref="mockupScreen" class="page__content" v-html="code"></div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import Vue from "vue";
import mockupMixin from '../../mixins/mockup';

export default Vue.extend({
   name: 'DefaultMobile',
   mixins: [mockupMixin],
   props: {
      code: {
         type: String,
         default: "",
      },
   }
});
</script>

<style scoped>
.vscreen {
   width: 100%;
   max-width: 320px;
   margin: var(--gap);
}
.vscreen .vscreen-device {
   width: 100%;
   position: relative;
   padding-bottom: 200.2380952381%;
   -webkit-overflow-scrolling: touch;
}
.vscreen .vscreen-device ::-webkit-scrollbar {
   width: 5px;
   height: 5px;
   background-color: transparent;
}
.vscreen .vscreen-device ::-webkit-scrollbar-thumb {
   background-color: rgba(0, 0, 0, 0.25);
   border-radius: 2.5px;
   transition: background-color 0.2s ease-out;
}
.vscreen .vscreen-device ::-webkit-scrollbar-thumb:hover {
   background-color: rgba(0, 0, 0, 0.5);
}
.vscreen .vscreen-device .vscreen-frame {
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
.vscreen .vscreen-device .vscreen-notch {
   position: absolute;
   top: 3%;
   left: 25%;
   right: 25%;
   height: 3.5%;
   border-radius: 0 0 10px 10px;
   background-color: var(--foreground);
   z-index: 110;
}
.vscreen .vscreen-device .vscreen-display {
   position: absolute;
   top: 3%;
   left: 6%;
   right: 6%;
   bottom: 3%;
   padding-top: 10%;
   box-shadow: 0 0 0 6vw var(--foreground);
   border-radius: 10% / 5%;
   background: var(--page-content-background);
   background-repeat: no-repeat;
   overflow: auto;
   z-index: 102;
}
.vscreen .vscreen-device .iPhone__button {
   position: absolute;
   width: 0.7%;
   background-color: var(--foreground);
   z-index: 103;
}
.vscreen .vscreen-device .iPhone__button--left {
   left: 0;
   border-radius: 90% 0 0 90%/5% 0 0 5%;
}
.vscreen .vscreen-device .iPhone__button--right {
   right: 0;
   border-radius: 0 90% 90% 0array/0array 5% 5% 0;
}
.vscreen .vscreen-device .iPhone__button--silent-switch {
   top: 13%;
   height: 4%;
}
.vscreen .vscreen-device .iPhone__button--volume {
   height: 7%;
}
.vscreen .vscreen-device .iPhone__button--volume-up {
   top: 21%;
}
.vscreen .vscreen-device .iPhone__button--volume-down {
   top: 30%;
}
.vscreen .vscreen-device .iPhone__button--power {
   top: 23%;
   height: 11%;
}

body.dark .vscreen .vscreen-device .vscreen-notch {
   background-color: var(--accents-1);
}
body.dark .vscreen .vscreen-device .vscreen-display {
   box-shadow: 0 0 0 6vw var(--accents-1);
}
body.dark .vscreen .vscreen-device .iPhone__button {
   background-color: var(--accents-2);
}
</style>
