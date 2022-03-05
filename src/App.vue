<template>
   <div id="app">
      <div v-if="isUserLoaded" class="activity-area xstack h-100 w-100">
         <app-mockup v-if="viewPreview && isPageConfigLoaded" />
         <app-controlbar v-if="isUserLoaded" />
      </div>

      <div v-else class="universal-data-loading">
         <img class="universal-data-loading-image" :src="'/icons/iamone-gray.svg' | STATIC_URL" width="120" alt="iamone" />
      </div>

      <app-universal-area />
   </div>
</template>

<script>
import Vue from "vue";
import AppControlbar from "./partials/Controlbar/Controlbar.vue";
import AppMockup from "./partials/Mockups/Mockup.vue";
import UniversalArea from './partials/UniversalArea.vue';

export default Vue.extend({
   name: "App",
   components: {
      "app-controlbar": AppControlbar,
      "app-mockup": AppMockup,
      'app-universal-area': UniversalArea
   },
   computed: {
      isUserLoaded() {
         return this.$store.getters['user/loaded'];
      },
      isPageConfigLoaded() {
         return this.$store.getters['pageConfig/loaded'];
      },
      viewPreview() {
         return this.$store.state.ui.viewPreview;
      }
   },
   async mounted() {
      await this.$store.dispatch('loadTemplateData');
      
      window.onresize = this.handleWindowResizeEvent;
      this.handleWindowResizeEvent();
   },
   methods: {
      handleWindowResizeEvent() {
         if (window.innerWidth < 1060 && this.viewPreview) {
            this.$store.commit('ui/SHOW_PREVIEW', false);
         } else if (window.innerWidth > 1060 && !this.viewPreview) {
            this.$store.commit('ui/SHOW_PREVIEW', true);
         }
      }
   }
});
</script>

<style>
#app {
   display: flex;
   width: 100%;
   height: 100%;
   background-color: var(--background);
}
.universal-data-loading {
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background-color: rgba(255, 255, 255, 0.8);
}

body.dark .universal-data-loading {
   background-color: var(--background);
}
body.dark .universal-data-loading .universal-data-loading-image {
   filter: invert(0);
}
</style>
