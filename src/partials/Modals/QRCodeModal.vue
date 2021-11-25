<template>
   <app-modal 
      title="Scan QR code" 
      desc="rajat.iam1.link"
      @close="$emit('close')"
      @escape="$emit('close')">
   </app-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
   name: 'QRCodeModal',
})
</script>
