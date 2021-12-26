// @ts-nocheck
import Vue from "vue";
import VueRouter from "vue-router";
import ProfileController from "./views/ProfileController/ProfileController.vue";
import DesignController from "./views/DesignController/DesignController.vue";
import AnalyticsController from "./views/AnalyticsController.vue";
import SettingsController from "./views/SettingsController/SettingsController.vue";

Vue.use(VueRouter);

const routes = [
   {
      path: "/",
      name: "ProfileController",
      component: ProfileController,
   },
   {
      path: "/design",
      name: "DesignController",
      component: DesignController,
   },
   {
      path: "/analytics",
      name: "AnalyticsController",
      component: AnalyticsController,
   },
   {
      path: "/settings",
      name: "SettingsController",
      component: SettingsController,
   },
];

const router = new VueRouter({
   mode: "history",
   base: process.env.BASE_URL,
   routes,
});

export default router;
