import { Module } from 'vuex'
import { AppStore } from '../types'
import { AppUIStore } from '../types/ui'

const UIModule: Module<AppUIStore, AppStore> = {
   namespaced: true,
   state: {
      viewAuthModal: false,
      viewQRCodeModal: false,
      viewShareModal: false,
      viewUpdatePasswordModal: false,
      viewMockupSplashScreen: false,
   },

   mutations: {
      SHOW_AUTH_MODAL(state, val: boolean) {
         state.viewAuthModal = val
      },
      SHOW_QRCODE_MODAL(state, val: boolean) {
         state.viewQRCodeModal = val
      },
      SHOW_SHARE_MODAL(state, val: boolean) {
         state.viewShareModal = val
      },
      SHOW_UPDATE_PASSWORD_MODAL(state, val: boolean) {
         state.viewUpdatePasswordModal = val
      },
      SHOW_MOCKUP_SPLASH_SCREEN(state, val: boolean) {
         state.viewMockupSplashScreen = val
      }
   }
}

export default UIModule
