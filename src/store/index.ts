import { createStore } from 'vuex'
import { AxiosResponse } from 'axios'
import type { MutationTree, ActionTree, GetterTree } from 'vuex'
import { AppStore } from '../types'
import { templateApi } from '../utils/axios'
import ui from './ui'
import socialService from './social-services'
import user from './user'
import socialRef from './social-ref'
import clink from './clink'
import auth from './auth'

const state: AppStore = {
  showQRCodeModal: false,
  showShareModal: false,
  showUpdatePasswordModal: false,
  showMockupSplashScreen: false,
  _templateName: 'primary',
  _templateLoaded: false,
  _templateSource: ''
}

const mutations: MutationTree<AppStore> = {
  SHOW_QRCODE_MODAL(state, val: boolean) {
    state.showQRCodeModal = val
  },
  SHOW_SHARE_MODAL(state, val: boolean) {
    state.showShareModal = val
  },
  SHOW_UPDATE_PASSWORD_MODAL(state, val) {
    state.showUpdatePasswordModal = val
  },
  SHOW_MOCKUP_SPLASH_SCREEN(state, val: boolean) {
    state.showMockupSplashScreen = val
  },
  SET_TEMPLATE_NAME(state, val: string) {
    state._templateName = val
  },
  CHANGE_TEMPLATE_LOAD_STATE(state, val: boolean) {
    state._templateLoaded = val
  },
  SET_TEMPLATE_SOURCE(state, val: string) {
    state._templateSource = val
  }
}

const actions: ActionTree<AppStore, any> = {

  /** Toggle QR Code modal */
  toggleQrCodeModal({ state, commit }) {
    commit('SHOW_QRCODE_MODAL', !state.showQRCodeModal)
  },

  /** Toggle share modal */
  toggleShareModal({ state, commit }) {
    commit('SHOW_SHARE_MODAL', !state.showShareModal)
  },

  toggleUpdatePasswordModal({ state, commit }) {
    commit('SHOW_UPDATE_PASSWORD_MODAL', !state.showUpdatePasswordModal)
  },

  /** Set Virtual splash screen */
  setMockupSplashScreen({ commit }, value: boolean) {
    commit('SHOW_MOCKUP_SPLASH_SCREEN', value)
  },

  /** Set current template name */
  setTemplateName({ commit }, name: string) {
    commit('SET_TEMPLATE_NAME', name)
  },

  /** Set template source url */
  setTemplateSource({ commit }, source: string) {
    commit('SET_TEMPLATE_SOURCE', source)
  },

  /** Fetch remote template source by current template name */
  async loadRemoteTemplateSource({ state, commit }) {
    let response: AxiosResponse
    let content: string = ''

    if (state._templateName.length === 0) {
      throw new Error("Missing template name")
    }

    response = await templateApi.get('/primary.hbs')

    if (typeof response.data === 'string') {
      content = response.data
   }

    commit('SET_TEMPLATE_SOURCE', content)
    commit('CHANGE_TEMPLATE_LOAD_STATE', true)
  }
}

const getters: GetterTree<AppStore, any> = {
  templateData(state, getters, rootState, rootGetters) {
    const user = rootGetters['user/user']
    const social = rootGetters['socialRef/socialRefs']
    const links = rootGetters['clink/clinks']

    return { user, social, links }
  },
  templateName(state): string {
    return state._templateName
  },
  templateSource(state): string {
    return state._templateSource
  }
}

export default createStore({
  state,
  mutations,
  actions,
  getters,
  modules: {
    ui,
    auth,
    user,
    socialService,
    socialRef,
    clink
  }
})
