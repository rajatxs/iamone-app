
export interface ToastConfig {
   type?: string,
   text: string,
   duration?: number,
   action?: Function
}

export type ToastOptions = string | ToastConfig
