<template>
   <app-modal
      title="Scan QR code"
      width="342px"
      height="160pt"
      gap="small"
      @close="$emit('close')"
      @blur="$emit('close')">
      <div class="qr-code-preview">
         <div
            v-show="qrDataUrl"
            class="qr-code-wrapper xstack justify-center align-center">
            <img :src="qrDataUrl" class="qr-code-image w-auto h-100" alt="" />
         </div>

         <div class="text-center">
            <h5>{{ $livePageUrl }}</h5>
         </div>
      </div>
   </app-modal>
</template>

<script>
import Vue from "vue";
import { toDataURL } from "qrcode";

export default Vue.extend({
   name: "QRCodeModal",

   data() {
      return {
         qrDataUrl: "",
      };
   },
   mounted() {
      this.generateQRCode();
   },

   methods: {
      generateQRCode() {
         toDataURL(this.$livePageUrl, (error, url) => {
            if (error) {
               throw error;
            }

            this.qrDataUrl = url;
         });
      },
   },
});
</script>

<style>
.qr-code-wrapper {
   height: 126pt;
}

body.dark .qr-code-image {
   filter: invert(1);
}
</style>
