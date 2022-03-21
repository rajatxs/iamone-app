import axios from "axios";

/** @type {import('vuex').Module} */
const socialPlatformsModule = {
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
      /** Fetch list of social platforms */
      async loadAll({ state, commit }) {
         const response = await axios.get("https://www.iamone.link/x/social-platforms.json");

         if (state._loaded) {
            commit("SET_LOAD_STATE", false);
         }

         if (response.status === 200) {
            commit("SET_DATA", response.data);
            commit("SET_LOAD_STATE", true);
         }
      },

      /** Clear social services from state */
      clearData({ commit }) {
         commit("SET_LOAD_STATE", false);
         commit("SET_DATA", []);
      },
   },

   getters: {
      /** List of social platforms */
      socialPlatforms(state) {
         return state._data;
      },

      /** Social platform load status */
      loaded(state) {
         return state._loaded;
      },
   },
};

export default socialPlatformsModule;
