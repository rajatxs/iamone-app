import { Module } from 'vuex'
import { AppStore } from '../types'
import { 
   ApiResponse, 
   SocialService, 
   SocialServiceState 
} from '../types'
import { api } from '../utils/axios'

const socialServiceModule: Module<SocialServiceState, AppStore> = {
   namespaced: true,

   state: {
      _loaded: false,
      _data: []
   },

   mutations: {
      SET_LOAD_STATE(state, val: boolean) {
         state._loaded = val
      },
      SET_DATA(state, data: SocialService[]) {
         state._data = data
      }
   },

   actions: {

      /** Fetch list of social services */
      async loadAllSocialServices({ state, commit }) {
         const response = await api.get<ApiResponse<SocialService>>('/social-service')
         let data: SocialService

         if (state._loaded) {
            commit('SET_LOAD_STATE', false)
         }

         if (response.status === 200 && response.data.result) {
            data = response.data.result

            commit('SET_DATA', data)
            commit('SET_LOAD_STATE', true)
         }
      },

      /** Clear social services from state */
      clearSocialServices({ commit }) {
         commit('SET_LOAD_STATE', false)
         commit('SET_DATA', [])
      }
   },

   getters: {
      /** List of social services */
      socialServices(state) {
         return state._data
      },

      /** Social service load status */
      loaded(state) {
         return state._loaded
      }
   }
}

export default socialServiceModule
