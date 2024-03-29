<template>
   <app-controller-view name="design">
      <app-card title="Themes" gap="large">
         <template #body>
            <div v-for="collection in collections" :key="collection.id">
               <h5 class="pad-x-small">{{ collection.name }}</h5>
               <div class="design-themes">
                  <div 
                     v-for="theme in collection.themes"
                     :key="theme.key" 
                     :data-theme-key="theme.key"
                     :data-theme-active="theme.key === themeName"
                     @click="changeCurrentTheme(theme.key)"
                     class="design-theme radius-medium">
                     <div class="theme-thumb">
                        <img class="theme-thumb-image" :src="theme.thumb" :alt="theme.name" />
                     </div>
                     <div class="theme-name pad-x-medium pad-y-medium text-center">
                        <small>{{ theme.name }}</small>
                     </div>
                  </div>
               </div>
               <br />
            </div>

            <br />

            <div v-if="loading" class="ystack align-center gap-large w-100 pad-y-medium">
               <app-loader size="20pt" />
               <div><small>Getting themes...</small></div>
            </div>

            <div v-if="selectionProcess" class="selection-process ystack align-center justify-center gap-large w-100 pad-y-medium">
               <app-loader size="20pt" />
               <div><small>Applying...</small></div>
            </div>
         </template>
      </app-card>
   </app-controller-view>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'

export default Vue.extend({
   name: 'DesignController',
   data() {
      return {
         loading: true,
         selectionProcess: false,
         themes: [],
         collections: []
      }
   },
   computed: {
      themeName() {
         return this.$store.getters['pageConfig/pageConfig'].theme;
      }
   },
   async mounted() {
      await this.loadThemes();
   },
   methods: {
      async loadThemes() {
         this.loading = true;
         try {
            const response = await axios.get('https://iamone-render-functions.vercel.app/x/themes.json');
            this.collections = response.data;
         } catch (error) {
            this.$toast.error(error.response.data.message);
         }
         this.loading = false;
      },

      async changeCurrentTheme(themeName) {
         let payload = {
            theme: themeName
         };

         if (themeName === this.themeName) {
            return;
         }

         this.selectionProcess = true;

         try {
            const response = await this.axios.put('/page-config', payload);
            
            if (response.status === 200 || response.status === 201) {
               this.$store.commit('pageConfig/SET_THEME', themeName);
               this.$toast.success({
                  text: "Theme applied",
                  duration: 1200
               });
            }
         } catch (error) {
            this.$toast.error(error.response.data.message);
         }

         this.selectionProcess = false;
      }
   }
})
</script>

<style>
.design-themes {
   display: grid;
   gap: var(--gap);
   grid-template-columns: repeat(3, 1fr);
}
.design-theme {
   position: relative;
   min-height: 240px;
   cursor: pointer;
   border-width: 1px;
   border-style: solid;
   border-color: transparent;
   box-sizing: border-box;
   background-color: var(--accents-1);
}
.design-theme[data-theme-active="true"] {
   border-color: var(--primary);
}
.design-theme[data-theme-active="true"] .theme-name {
   background-color: var(--primary);
   color: var(--primary-fr);
}
.theme-thumb {
   position: absolute;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   z-index: 45;
   border-radius: inherit;
}
.theme-thumb-image {
   height: 100%;
   width: 100%;
   border-radius: inherit;
}
.theme-name {
   position: absolute;
   bottom: 0;
   left: 0;
   right: 0;
   width: 100%;
   background-color: rgba(255, 255, 255, 0.9);
   color: var(--accents-6);
   box-sizing: border-box;
   border-bottom-left-radius: inherit;
   border-bottom-right-radius: inherit;
   z-index: 50;
}
.design-theme:hover {
   box-shadow: var(--shadow-medium);
}
.selection-process {
   position: absolute;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   z-index: 82;
   background-color: var(--background);
   opacity: 0.9;
}
body.dark .theme-name {
   background-color: rgba(0, 0, 0, 0.9);
}
@media (max-width: 480px) {
   .design-themes {
      gap: var(--gap-half);
      grid-template-columns: repeat(2, 1fr);
   }
   .design-theme {
      min-height: 220px;
   }
}
</style>
