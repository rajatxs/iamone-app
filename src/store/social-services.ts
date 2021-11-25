import { Module, MutationTree, ActionTree, GetterTree } from 'vuex'
import { ApiResponse, SocialService, SocialServiceState } from '../types'
import { api } from '../utils/axios'

const state: SocialServiceState = {
   _loaded: false,
   _data: []
}

const mutations: MutationTree<SocialServiceState> = {
   SET_LOAD_STATE(state, val: boolean) {
      state._loaded = val
   },
   SET_DATA(state, data: SocialService[]) {
      state._data = data
   }
}

const actions: ActionTree<SocialServiceState, any> = {

   /** Fetch list of social services from remote server */
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
   }
}

const getters: GetterTree<SocialServiceState, any> = {
   socialServices(state) {
      return state._data
   },
   loaded(state) {
      return state._loaded
   }
}

const socialServiceModule: Module<SocialServiceState, any> = {
   namespaced: true,
   state,
   mutations,
   actions,
   getters
}

export default socialServiceModule
