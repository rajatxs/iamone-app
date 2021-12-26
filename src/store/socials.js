import { api } from "../http";

/** @type {import('vuex').Module} */
const socialsModule = {
   namespaced: true,
   state: {
      _loaded: false,
      _data: [],
   },
   mutations: {
      SET_LOAD_STATE(state, val) {
         state._loaded = val;
      },
      SET_DATA(state, data) {
         state._data = data;
      }
   },
   actions: {
      /** Load all socials */
      async loadAll({ state, commit }) {
         const response = await api.get("/social-ref");

         if (state._loaded) {
            commit("SET_LOAD_STATE", false);
         }

         if (response.status === 200) {
            commit("SET_DATA", response.data.result);
            commit("SET_LOAD_STATE", true);
         }
      },

      /** clear stored social list from state */
      clearData({ commit }) {
         commit("SET_DATA", []);
         commit("SET_LOAD_STATE", false);
      },
   },
   getters: {
      /** List of socials */
      socials(state) {
         return state._data;
      },

      /** Social load status */
      loaded(state) {
         return state._loaded;
      },
   },
};

export default socialsModule;
