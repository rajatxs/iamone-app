import { api } from "../http";

/** @type {import('vuex').Module} */
const pageConfigModule = {
   namespaced: true,
   state: {
      _loaded: false,
      _data: {},
   },
   mutations: {
      SET_LOAD_STATE(state, val) {
         state._loaded = val;
      },
      SET_DATA(state, data) {
         state._data = data;
      },
      SET_THEME(state, val) {
         state._data.theme = val;
      }
   },
   actions: {
      /** load page config object */
      async load({ state, commit }) {
         const response = await api.get("/page-config");

         if (state._loaded) {
            commit("SET_LOAD_STATE", false);
         }

         if (response.status === 200 && response.data.result) {
            commit("SET_DATA", response.data.result);
            commit("SET_LOAD_STATE", true);
         }
      },

      /** clear config object from state */
      clear({ commit }) {
         commit("SET_DATA", []);
         commit("SET_LOAD_STATE", false);
      },
   },

   getters: {
      pageConfig(state) {
         return state._data;
      },
      loaded(state) {
         return state._loaded;
      },
   },
};

export default pageConfigModule;
