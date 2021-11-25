import type { MethodOptions, ComponentOptions } from 'vue'

export type DocId = string

export interface Doc {
   _id: DocId
}

export type DeviceFrameOrientation = 'portrait' | 'landscape'

export interface AppStore {

   /** QR Code modal state */
   showQRCodeModal: boolean,

   /** Share modal state */
   showShareModal: boolean,

   /** Update password modal state */
   showUpdatePasswordModal: boolean,

   /** Mockup splash screen state */
   showMockupSplashScreen: boolean,

   /** Active template name */
   _templateName: string,

   /** Active template load state */
   _templateLoaded: boolean,

   /** Active template source url */
   _templateSource: string
}

export interface ApiResponse<T> {
   statusCode: number,
   message: string,
   result?: T
}

export interface CommonMethods extends MethodOptions  {
   $socialIconPath(key: string): string
}

export type AppComponent = ComponentOptions<any, any, any, any, CommonMethods>

export interface SocialService {
   key: string,
   name: string,
   hint: string,
   about: string,
   website: string,
   templateUrl: string
}

export interface SocialServiceState {
   _loaded: boolean,
   _data: SocialService[]
}
