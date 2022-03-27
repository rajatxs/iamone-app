import Vue from "vue";
import VueAxios from "vue-axios";
import router from "./router.js";
import store from "./store";
import uiPlugin from "./plugins/ui";
import globalMixin from "./mixins/global.js";
import { api } from "./http";

// @ts-ignore
import App from "./App.vue";

Vue.config.productionTip = false;

Vue.mixin(globalMixin);
Vue.use(uiPlugin);
Vue.use(VueAxios, api);

new Vue({
   router,
   store,
   render: function (h) {
      return h(App);
   },
   created() {
      store.dispatch("ui/applyActiveTheme");
   },
}).$mount("#app");
