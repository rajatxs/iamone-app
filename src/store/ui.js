/** @type {import('vuex').Module} */
const UIModule = {
   namespaced: true,
   state: {
      enableDarkTheme: false,
      viewAuthModal: false,
      viewQRCodeModal: false,
      viewShareModal: false,
      viewUpdatePasswordModal: false,
      viewMockupSplashScreen: false,
      viewPreview: false
   },
   mutations: {
      SET_DARK_THEME(state, val) {
         state.enableDarkTheme = val;
      },
      SHOW_AUTH_MODAL(state, val) {
         state.viewAuthModal = val;
      },
      SHOW_QRCODE_MODAL(state, val) {
         state.viewQRCodeModal = val;
      },
      SHOW_SHARE_MODAL(state, val) {
         state.viewShareModal = val;
      },
      SHOW_UPDATE_PASSWORD_MODAL(state, val) {
         state.viewUpdatePasswordModal = val;
      },
      SHOW_MOCKUP_SPLASH_SCREEN(state, val) {
         state.viewMockupSplashScreen = val;
      },
      SHOW_PREVIEW(state, val) {
         state.viewPreview = val;
      },
   },

   actions: {
      applyActiveTheme({ commit }, themeName) {
         const key = "APP_ACTIVE_THEME";
         const body = document.body;
         
         if (!themeName) {
            themeName = localStorage.getItem(key);
         }

         switch(themeName) {
            default:
            case 'light':
               body.classList.remove('dark');
               body.classList.add('light');
               localStorage.setItem(key, 'light');
               commit('SET_DARK_THEME', false);
               break;

            case 'dark':
               body.classList.remove('light');
               body.classList.add('dark');
               localStorage.setItem(key, 'dark');
               commit('SET_DARK_THEME', true);
               break;
         }
      },

      toggleActiveTheme({ state, dispatch }) {
         dispatch(
            'applyActiveTheme', 
            (state.enableDarkTheme)? 'light': 'dark'
         );
      }
   }
};

export default UIModule
