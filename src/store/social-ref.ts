import { Module } from 'vuex'
import { api } from '../utils/axios'
import type { AxiosResponse } from 'axios'
import { AppStore } from '../types'
import type { SocialRef, SocialRefState } from '../types/social-ref'
import type { ApiResponse } from '../types'

const socialRefModule: Module<SocialRefState, AppStore> = {
   namespaced: true,
   state: {
      _loaded: false,
      _data: []
   },
   mutations: {
      SET_LOAD_STATE(state, val: boolean) {
         state._loaded = val
      },
      SET_DATA(state, data: SocialRef[]) {
         state._data = data
      }
   },
   actions: {

      /** Load all socials */
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

      /** Add new social */
      async addSocialRef({ dispatch }, data: SocialRef) {
         const response = await api.post<ApiResponse<SocialRef>>('/social-ref', data)
   
         if (response.status === 200 || response.status === 201) {
            dispatch('loadAllSocialRefs')
         }
      },

      /** Update social */
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

      /** Delete social */
      async deleteOneSocialRef({ state, commit }, refId) {
         const response = await api.delete('/social-ref/' + refId)
         let refs: SocialRef[]
   
         if (response.status === 200) {
            refs = state._data.filter(ref => ref._id !== refId)
   
            commit('SET_DATA', refs)
         }
      },

      /** Clear stored social list from state */
      clearSocialList({ commit }) {
         commit('SET_LOAD_STATE', false)
         commit('SET_DATA', [])
      }
   },
   getters: {
      /** List of socials */
      socialRefs(state) {
         return state._data
      },

      /** Social load status */
      loaded(state) {
         return state._loaded
      }
   }
}

export default socialRefModule
