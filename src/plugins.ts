import type { Plugin } from 'vue'
import AppButton from './components/Button.vue'
import AppView from './components/View.vue'
import AppInput from './components/Input.vue'
import AppIconButton from './components/IconButton.vue'
import AppLoader from './components/Loader.vue'
import AppCard from './components/Card.vue'
import AppModal from './components/Modal.vue'
import InputField from './components/InputField.vue'
import NavMenuIcon from './components/NavMenuIcon.vue'

import 'inter-ui/inter.css'
import './scss/main.scss'

export const AppPlugin: Plugin = {
   install(app) {
      app.component('app-button', AppButton)
      app.component('app-view', AppView)
      app.component('app-input', AppInput)
      app.component('app-icon-button', AppIconButton)
      app.component('app-loader', AppLoader)
      app.component('app-card', AppCard)
      app.component('app-modal', AppModal)
      app.component('app-input-field', InputField)
      app.component('app-nav-menu-icon', NavMenuIcon)
   }
}
