import { api } from "../http";

/** @type {import('vuex').Module} */
const linksModule = {
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
      },
   },
   actions: {
      /** load all links */
      async loadAll({ state, commit }) {
         const response = await api.get("/clink");

         if (state._loaded) {
            commit("SET_LOAD_STATE", false);
         }

         if (response.status === 200 && response.data.result) {
            commit("SET_DATA", response.data.result);
            commit("SET_LOAD_STATE", true);
         }
      },

      /** clear links from state */
      clearData({ commit }) {
         commit("SET_DATA", []);
         commit("SET_LOAD_STATE", false);
      },
   },

   getters: {
      links(state) {
         return state._data;
      },
      loaded(state) {
         return state._loaded;
      },
   },
};

export default linksModule;
