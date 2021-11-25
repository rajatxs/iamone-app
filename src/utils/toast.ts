import { createApp, App } from 'vue'
import Toast from '../components/Toast.vue'
import { ToastConfig, ToastOptions } from '../types/toast'

const ToastComponent = () => createApp(Toast)

function initArea(): Element {
   const area = document.querySelector('.app-toast-area')
   let _div: Element

   if (area) {
      return area
   }

   _div = document.createElement('div')
   _div.classList.add('app-toast-area')

   document.body.appendChild(_div)

   return _div
}

function insertToArea(area: Element, el: Element, id: string): void {
   let timer: NodeJS.Timer

   el.setAttribute('id', `app-toast-${id}`)
   area.appendChild(el)

   timer = setTimeout(() => {
      el.classList.add('visible')
      clearTimeout(timer)
   }, 0)
}

function destroyToast(instance: App, id: string, all?: boolean): void {
   const el: Element | null = all ? initArea() : document.querySelector(`#app-toast-${id}`)
   let timer: NodeJS.Timer

   if (!el) {
      return
   }

   el.setAttribute('style', 'opacity: 0; visibility: hidden')

   timer = setTimeout(() => {
      if (el.parentElement) {
         el.parentElement.removeChild(el)
         instance.unmount()
      }

      clearTimeout(timer)
   }, 500)
}

function createToast(options: ToastConfig) {
   const instance = ToastComponent()
   const area = initArea()
   const vm = instance.mount(area)
   const uid = String(Math.floor(Math.random() * 10e6))
   let timer: NodeJS.Timer
   let timeout: number

   // instance.unmount()
   Object.keys(options).forEach(key => {
      vm.$.data[key] = Reflect.get(options, key)
   })

   if (instance._container) {
      insertToArea(instance._container, vm.$el, uid)
   }

   timeout = (options.duration || 4500)
   timer = setTimeout(() => {
      destroyToast(instance, uid)
      clearTimeout(timer)
   }, timeout)

   return instance
}

export default ({
   _show(options: ToastConfig) {
      return createToast(options)
   },
   _assign(options: ToastOptions, obj: Partial<ToastConfig>): ToastConfig {
      const source = (typeof options === 'object') ? options : { text: options }

      return Object.assign({}, source, obj)
   },

   primary(options: ToastOptions) {
      return this._show(
         this._assign(options, {
            type: 'primary'
         }
      ))
   },

   success(options: ToastOptions) {
      return this._show(
         this._assign(options, { 
            type: 'success' 
         }
      ))
   },

   warning(options: ToastOptions) {
      return this._show(
         this._assign(options, { 
            type: 'warning' 
         }
      ))
   },

   error(options: ToastOptions) {
      return this._show(
         this._assign(options, { 
            type: 'error' 
         }
      ))
   },

   closeAll() {
      // destroyToast('0', true)
   },
})
