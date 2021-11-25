<script lang="ts">
import { defineComponent } from 'vue'
import { createNamespacedHelpers } from 'vuex'
import { toUrl } from '../utils/common'
import HomeCircleIcon from './Icons/home-circle.vue'
import LogoutCircleIcon from './Icons/log-out-circle.vue'

const { mapGetters: mapUserGetters } = createNamespacedHelpers('user')
const { mapActions: mapAuthActions } = createNamespacedHelpers('auth')

export default defineComponent({
   name: 'SessionMenu',
   components: {
      HomeCircleIcon,
      LogoutCircleIcon
   },
   data() {
      return {
         showMenu: false
      }
   },
   computed: mapUserGetters(['user']),
   methods: {
      ...mapAuthActions(['logout']),

      toUrl,
      gotoHome() {
         this.$router.push('/')
         this.toggleMenu()
      },
      toggleMenu() {
         this.showMenu = !this.showMenu
      }
   }
})
</script>

<template>
   <div class="session-menu">
      <div class="menu-icon" @click="toggleMenu">
         <img class="menu-icon-image" :src="toUrl('/_/api/user/image/', user.image)" />
      </div>
      <div v-if="showMenu" class="menu-area">
         <div class="menu-item" @click="gotoHome">
            <HomeCircleIcon />
            <span class="label">Home</span>
         </div>
         <div class="menu-item text-red" @click="logout">
            <LogoutCircleIcon />
            <span class="label">Logout</span>
         </div>
      </div>
      <div v-if="showMenu" class="menu-blind-area" @mousedown.self="toggleMenu"></div>
   </div>
</template>

<style scoped lang="scss">
.session-menu {
   position: relative;
}
.menu-icon {
   position: relative;
   padding: 2pt;
   width: 25pt;
   height: 25pt;
   cursor: pointer;
   border-radius: 50%;
   box-sizing: content-box;
   z-index: 500;
   border-width: 1px;
   border-style: solid;
   border-color: transparent;

   &:hover {
      border-color: var(--accents-2);
   }

   .menu-icon-image {
      width: 100%;
      height: 100%;
      border-radius: inherit;
   }
}

.menu-area {
   position: absolute;
   padding: 4pt;
   right: 0;
   margin-top: 4pt;
   width: 140pt;
   height: auto;
   z-index: 500;
   box-shadow: var(--shadow-medium);
   cursor: pointer;
   border-radius: var(--radius);
   background-color: var(--background);

   .menu-item {
      display: flex;
      height: 32pt;
      gap: 6pt;
      padding-left: var(--gap-half);
      padding-right: var(--gap-half);
      align-items: center;
      border-radius: inherit;
      background-color: transparent;
      transition: background-color 120ms linear;

      &:hover {
         background-color: var(--accents-1);
      }

      .app-icon {
         width: 12pt;
         height: 12pt;
      }
      .label {
         font-size: 93%;
      }
   }
}

.menu-blind-area {
   position: fixed;
   width: 100%;
   height: 100%;
   top: 0;
   bottom: 0;
   right: 0;
   left: 0;
   z-index: 400;
   background-color: rgba(0, 0, 0, 0.09);
}
</style>
