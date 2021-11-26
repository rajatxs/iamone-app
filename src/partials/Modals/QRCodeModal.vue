<template>
   <app-modal 
      title="Scan QR code" 
      width="342px"
      height="160pt"
      gap="small"
      @close="$emit('close')"
      @blur="$emit('close')">

      <div class="qr-code-preview">
         <div v-show="qrDataUrl" class="qr-code-wrapper xstack justify-center align-center">
            <img 
               :src="qrDataUrl"
               class="qr-code-image w-auto h-100" 
               alt="" />
         </div>

         <div class="text-center">
            <h5>{{ pageUrl }}</h5>
         </div>
      </div>
   </app-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { toDataURL } from 'qrcode'

export default defineComponent({
   name: 'QRCodeModal',

   data() {
      return {
         qrDataUrl: ''
      }
   },

   computed: {
      pageUrl() {
         return this.$store.getters['livePageURL']
      }
   },

   mounted() {
      this.generateQRCode()
   },

   methods: {
      generateQRCode() {
         console.log("QR LINK", this.pageUrl)
         toDataURL(this.pageUrl, (error, url) => {
            if (error) {
               throw (error)
            }

            this.qrDataUrl = url
         })
      }
   }
})
</script>

<style lang="scss">
.qr-code-wrapper {
   height: 126pt;
}
</style>
