// @ts-ignore
import Toast from './Toast.vue'
import ToastService from './service'

// @ts-ignore
Toast.install = vue => {
  vue.component('app-toast', Toast)
  vue.use(ToastService)
}

export default Toast
