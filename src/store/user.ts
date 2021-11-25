import { InjectionKey } from 'vue'
import { 
   Module, 
   MutationTree, 
   ActionTree, 
   GetterTree,
   Store
} from 'vuex'
import { api } from '../utils/axios'
import type { ApiResponse, AppStore } from '../types'
import type { User, UserState } from '../types/user'
import { AxiosRequestConfig } from 'axios'

const state: UserState = {
   _loaded: false,
   _data: {
      _id: '',
      username: '',
      fullname: '',
      bio: '',
      company: '',
      email: '',
      emailVerified: false
   }
}

const mutations: MutationTree<UserState> = {
   SET_LOAD_STATE(state, val: boolean) {
      state._loaded = val
   },
   SET_USER_DATA(state, data: User) {
      state._data = data
   },
   SET_USERNAME(state, val: string) {
      state._data.username = val
   },
   SET_EMAIL(state, val: string) {
      state._data.email = val
   }
}

const actions: ActionTree<UserState, AppStore> = {
   async loadUserDetails({ state, commit }) {
      const response = await api.get<ApiResponse<User>>('/user/detail')
      let data: User

      if (state._loaded) {
         commit('SET_LOAD_STATE', false)
      }

      if (response.status === 200 && response.data.result) {
         data = response.data.result
         commit('SET_USER_DATA', data)
         commit('SET_LOAD_STATE', true)
      }
   },

   async uploadAvatar({ commit, dispatch }, file: File) {
      const formData = new FormData()
      let response: AxiosRequestConfig<ApiResponse<null>>

      formData.append('file', file)

      response = await api.post<ApiResponse<null>>('/user/image', formData, {
         headers: {
            'Content-Type': 'multipart/form-data'
         }
      })

      if (response.data?.statusCode === 201) {
         dispatch('loadUserDetails')
      }
   },

   async updateUserDetails({ state, commit }, newData) {
      const response = await api.put<ApiResponse<null>>('/user/detail', newData)
      let user = state._data;

      if (response.status === 200) {
         user = Object.assign(user, newData)

         commit('SET_USER_DATA', user)
      }
   },

   async changeUsername({ commit }, username: string) {
      const response = await api.put<ApiResponse<null>>("/user/username", { username })

      if (response.data.statusCode === 200) {
         commit('SET_USERNAME', username)
      }
   },
   
   async changeEmail({ commit }, email: string) {
      const response = await api.put<ApiResponse<null>>("/user/email", { email })

      if (response.data.statusCode === 200) {
         commit('SET_EMAIL', email)
      }
   },

   async changePassword({}, payload) {
      const response = await api.put<ApiResponse<null>>("/user/password", payload)

      if (response.data.statusCode === 200) {
         return true
      }

      return false
   },

   async deleteAccount() {
      const response = await api.delete<ApiResponse<null>>('/user/account')

      if (response.data.statusCode === 200) {
         this.dispatch('auth/logout')
      }
   }
}

const getters: GetterTree<UserState, AppStore> = {
   user(state) {
      return state._data
   },
   loaded(state) {
      return state._loaded
   }
}

const userModule: Module<UserState, AppStore> = {
   namespaced: true,
   state,
   mutations,
   actions,
   getters
}

export default userModule
