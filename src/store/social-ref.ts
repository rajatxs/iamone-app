import { Module, MutationTree, ActionTree, GetterTree } from 'vuex'
import { api } from '../utils/axios'
import type { AxiosResponse } from 'axios'
import type { SocialRef, SocialRefState } from '../types/social-ref'
import type { ApiResponse } from '../types'

const state: SocialRefState = {
   _loaded: false,
   _data: []
}

const mutations: MutationTree<SocialRefState> = {
   SET_LOAD_STATE(state, val: boolean) {
      state._loaded = val
   },
   SET_DATA(state, data: SocialRef[]) {
      state._data = data
   }
}

const actions: ActionTree<SocialRefState, any> = {
   async loadAllSocialRefs({ state, commit }) {
      const response = await api.get<ApiResponse<SocialRef>>('/social-ref')
      let data: SocialRef

      if (state._loaded) {
         commit('SET_LOAD_STATE', false)
      }

      if (response.status === 200 && response.data.result) {
         data = response.data.result

         commit('SET_DATA', data)
         commit('SET_LOAD_STATE', true)
      }
   },

   async addSocialRef({ state, commit, dispatch }, data: SocialRef) {
      const response = await api.post<ApiResponse<SocialRef>>('/social-ref', data)

      if (response.status === 200 || response.status === 201) {
         dispatch('loadAllSocialRefs')
      }
   },

   async updateSocialRef({ state, commit }, update: Partial<SocialRef>) {
      let response: AxiosResponse<ApiResponse<SocialRef>>
      let newData: SocialRef[], refId: string
      let route: string

      if (!state._loaded || !update._id) {
         return
      }

      refId = update._id
      route = '/social-ref/' + refId
      delete update._id

      response = await api.put(route, update)

      if (response.status === 200 || response.status === 201) {
         newData = state._data.map(ref => {
            if (refId === ref._id) {
               return Object.assign(update, { _id: refId }) as SocialRef
            }
            return ref
         })
   
         commit('SET_DATA', newData)
      }

      return response.data
   },

   async deleteOneSocialRef({ state, commit }, refId) {
      const response = await api.delete('/social-ref/' + refId)
      let refs: SocialRef[]

      if (response.status === 200) {
         refs = state._data.filter(ref => ref._id !== refId)

         commit('SET_DATA', refs)
      }
   }
}

const getters: GetterTree<SocialRefState, any> = {
   socialRefs(state) {
      return state._data
   },
   loaded(state) {
      return state._loaded
   }
}

const socialRefModule: Module<SocialRefState, any> = {
   namespaced: true,
   state,
   mutations,
   actions,
   getters
}

export default socialRefModule
