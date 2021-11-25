import { Module } from 'vuex'
import { api } from '../utils/axios'
import type { AxiosResponse } from 'axios'
import type { AppStore } from '../types'
import type { Clink, ClinkState } from '../types/clink'
import type { ApiResponse } from '../types'

const clinkModule: Module<ClinkState, AppStore> = {
   namespaced: true,

   state: {
      _loaded: false,
      _data: []
   },

   mutations: {
      SET_LOAD_STATE(state, val: boolean) {
         state._loaded = val
      },
      SET_DATA(state, data: Clink[]) {
         state._data = data
      }
   },

   actions: {
      async loadAllCLinks({ state, commit }) {
         const response = await api.get<ApiResponse<Clink>>('/clink')
         let data: Clink
   
         if (state._loaded) {
            commit('SET_LOAD_STATE', false)
         }
   
         if (response.status === 200 && response.data.result) {
            data = response.data.result
   
            commit('SET_DATA', data)
            commit('SET_LOAD_STATE', true)
         }
      },
   
      async addCLink({ dispatch }, data: Clink) {
         const response = await api.post<ApiResponse<Clink>>('/clink', data)
   
         if (response.status === 200 || response.status === 201) {
            dispatch('loadAllCLinks')
         } else {
            throw new Error(response.data.message)
         }
      },
   
      async updateCLink({ state, commit }, update: Partial<Clink>) {
         let response: AxiosResponse<ApiResponse<Clink>>
         let newData: Clink[], linkId: string
         let route: string
   
         if (!state._loaded || !update._id) {
            return
         }
   
         linkId = update._id
         route = '/clink/' + linkId
         delete update._id
   
         response = await api.put(route, update)
   
         if (response.status === 200 || response.status === 201) {
            newData = state._data.map(link => {
               if (linkId === link._id) {
                  return Object.assign(update, { _id: linkId }) as Clink
               }
               return link
            })
      
            commit('SET_DATA', newData)
         }
   
         return response.data
      },
   
      async deleteCLink({ state, commit }, linkId) {
         const response = await api.delete('/clink/' + linkId)
         let links: Clink[]
   
         if (response.status === 200) {
            links = state._data.filter(link => link._id !== linkId)
   
            commit('SET_DATA', links)
         }
      },

      /** Clear links from state */
      clearClinks({ commit }) {
         commit('SET_LOAD_STATE', false)
         commit('SET_DATA', [])
      }
   },

   getters: {
      clinks(state) {
         return state._data
      },
      loaded(state) {
         return state._loaded
      }
   }
}

export default clinkModule
