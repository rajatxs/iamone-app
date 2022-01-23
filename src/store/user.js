import { api } from "../http";

/** @type {import('vuex').Module} */
const userModule = {
   namespaced: true,
   state: {
      _loaded: false,
      _data: {
         _id: "",
         username: "",
         fullname: "",
         bio: "",
         image: "",
         location: "",
         email: "",
         emailVerified: true,
      },
   },

   mutations: {
      SET_LOAD_STATE(state, val) {
         state._loaded = val;
      },
      SET_USER_DATA(state, data) {
         state._data = data;
      },
      SET_USERNAME(state, val) {
         state._data.username = val;
      },
      SET_EMAIL(state, val) {
         state._data.email = val;
      },
      SET_IMAGE(state, val) {
         state._data.image = val;
      },
      SET_EMAIL_VERIFIED(state, val) {
         state._data.emailVerified = val;
      }
   },

   actions: {

      /** fetch user data and save in user state */
      async loadUser({ state, commit }) {
         const response = await api.get("/user/detail");
         let data;

         if (state._loaded) {
            commit("SET_LOAD_STATE", false);
         }

         if (response.status === 200) {
            data = response.data.result;
            commit("SET_USER_DATA", data);
            commit("SET_LOAD_STATE", true);
         }
      },

      /** clear user state */
      clearData({ commit }) {
         commit("SET_USER_DATA", {});
         commit("SET_LOAD_STATE", false);
      },
   },

   getters: {
      /** User data */
      user(state) {
         return state._data;
      },

      /** User data load state */
      loaded(state) {
         return state._loaded;
      },
   },
};

export default userModule;
