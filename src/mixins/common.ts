import { ComponentOptions } from 'vue'
import { mapActions, createNamespacedHelpers } from 'vuex'

const { mapActions: mapUserActions } = createNamespacedHelpers('user')
const { mapActions: mapSocialServiceActions } = createNamespacedHelpers('socialService')
const { mapActions: mapSocialRefActions } = createNamespacedHelpers('socialRef')
const { mapActions: mapCLinkActions } = createNamespacedHelpers('clink')

export default <ComponentOptions>{

   methods: {
      ...mapActions(['loadRemoteTemplateSource']),
      ...mapSocialServiceActions(['loadAllSocialServices']),
      ...mapUserActions(['loadUserDetails']),
      ...mapSocialRefActions(['loadAllSocialRefs']),
      ...mapCLinkActions(['loadAllCLinks']),

      async loadAllData() {
         await this.loadRemoteTemplateSource()
         await this.loadAllSocialServices()
         await this.loadUserDetails()
         await this.loadAllSocialRefs()
         await this.loadAllCLinks()
      }
   }
}
