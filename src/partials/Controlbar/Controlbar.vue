<template>
   <div class="app-controlbar h-100 overflow-hidden">
      <div :class="controlbarTopClasses">
         <app-logo size="25px" />
         <app-preview-link />

         <div class="controlbar-navigation xstack gap-medium">
            <app-nav-menu-icon icon="qr" @click="SHOW_QRCODE_MODAL(true)"></app-nav-menu-icon>
            <app-nav-menu-icon icon="share-alt" @click="SHOW_SHARE_MODAL(true)"></app-nav-menu-icon>
            <app-session-menu />
         </div>
      </div>

      <div :class="controlSectorTabClasses">
         <router-link
            v-for="tab in controlSectorTabs"
            :to="tab.path"
            :key="tab.path"
            :exact="true"
            :class="controlSectorTabItem"
            active-class="active"
            role="button">
            <span class="label">{{ tab.label }}</span>
         </router-link>
      </div>

      <div class="control-sector-area regular-scroll">
         <router-view></router-view>
      </div>
   </div>
</template>

<script>
import Vue from "vue";
import { createNamespacedHelpers } from "vuex";
import AppNavMenuIcon from '../../components/NavMenuIcon.vue'
import SessionMenu from './SessionMenu.vue'
import PreviewLink from './PreviewLink.vue'

const { mapMutations: mapUIMutations } = createNamespacedHelpers("ui");

export default Vue.extend({
   name: "AppControlbar",
   components: {
      'app-nav-menu-icon': AppNavMenuIcon,
      'app-session-menu': SessionMenu,
      'app-preview-link': PreviewLink
   },
   data() {
      return {
         controlSectorTabs: [
            {
               label: "Profile",
               path: "/",
            },
            {
               label: "Design",
               path: "/design",
            },
            {
               label: "Analytics",
               path: "/analytics",
            },
            {
               label: "Settings",
               path: "/settings",
            },
         ]
      };
   },
   computed: {
      controlbarTopClasses() {
         return [
            'controlbar-top',
            'pad-y-large',
            'xstack', 
            'align-center', 
            'justify-space-between'
         ];
      },
      controlSectorTabClasses() {
         return [
            'control-sector-tab',
            'w-100',
            'xstack',
            'justify-center'
         ]
      },
      controlSectorTabItem() {
         return [
            'sector-tab-item',
            'xstack',
            'justify-center',
            'align-center',
            'cursor-pointer'
         ]
      }
   },

   methods: mapUIMutations(["SHOW_QRCODE_MODAL", "SHOW_SHARE_MODAL"])
});
</script>

<style scoped>
.app-controlbar {
   width: 60vw;
   background-color: #fcfcfc;
}
.controlbar-top {
   margin-left: 42pt;
   margin-right: 42pt;
}
.app-controlbar .control-sector-tab {
   height: 30pt;
   gap: 28pt;
}
.app-controlbar .control-sector-tab .sector-tab-item {
   border-bottom-width: 2px;
   border-bottom-style: solid;
   border-bottom-color: transparent;
   box-sizing: border-box;
   transition: border-bottom-color 120ms linear;
}
.app-controlbar .control-sector-tab .sector-tab-item .label {
   color: var(--accents-5);
}
.app-controlbar .control-sector-tab .sector-tab-item:hover {
   border-bottom-color: var(--accents-2);
}
.app-controlbar .control-sector-tab .sector-tab-item:hover .label {
   color: var(--accents-6);
}
.app-controlbar .control-sector-tab .sector-tab-item.active {
   border-bottom-width: 3px;
   border-bottom-color: var(--primary);
}
.app-controlbar .control-sector-tab .sector-tab-item.active .label {
   color: var(--foreground);
}
.app-controlbar .control-sector-area {
   height: calc(100% - 98pt);
   overflow-y: auto;
}

body.dark .app-controlbar {
   background-color: var(--background);
   border-right: 1px solid var(--accents-1);
}

@media screen and (max-width: 1060px) {
   .app-controlbar {
      width: 100%;
   }

   .controlbar-top {
      margin-left: var(--gap);
      margin-right: var(--gap);
   }
}
</style>
