<template>
   <div class="app-universal-area">
      <qrcode-modal
         v-if="viewQRCodeModal" 
         @close="SHOW_QRCODE_MODAL(false)" />

      <share-link-modal
         v-if="viewShareModal"
         @close="SHOW_SHARE_MODAL(false)" />

      <email-verification-modal
         v-if="viewEmailVerificationModal"
         @close="SHOW_EMAIL_VERIFICATION_MODAL(false)" />
   </div>
</template>

<script>
import Vue from 'vue'
import { createNamespacedHelpers } from 'vuex'
import QRCodeModal from './Modals/QRCodeModal.vue'
import ShareLinkModal from "./Modals/ShareLinkModal.vue"
import EmailVerificationModal from "./Modals/EmailVerificationModal.vue";

const { 
   mapState: mapUIState, 
   mapMutations: mapUIMutations 
} = createNamespacedHelpers('ui')

export default Vue.extend({
   name: 'AppUniversalArea',
   components: {
      'qrcode-modal': QRCodeModal,
      'share-link-modal': ShareLinkModal,
      'email-verification-modal': EmailVerificationModal
   },
   computed: mapUIState([
      'viewAuthModal',
      'viewQRCodeModal',
      'viewShareModal',
      'viewUpdatePasswordModal',
      'viewEmailVerificationModal'
   ]),
   methods: mapUIMutations([
      'SHOW_AUTH_MODAL',
      'SHOW_QRCODE_MODAL',
      'SHOW_SHARE_MODAL',
      'SHOW_UPDATE_PASSWORD_MODAL',
      'SHOW_EMAIL_VERIFICATION_MODAL'
   ])
})
</script>
