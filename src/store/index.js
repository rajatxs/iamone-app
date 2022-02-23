import Vue from "vue";
import Vuex from "vuex";
import { api } from "../http";
import ui from "./ui";
import socials from "./socials";
import links from "./links";
import user from "./user";
import socialPlatforms from "./social-platforms";
import pageConfig from "./page-config";
import { REMOTE_SERVER_URL } from "../config";
import { clearAuthTokens, redirectToLoginPage } from "../utils/common";

Vue.use(Vuex);

export default new Vuex.Store({
   state: {
      _loaded: false,
   },
   mutations: {
      SET_LOAD_STATE(state, val) {
         state._loaded = val;
      },
   },
   getters: {

      /** Returns combine state object */
      templateData(state, getters, rootState, rootGetters) {
         const user = rootGetters["user/user"];
         const social = rootGetters["socials/socials"];
         const links = rootGetters["links/links"];
         const page = rootGetters["pageConfig/pageConfig"]
         const options = {
            host: REMOTE_SERVER_URL,
         };

         return {
            user,
            social,
            links,
            options,
            page
         };
      },
   },

   actions: {
      async loadTemplateData({ state, commit }) {
         let response = await api.get("/page/data");
         let data = {};

         if (state._loaded) {
            commit("SET_LOAD_STATE", false);
         }

         if (response.status === 200) {
            data = response.data.result;

            if ("user" in data) {
               if (!data.user) {
                  clearAuthTokens();
                  return redirectToLoginPage();
               }

               this.commit("user/SET_USER_DATA", data.user);
               this.commit("user/SET_LOAD_STATE", true);

               if (!data.user.emailVerified) {
                  this.commit('ui/SHOW_EMAIL_VERIFICATION_MODAL', true);
               }
            }

            if ("social" in data) {
               this.commit("socials/SET_DATA", data.social);
               this.commit("socials/SET_LOAD_STATE", true);
            }

            if ("links" in data) {
               this.commit("links/SET_DATA", data.links);
               this.commit("links/SET_LOAD_STATE", true);
            }

            if ("page" in data) {
               this.commit("pageConfig/SET_DATA", data.page);
               this.commit("pageConfig/SET_LOAD_STATE", true);
            }

            commit("SET_LOAD_STATE", true);
         }
      },
   },
   modules: {
      socials,
      links,
      socialPlatforms,
      user,
      ui,
      pageConfig,
   },
});
