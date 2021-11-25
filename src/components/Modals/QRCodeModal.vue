<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'

export default defineComponent({
   name: 'QRCodeModal',
   methods: mapActions(['toggleQrCodeModal'])
})
</script>

<template>
   <app-modal 
      title="Scan QR code" 
      desc="rajat.iam1.link"
      v-on:blur="toggleQrCodeModal"
      v-on:close="toggleQrCodeModal">
   </app-modal>
</template>
