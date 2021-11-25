import { Module } from 'vuex'
import { AppStore, ApiResponse } from '../types'
import { AuthState, AuthSuccessResponse, AuthPayload } from '../types/auth'
import { api } from '../utils/axios'

const authModule: Module<AuthState, AppStore> = {
   namespaced: true,
   state: {
      _status: false
   },
   mutations: {
      SET_AUTH_STATUS(state, value: boolean) {
         state._status = value
      }
   },
   actions: {

      /** Generate new auth token */
      async generateAuthToken({ commit }, payload: AuthPayload) {
         const response = await api.post<ApiResponse<AuthSuccessResponse>>('/user/token', payload)
         let tokens: AuthSuccessResponse

         if (response.data.statusCode === 201 && response.data.result) {
            tokens = response.data.result || null

            localStorage.setItem('ACCESS_TOKEN', tokens.accessToken)
            localStorage.setItem('REFRESH_TOKEN', tokens.refreshToken)

            commit('SET_AUTH_STATUS', true)
            this.commit('ui/SHOW_AUTH_MODAL', false)
         }
      },

      /** Register new account */
      async createAccount({ commit }, payload: Required<AuthPayload>) {
         const response = await api.post('/user/register', payload)
         let tokens: AuthSuccessResponse

         if (response.data.statusCode === 201 && response.data.result) {
            tokens = response.data.result || null

            localStorage.setItem('ACCESS_TOKEN', tokens.accessToken)
            localStorage.setItem('REFRESH_TOKEN', tokens.refreshToken)

            commit('SET_AUTH_STATUS', true)
            this.commit('ui/SHOW_AUTH_MODAL', false)
         }
      },

      /** Sign in using auth token from localStorage */
      async signInFromSavedTokens({ commit }) {
         const accessTokens = localStorage.getItem('ACCESS_TOKEN') || '',
               refreshToken = localStorage.getItem('REFRESH_TOKEN') || ''

         if (accessTokens.length) {
            commit('SET_AUTH_STATUS', true)
            this.commit('ui/SHOW_AUTH_MODAL', false)
         } else {
            this.commit('ui/SHOW_AUTH_MODAL', true)
         }
      },

      /** Clear session */
      logout({ commit }) {
         localStorage.removeItem('ACCESS_TOKEN')
         localStorage.removeItem('REFRESH_TOKEN')

         commit('SET_AUTH_STATUS', false)
         this.commit('ui/SHOW_AUTH_MODAL', true)
      }
   },
   getters: {
      authStatus(state): boolean {
         return state._status
      }
   }
}

export default authModule
