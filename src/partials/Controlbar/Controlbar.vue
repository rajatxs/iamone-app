<template>
   <div class="app-controlbar">
      <div class="controlbar-top">
         <AppLogo :size="80" />
         <PreviewLink />

         <div class="controlbar-navigation xstack gap-medium">
            <app-nav-menu-icon icon="qr" @click="SHOW_QRCODE_MODAL(true)"></app-nav-menu-icon>
            <app-nav-menu-icon icon="share-alt" @click="SHOW_SHARE_MODAL(true)"></app-nav-menu-icon>
            <SessionMenu />
         </div>
      </div>

      <div class="control-sector-tab">
         <router-link 
            v-for="tab in controlSectorTabs" 
            :to="tab.path"
            :key="tab.path" 
            active-class="active"
            role="button" 
            class="sector-tab-item">
            <span class="label">{{ tab.label }}</span>
         </router-link>
      </div> 

      <div class="control-sector-area">
         <router-view></router-view>
      </div>
   </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createNamespacedHelpers } from 'vuex'
import AppLogo from './Logo.vue'
import SessionMenu from './SessionMenu.vue'
import PreviewLink from './PreviewLink.vue'

interface ControlSectorTab {
   label: string,
   path: string
}

const { mapMutations: mapUIMutations } = createNamespacedHelpers('ui')

export default defineComponent({
   name: 'AppControlbar',

   components: {
      AppLogo,
      SessionMenu,
      PreviewLink
   },

   data() {
      return {
         controlSectorTabs: <ControlSectorTab[]>[
            {
               label: 'Profile',
               path: '/'
            },
            {
               label: 'Design',
               path: '/design'
            },
            {
               label: 'Analytics',
               path: '/analytics'
            },
            {
               label: 'Settings',
               path: '/settings'
            }
         ]
      }
   },

   methods: mapUIMutations([
      'SHOW_QRCODE_MODAL', 
      'SHOW_SHARE_MODAL'
   ])
})
</script>

<style lang="scss" scoped>
@import "../../scss/const";
@import "../../scss/scroll";

.app-controlbar {
   width: $controlbar-area-width;
   height: 100%;
   background-color: #FCFCFC;
   overflow-x: hidden;
   overflow-y: hidden;

   .control-sector-tab {
      display: flex;
      width: 100%;
      height: 32pt;
      gap: 28pt;
      justify-content: center;

      .sector-tab-item {
         display: flex;
         cursor: pointer;
         justify-content: center;
         align-items: center;
         border-bottom-width: 2px;
         border-bottom-style: solid;
         border-bottom-color: transparent;
         box-sizing: border-box;
         transition: border-bottom-color 120ms linear;

         .label {
            color: var(--accents-5);
         }

         &:hover {
            border-bottom-color: var(--accents-2);

            .label {
               color: var(--accents-6);
            }
         }

         &.active {
            border-bottom-width: 3px;
            border-bottom-color: var(--primary);

            .label {
               color: var(--foreground);
            }
         }
      }
   }

   .control-sector-area {
      @include regular-scrollbar();
      height: calc(100% - 98pt);
      overflow-y: auto;
   }
}

.controlbar-top {
   display: flex;
   align-items: center;
   justify-content: space-between;
   margin-left: 28pt;
   margin-right: 28pt;
}

@media screen and (max-width: 1060px) {
   .app-controlbar {
      width: 100%;
   }
}
</style>
