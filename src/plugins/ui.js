// @ts-nocheck
import Vue from 'vue'
import AppButton from '../components/Button.vue'
import AppLogo from '../components/Logo.vue'
import AppLoader from '../components/Loader.vue'
import AppCard from '../components/Card.vue'
import AppFeaturePreview from '../components/FeaturePreview.vue'
import AppIconButton from '../components/IconButton.vue'
import AppInput from '../components/Input.vue'
import AppInputField from '../components/InputField.vue'
import AppModal from '../components/Modal.vue'
import AppControllerView from '../components/ControllerView.vue'
import AppToast from '../components/Toast'

/**
 * App code plugin
 * @param {import('vue').VueConstructor} vue
 */
const install = (vue) => {
   Vue.component('app-button', AppButton)
   Vue.component('app-logo', AppLogo)
   Vue.component('app-loader', AppLoader)
   Vue.component('app-card', AppCard)
   Vue.component('app-feature-preview', AppFeaturePreview)
   Vue.component('app-icon-button', AppIconButton)
   Vue.component('app-input', AppInput)
   Vue.component('app-input-field', AppInputField)
   Vue.component('app-modal', AppModal)
   Vue.component('app-controller-view', AppControllerView)

   vue.use(AppToast)
}

export default install
