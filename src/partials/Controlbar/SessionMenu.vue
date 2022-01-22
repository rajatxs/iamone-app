<template>
   <div class="session-menu pos-rel">
      <div :class="menuIconClasses" @click="toggleMenu">
         <img :class="menuIconImageClasses" :src="$USER_PROFILE_IMAGE" />
      </div>
      <div v-if="showMenu" :class="menuAreaClasses">
         <a :href="$livePageUrl" target="_blank" :class="menuRegularItemClasses" @click="gotoHome">
            <window-open-icon />
            <span class="label">Open live page</span>
         </a>
         <div :class="menuRegularItemClasses" @click="gotoHome">
            <home-circle-icon />
            <span class="label">Home</span>
         </div>
         <div :class="menuRegularItemClasses" @click="toggleTheme">
            <adjust-icon />
            <span class="label">{{ themeTogglerLabel }}</span>
         </div>
         <div :class="menuDangerItemClasses" @click="logout">
            <logout-circle-icon />
            <span class="label">Logout</span>
         </div>
      </div>
      <div v-if="showMenu" :class="menuBlindAreaClasses" @mousedown.self="toggleMenu"></div>
   </div>
</template>

<script>
import Vue from "vue";
import WindowOpenIcon from "../../assets/vue-icons/window-open.vue";
import HomeCircleIcon from "../../assets/vue-icons/home-circle.vue";
import LogoutCircleIcon from "../../assets/vue-icons/log-out-circle.vue";
import AdjustIcon from "../../assets/vue-icons/adjust.vue";

export default Vue.extend({
   name: "SessionMenu",
   components: {
      "window-open-icon": WindowOpenIcon,
      "home-circle-icon": HomeCircleIcon,
      "logout-circle-icon": LogoutCircleIcon,
      'adjust-icon': AdjustIcon
   },
   data() {
      return {
         showMenu: false,
      };
   },
   computed: {
      user() {
         return this.$store.getters["user/user"];
      },
      themeTogglerLabel() {
         return (this.$store.state['ui']['enableDarkTheme'])?
            "Switch to Light theme":
            "Switch to Dark theme";
      },
      menuIconClasses() {
         return [
            'menu-icon',
            'pos-rel',
            'rounded',
            'cursor-pointer'
         ];
      },
      menuIconImageClasses() {
         return [
            'menu-icon-image',
            'w-100',
            'h-100'
         ];
      },
      menuAreaClasses() {
         return [
            'menu-area',
            'h-auto',
            'pos-abs',
            'pad-small',
            'radius-medium',
            'cursor-pointer',
            'shadow-medium',
         ];
      },
      menuItemClasses() {
         return [
            'menu-item',
            'xstack',
            'pad-x-medium',
            'align-center',
            'radius-inherit'
         ];
      },
      menuRegularItemClasses() {
         return [
            ...this.menuItemClasses,
            'text-foreground'
         ];
      },
      menuDangerItemClasses() {
         return [
            ...this.menuItemClasses,
            'text-error'
         ];
      },
      menuBlindAreaClasses() {
         return [
            'menu-blind-area',
            'cover-viewport',
            'w-100',
            'h-100'
         ];
      }
   },
   methods: {
      toggleTheme() {
         this.$store.dispatch('ui/toggleActiveTheme');
         this.toggleMenu();
      },
      gotoHome() {
         this.$router.push("/");
         this.toggleMenu();
      },
      toggleMenu() {
         this.showMenu = !this.showMenu;
      },
   },
});
</script>

<style scoped>
.menu-icon {
   padding: 2pt;
   width: 25pt;
   height: 25pt;
   box-sizing: content-box;
   z-index: 500;
   border-width: 1px;
   border-style: solid;
   border-color: transparent;
}
.menu-icon:hover {
   border-color: var(--accents-2);
}
.menu-icon .menu-icon-image {
   border-radius: inherit;
}
.menu-area {
   right: 0;
   margin-top: 4pt;
   width: 184pt;
   z-index: 500;
   border-width: 1px;
   border-style: solid;
   border-color: transparent;
   background-color: var(--background);
}
.menu-area .menu-item {
   height: 32pt;
   gap: 6pt;
   transition: background-color 120ms linear;
}
.menu-area .menu-item:hover {
   background-color: var(--accents-1);
}
.menu-area .menu-item .app-icon {
   width: 12pt;
   height: 12pt;
}
.menu-area .menu-item .label {
   font-size: 93%;
}
.menu-blind-area {
   z-index: 400;
   background-color: rgba(0, 0, 0, 0.09);
}

body.dark .menu-icon {
   border-color: var(--accents-2);
}
body.dark .menu-area {
   background-color: var(--background);
   border-color: var(--accents-2);
}
body.dark .menu-blind-area {
   background-color: rgba(0, 0, 0, 0.4);
}
</style>
