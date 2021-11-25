import * as VueRouter from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import ProfileController from './views/ProfileController.vue'
import DesignController from './views/DesignController.vue'
import AnalyticsController from './views/AnalyticsController.vue'
import SettingsController from './views/SettingsController.vue'

const routes: RouteRecordRaw[] = [
   {
      path: '/',
      component: ProfileController
   },
   {
      path: '/design',
      component: DesignController
   },
   {
      path: '/analytics',
      component: AnalyticsController
   },
   {
      path: '/settings',
      component: SettingsController
   }
]

export default VueRouter.createRouter({
   routes,
   history: VueRouter.createWebHistory()
})
