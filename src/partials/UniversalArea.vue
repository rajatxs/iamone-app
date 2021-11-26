<template>
   <Teleport to="#universal-area">
      <AuthModal v-if="viewAuthModal" />

      <QRCodeModal
         v-if="viewQRCodeModal" 
         @close="SHOW_QRCODE_MODAL(false)" />

      <ShareLinkModal
         v-if="viewShareModal"
         @close="SHOW_SHARE_MODAL(false)" />

      <UpdatePasswordModal 
         v-if="viewUpdatePasswordModal"
         @close="SHOW_UPDATE_PASSWORD_MODAL(false)" />
   </Teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createNamespacedHelpers } from 'vuex'
import QRCodeModal from './Modals/QRCodeModal.vue'
import ShareLinkModal from "./Modals/ShareLinkModal.vue"
import AuthModal from './Modals/AuthModal/AuthModal.vue'
import UpdatePasswordModal from "./Modals/UpdatePasswordModal.vue"

const { 
   mapState: mapUIState, 
   mapMutations: mapUIMutations 
} = createNamespacedHelpers('ui')

export default defineComponent({
   name: 'AppUniversalArea',
   components: {
      QRCodeModal,
      ShareLinkModal,
      AuthModal,
      UpdatePasswordModal
   },
   computed: mapUIState([
      'viewAuthModal',
      'viewQRCodeModal',
      'viewShareModal',
      'viewUpdatePasswordModal'
   ]),
   methods: mapUIMutations([
      'SHOW_AUTH_MODAL',
      'SHOW_QRCODE_MODAL',
      'SHOW_SHARE_MODAL',
      'SHOW_UPDATE_PASSWORD_MODAL'
   ])
})
</script>
